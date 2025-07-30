import { Events, Interaction } from 'discord.js';
import { getStudentsData } from '@/utilities/ba';
import { client } from '@/index';

client.on(Events.InteractionCreate, async (interaction: Interaction) => {
  if (!interaction.isAutocomplete()) return;

  const focusedOption = interaction.options.getFocused(true);

  const { name: optionName, value: searchValue } = focusedOption;

  // 處理角色選擇的自動完成
  if (optionName.startsWith('main') || optionName.startsWith('support') || optionName === 'student') {
    const studentsData = await getStudentsData();

    let filteredStudents: any[] = [];

    if (optionName === 'student') {
      // 對於 student 命令，顯示所有已發布的學生
      filteredStudents = Object.values(studentsData);
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

      return {
        name: `${displayName} (${formattedPathName})`,
        value: student.Id.toString(),
      };
    });

    await interaction.respond(choices);
  }
});
