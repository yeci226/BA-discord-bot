import { Events, Interaction } from 'discord.js';
import { getTWStudentsData, getCurrentGachaData, SERVER_NAME_MAP } from '@/utilities/ba/index.js';
import { client } from '@/index.js';

client.on(Events.InteractionCreate, async (interaction: Interaction) => {
  if (!interaction.isAutocomplete()) return;

  const focusedOption = interaction.options.getFocused(true);

  const { name: optionName, value: searchValue } = focusedOption;

  // 處理角色選擇的自動完成
  if (optionName.startsWith('main') || optionName.startsWith('support') || optionName === 'student' || optionName === 'target') {
    const studentsData = await getTWStudentsData();

    let filteredStudents: any[] = [];
    let puCharacterIds = new Set<string>();

    if (optionName === 'student') {
      // 對於 student 命令，顯示所有已發布的學生
      filteredStudents = Object.values(studentsData);
    } else if (optionName === 'target') {
      // 對於 pull 命令，只顯示3星角色
      filteredStudents = Object.values(studentsData).filter((s: any) => s.StarGrade === 3);

      // 獲取所有伺服器的PU角色並添加到最前面
      const servers = ['Jp', 'Global', 'Cn'];
      const puCharacters: any[] = [];

      for (const server of servers) {
        try {
          const gachaData = await getCurrentGachaData(server);
          if (gachaData.characters && gachaData.characters.length > 0) {
            // 遍歷所有PU角色，而不只是第一個
            for (const puCharacter of gachaData.characters) {
              const puStudent = studentsData[puCharacter.id];
              if (puStudent && !puCharacterIds.has(puCharacter.id.toString())) {
                puCharacters.push({
                  ...puStudent,
                  server: server.toUpperCase(),
                  isPU: true,
                });
                puCharacterIds.add(puCharacter.id.toString());
              }
            }
          }
        } catch (error) {
          console.log(`無法獲取 ${server} 伺服器的PU角色資料:`, error);
        }
      }

      // 先過濾掉普通角色列表中的PU角色，然後將PU角色添加到最前面
      filteredStudents = filteredStudents.filter((student: any) => !puCharacterIds.has(student.Id.toString()));
      // 將PU角色添加到最前面
      filteredStudents.unshift(...puCharacters);
    } else {
      // 對於 builder 命令，根據小隊類型過濾
      const squadType = optionName.startsWith('main') ? 'Main' : 'Support';

      // 獲取已選擇的角色ID
      const selectedCharacterIds = new Set<string>();

      // 檢查所有已選擇的角色
      const allOptions = ['main1', 'main2', 'main3', 'main4', 'support1', 'support2'];
      for (const option of allOptions) {
        const selectedValue = interaction.options.getString(option);
        if (selectedValue) {
          selectedCharacterIds.add(selectedValue);
        }
      }

      // 過濾出對應類型的角色，並排除已選擇的角色
      filteredStudents = Object.values(studentsData).filter((student: any) => student.SquadType === squadType && !selectedCharacterIds.has(student.Id.toString()));
    }

    // 根據搜索值過濾角色
    const searchLower = searchValue.toLowerCase();
    const matchingStudents = filteredStudents
      .filter((student: any) => {
        const name = student.Name?.toLowerCase() || '';
        const pathName = student.PathName?.toLowerCase() || '';
        const devName = student.DevName?.toLowerCase() || '';

        return name.includes(searchLower) || pathName.includes(searchLower) || devName.includes(searchLower);
      })
      .slice(0, 25); // Discord限制最多25個選項

    const choices = matchingStudents.map((student: any) => {
      const formattedPathName =
        student.PathName.charAt(0).toUpperCase() +
        student.PathName.slice(1)
          .replace(/_/g, ' ')
          .replace(/\s\w/g, (match: string) => match.toUpperCase());

      let displayName = student.Name;
      if (student.Id === 10098) {
        displayName = '星野(武裝) - 1';
      } else if (student.Id === 10099) {
        displayName = '星野(武裝) - 2';
      }

      // 如果是PU角色，添加標記和伺服器資訊
      if (puCharacterIds.has(student.Id.toString())) {
        const isLimitedText = student.IsLimited === 0 ? '常駐' : student.IsLimited === 1 ? '限定' : student.IsLimited === 2 ? '活動' : student.IsLimited === 3 ? '週年' : '未知';
        const serverText = SERVER_NAME_MAP[student.server] || student.server || 'JP';
        displayName = `[PU-${serverText}-${isLimitedText}] ${displayName}`;
      }

      return {
        name: `${displayName} (${formattedPathName})`,
        value: student.Id.toString(),
      };
    });

    await interaction.respond(choices);
  }
});
