import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, AttachmentBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { drawInQueueReply } from '@/utilities/index.js';
import { getTWStudentsData, smartTranslate, getCurrentGachaData } from '@/utilities/ba/index.js';
import { getVideoPaths } from '@/utilities/ba/video.js';
import Queue from 'queue';
import { createCanvas, loadImage, GlobalFonts } from '@napi-rs/canvas';
import { join } from 'path';
import emoji from '@/emoji.js';

GlobalFonts.registerFromPath(join(process.cwd(), 'src', 'font', 'Nexon.ttf'), 'Nexon');
GlobalFonts.registerFromPath(join(process.cwd(), 'src', 'font', 'NunitoSans-Regular.ttf'), 'NunitoSansRegular');
GlobalFonts.registerFromPath(join(process.cwd(), 'src', 'font', 'SourceHanSansTC-Regular.otf'), 'SourceHanSansTC');
GlobalFonts.registerFromPath(join(process.cwd(), 'src', 'font', 'SourceHanSans-Regular.otf'), 'SourceHanSans');

const drawQueue = new Queue({ autostart: true });

// 招募點數記憶體存儲
// 格式: { userId: { targetStudentId: { points: number, stones: number, stats: { oneStar: number, twoStar: number, threeStar: number }, obtainedCharacters: Set<string> } } }
const recruitmentPoints = new Map<
  string,
  Map<
    string,
    {
      points: number;
      stones: number;
      stats: { oneStar: number; twoStar: number; threeStar: number };
      obtainedCharacters: Set<string>;
    }
  >
>();

// 獲取用戶對特定目標的招募點數
export function getUserRecruitmentPoints(
  userId: string,
  targetStudentId: string,
): {
  points: number;
  stones: number;
  stats: { oneStar: number; twoStar: number; threeStar: number };
  obtainedCharacters: Set<string>;
} {
  const userData = recruitmentPoints.get(userId);
  if (!userData) {
    return { points: 0, stones: 0, stats: { oneStar: 0, twoStar: 0, threeStar: 0 }, obtainedCharacters: new Set() };
  }
  return userData.get(targetStudentId) || { points: 0, stones: 0, stats: { oneStar: 0, twoStar: 0, threeStar: 0 }, obtainedCharacters: new Set() };
}

// 更新用戶對特定目標的招募點數
export function updateUserRecruitmentPoints(
  userId: string,
  targetStudentId: string,
  additionalPoints: number = 10,
  pullResults?: any[],
): {
  points: number;
  stones: number;
  stats: { oneStar: number; twoStar: number; threeStar: number };
  obtainedCharacters: Set<string>;
} {
  let userData = recruitmentPoints.get(userId);
  if (!userData) {
    userData = new Map();
    recruitmentPoints.set(userId, userData);
  }

  const currentData = userData.get(targetStudentId) || {
    points: 0,
    stones: 0,
    stats: { oneStar: 0, twoStar: 0, threeStar: 0 },
    obtainedCharacters: new Set(),
  };

  const newPoints = currentData.points + additionalPoints;
  const newStones = newPoints * 120; // 每點對應120石頭

  // 統計本次抽卡結果並記錄新角色
  let newStats = { ...currentData.stats };
  let newObtainedCharacters = new Set(currentData.obtainedCharacters);

  if (pullResults) {
    pullResults.forEach((student: any) => {
      if (student.StarGrade === 1) newStats.oneStar++;
      else if (student.StarGrade === 2) newStats.twoStar++;
      else if (student.StarGrade === 3) newStats.threeStar++;

      // 記錄新獲得的角色
      newObtainedCharacters.add(student.Id.toString());
    });
  }

  const newData = {
    points: newPoints,
    stones: newStones,
    stats: newStats,
    obtainedCharacters: newObtainedCharacters,
  };

  userData.set(targetStudentId, newData);

  return newData;
}

// 重置用戶對特定目標的招募點數（當更換目標時）
export function resetUserRecruitmentPoints(userId: string, targetStudentId: string): void {
  const userData = recruitmentPoints.get(userId);
  if (userData) {
    userData.set(targetStudentId, {
      points: 0,
      stones: 0,
      stats: { oneStar: 0, twoStar: 0, threeStar: 0 },
      obtainedCharacters: new Set(),
    });
  }
}

// 手動重置用戶對特定目標的招募點數（用戶主動重製）
export function manualResetUserRecruitmentPoints(userId: string, targetStudentId: string): void {
  const userData = recruitmentPoints.get(userId);
  if (userData) {
    userData.set(targetStudentId, {
      points: 0,
      stones: 0,
      stats: { oneStar: 0, twoStar: 0, threeStar: 0 },
      obtainedCharacters: new Set(),
    });
  }
}

// 圖片快取機制
const imageCache = new Map<string, any>();
const CACHE_SIZE_LIMIT = 100; // 限制快取大小

// 清理快取函數
function cleanCache() {
  if (imageCache.size > CACHE_SIZE_LIMIT) {
    const keysToDelete = Array.from(imageCache.keys()).slice(0, imageCache.size - CACHE_SIZE_LIMIT);
    keysToDelete.forEach((key) => imageCache.delete(key));
  }
}

// 優化的圖片載入函數
async function loadImageWithCache(imageUrl: string, cacheKey: string) {
  // 檢查快取
  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey);
  }

  try {
    const image = await loadImage(imageUrl);
    // 添加到快取
    imageCache.set(cacheKey, image);
    cleanCache();
    return image;
  } catch (error) {
    console.log(`圖片載入失敗: ${imageUrl}`);
    return null;
  }
}

// 獲取默認PU角色
export async function getDefaultPUCharacter(server: string): Promise<{ id: string; isLimited: number } | null> {
  try {
    const gachaData = await getCurrentGachaData(server);
    if (gachaData.characters && gachaData.characters.length > 0) {
      const puCharacter = gachaData.characters[0];
      const studentsData = await getTWStudentsData();
      const puStudent = studentsData[puCharacter.id];
      if (puStudent) {
        return {
          id: puCharacter.id.toString(),
          isLimited: puStudent.IsLimited || 0,
        };
      }
    }
  } catch (error) {
    console.log(`無法獲取 ${server} 伺服器的PU角色資料:`, error);
  }
  return null;
}

// 抽卡機率類
export class GachaSimulator {
  private database: any[];
  private targetStudent: any;

  constructor(studentsData: any, targetStudentId: string) {
    // 嘗試通過ID查找，如果失敗則嘗試通過名稱查找
    this.targetStudent = studentsData[targetStudentId];
    if (!this.targetStudent) {
      // 通過名稱查找
      const studentByName = Object.values(studentsData).find((s: any) => s.Name === targetStudentId || s.PathName === targetStudentId || s.Id.toString() === targetStudentId);
      if (studentByName) {
        this.targetStudent = studentByName;
      } else {
        throw new Error(`找不到ID或名稱為 ${targetStudentId} 的學生`);
      }
    }

    // 根據目標角色的IsLimited值過濾可抽取的角色
    const targetIsLimited = this.targetStudent.IsLimited || 0;
    let availableStudents = Object.values(studentsData);

    // 根據目標角色的IsLimited值進一步過濾
    if (targetIsLimited === 0) {
      // 目標角色是常駐角色，只出現IsLimited為0的角色
      availableStudents = availableStudents.filter((s: any) => s.IsLimited === 0);
    } else if (targetIsLimited === 1) {
      // 目標角色是IsLimited為1的角色，只出現IsLimited為0和1的角色
      availableStudents = availableStudents.filter((s: any) => s.IsLimited === 0 || s.IsLimited === 1);
    }

    availableStudents = availableStudents.filter((s: any) => s.IsLimited !== 2);

    // 構建抽卡資料庫
    this.database = availableStudents.map((student: any) => {
      let prob = 0;
      let lastProb = 0;

      if (student.StarGrade === 3) {
        if (student.Id === this.targetStudent.Id) {
          prob = 0.007; // UP角色占3星總機率的0.7%
          lastProb = 0.007;
        } else {
          const otherThreeStarCount = availableStudents.filter((s: any) => s.StarGrade === 3 && s.Id !== this.targetStudent.Id).filter((s: any) => s.IsLimited !== 2).length;
          if (otherThreeStarCount > 0) {
            prob = 0.023 / otherThreeStarCount;
            lastProb = 0.023 / otherThreeStarCount;
          }
        }
      } else if (student.StarGrade === 2) {
        const twoStarCount = availableStudents.filter((s: any) => s.StarGrade === 2).filter((s: any) => s.IsLimited !== 2).length;
        if (twoStarCount > 0) {
          prob = 0.155 / twoStarCount;
          lastProb = 0.94 / twoStarCount;
        }
      } else if (student.StarGrade === 1) {
        const oneStarCount = availableStudents.filter((s: any) => s.StarGrade === 1).filter((s: any) => s.IsLimited !== 2).length;
        if (oneStarCount > 0) {
          prob = 0.785 / oneStarCount;
          lastProb = 0;
        }
      }

      return {
        ...student,
        Prob: prob,
        LastProb: lastProb,
      };
    });
  }

  // Fisher-Yates 洗牌演算法
  private fisherYatesShuffle(arr: any[]) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  // 隨機獲取一個學生
  private getRandomStudent(last: boolean = false) {
    const dataTemp = JSON.parse(JSON.stringify(this.database));
    this.fisherYatesShuffle(dataTemp);
    let result = null;

    while (!result) {
      const random = Math.random();
      let sum = 0;

      for (let i = 0; i < dataTemp.length; i++) {
        const item = dataTemp[i];
        sum += last ? item.LastProb : item.Prob;
        if (sum >= random) {
          result = {
            Id: item.Id,
            Name: item.Name,
            StarGrade: item.StarGrade,
            IsLimited: item.IsLimited,
          };
          break;
        }
      }
    }
    return result;
  }

  // 確定三星
  private getSureStudent() {
    const dataTemp = JSON.parse(JSON.stringify(this.database));
    this.fisherYatesShuffle(dataTemp);
    // 排除 Limited = 2 的角色，只抽取 Limited = 0 和 1 的三星角色
    const threeStarStudents = dataTemp.filter((s: any) => s.StarGrade === 3 && s.IsLimited !== 2);
    const index = Math.floor(Math.random() * threeStarStudents.length);
    const item = threeStarStudents[index];
    return {
      Id: item.Id,
      Name: item.Name,
      StarGrade: item.StarGrade,
      IsLimited: item.IsLimited,
    };
  }

  // 執行10抽
  public pull10() {
    const results = [];
    let hasThreeStar = false;
    let hasTargetStudent = false;
    let hasTwoStar = false;

    // 先進行9次正常抽卡
    for (let i = 0; i < 9; i++) {
      const student = this.getRandomStudent();
      results.push(student);

      if (student.StarGrade === 3) {
        hasThreeStar = true;
        hasTwoStar = true;
      }
      if (student.StarGrade === 2) {
        hasTwoStar = true;
      }
      if (student.Id === this.targetStudent.Id) {
        hasTargetStudent = true;
      }
    }

    // 第10次抽卡：如果前面沒有2星，則保底2星
    let lastStudent;
    if (!hasTwoStar) {
      // 保底2星：從2星角色中隨機選擇一個
      const dataTemp = JSON.parse(JSON.stringify(this.database));
      this.fisherYatesShuffle(dataTemp);
      const twoStarStudents = dataTemp.filter((s: any) => s.StarGrade === 2 && s.IsLimited !== 2);

      if (twoStarStudents.length > 0) {
        const index = Math.floor(Math.random() * twoStarStudents.length);
        const item = twoStarStudents[index];
        lastStudent = {
          Id: item.Id,
          Name: item.Name,
          StarGrade: item.StarGrade,
          IsLimited: item.IsLimited,
        };
        hasTwoStar = true;
      } else {
        // 如果沒有2星角色，則正常抽卡
        lastStudent = this.getRandomStudent();
      }
    } else {
      // 如果前面已經有2星，則正常抽卡
      lastStudent = this.getRandomStudent();
    }

    results.push(lastStudent);

    // 檢查最後一次抽卡結果
    if (lastStudent.StarGrade === 3) {
      hasThreeStar = true;
    }
    if (lastStudent.Id === this.targetStudent.Id) {
      hasTargetStudent = true;
    }

    // 藍變紫機率 (5%)
    if (hasThreeStar && Math.random() < 0.05) {
      // 這裡可以添加特殊效果，暫時跳過
    }

    return {
      results,
      hasThreeStar,
      hasTwoStar,
      hasTargetStudent,
      targetStudent: this.targetStudent,
    };
  }
}

export default {
  data: new SlashCommandBuilder()
    .setName('pull')
    .setDescription('進行10抽模擬')
    .setNameLocalizations({
      'zh-TW': '抽卡',
    })
    .setDescriptionLocalizations({
      'zh-TW': '進行10抽模擬',
    })
    .addStringOption((option) =>
      option
        .setName('target')
        .setDescription('目標角色名稱或ID（留空使用當前第一位PU角色）')
        .setNameLocalizations({
          'zh-TW': '目標角色',
        })
        .setDescriptionLocalizations({
          'zh-TW': '目標角色名稱或ID（留空使用當前第一位PU角色）',
        })
        .setAutocomplete(true)
        .setRequired(false),
    ),
  /**
   * @description 指定角色10抽
   * @param interaction - 交互實例
   * @param _args - 參數
   */
  async execute(interaction: ChatInputCommandInteraction, ..._args: string[]) {
    const server = interaction.options.getString('server') || 'Jp';
    let targetStudentId = interaction.options.getString('target');

    await interaction.deferReply();

    const drawTask = async () => {
      try {
        const studentsData = await getTWStudentsData();

        // 如果沒有指定目標角色，使用當前PU角色
        if (!targetStudentId) {
          const puCharacter = await getDefaultPUCharacter(server);
          if (!puCharacter) {
            return interaction.editReply({
              embeds: [
                new EmbedBuilder()
                  .setColor('#E76161')
                  .setTitle('無法獲取當前PU角色，老師！')
                  .setDescription('請手動指定目標角色')
                  .setThumbnail('https://cdnimg-v2.gamekee.com/wiki2.0/images/w_240/h_240/215/43637/2025/3/1/543385.gif'),
              ],
            });
          }
          targetStudentId = puCharacter.id;
        }

        // 驗證目標角色是否存在
        if (!studentsData[targetStudentId]) {
          return interaction.editReply({
            embeds: [
              new EmbedBuilder()
                .setColor('#E76161')
                .setTitle('找不到指定的角色，老師！')
                .setDescription(`角色ID: ${targetStudentId}`)
                .setThumbnail('https://cdnimg-v2.gamekee.com/wiki2.0/images/w_240/h_240/215/43637/2025/3/1/543385.gif'),
            ],
          });
        }

        // 檢查是否更換了目標角色，如果是則重置招募點數
        const userId = interaction.user.id;
        const previousTarget = getUserRecruitmentPoints(userId, targetStudentId);

        // 如果之前沒有對這個目標的記錄，或者這是新的目標，則重置點數
        if (previousTarget.points === 0) {
          resetUserRecruitmentPoints(userId, targetStudentId);
        }

        // 創建抽卡模擬器
        const gachaSimulator = new GachaSimulator(studentsData, targetStudentId);
        const pullResult = gachaSimulator.pull10();

        // 獲取抽卡前的已獲得角色列表
        const previousPoints = getUserRecruitmentPoints(userId, targetStudentId);

        // 更新招募點數
        const updatedPoints = updateUserRecruitmentPoints(userId, targetStudentId, 10, pullResult.results);

        // 獲取影片路徑
        const videoPaths = getVideoPaths();

        // 根據是否抽到三星選擇動畫
        const hasThreeStar = pullResult.hasThreeStar;
        const animationType = hasThreeStar ? 'special' : 'normal';
        const videoUrl = videoPaths[animationType as keyof typeof videoPaths];

        // 播放抽卡動畫，顯示目標角色頭像
        const animationEmbed = new EmbedBuilder().setImage(videoUrl);
        const targetStudent = studentsData[targetStudentId];

        await interaction.editReply({
          content: `-# 招募目標: ${targetStudent.Name} | 已使用 ${previousPoints.stones}${emoji.stone}`,
          embeds: [animationEmbed],
        });

        // 創建動態更新的角色列表，用於"新"標籤判斷
        const dynamicObtainedCharacters = new Set(previousPoints.obtainedCharacters);
        const newCharactersInThisPull = new Set<string>();
        const firstAppearanceInThisPull = new Map<string, number>(); // 追蹤每個角色在本次抽卡中的第一次出現位置

        // 遍歷本次抽卡結果，動態更新已獲得角色列表
        pullResult.results.forEach((student: any, index: number) => {
          const studentId = student.Id.toString();
          if (!dynamicObtainedCharacters.has(studentId)) {
            // 如果這個角色之前沒抽到過，標記為本次新獲得
            newCharactersInThisPull.add(studentId);
            dynamicObtainedCharacters.add(studentId);
          }

          // 追蹤每個角色在本次抽卡中的第一次出現位置
          if (!firstAppearanceInThisPull.has(studentId)) {
            firstAppearanceInThisPull.set(studentId, index);
          }
        });

        // 創建混合數據：使用抽卡後的招募點數，但使用動態更新的角色列表
        const mixedPoints = {
          points: updatedPoints.points,
          stones: updatedPoints.stones,
          stats: updatedPoints.stats,
          obtainedCharacters: dynamicObtainedCharacters,
          newCharactersInThisPull: newCharactersInThisPull,
          firstAppearanceInThisPull: firstAppearanceInThisPull, // 添加第一次出現的追蹤
        };

        // 同時開始繪製圖片和等待動畫，確保圖片繪製完成後再顯示結果
        const [imageBuffer] = await Promise.all([
          drawPullResultImage(pullResult, mixedPoints),
          new Promise((resolve) => setTimeout(resolve, 7400)), // 等待時間改為7.4秒
        ]);

        // 確保圖片繪製完成後再繼續
        if (!imageBuffer) {
          return interaction.editReply({
            embeds: [
              new EmbedBuilder().setColor('#E76161').setTitle('繪製圖片時發生錯誤，老師！').setThumbnail('https://cdnimg-v2.gamekee.com/wiki2.0/images/w_240/h_240/215/43637/2025/3/1/543385.gif'),
            ],
          });
        }

        const attachment = new AttachmentBuilder(imageBuffer, { name: 'pullresult.png' });

        // 創建包含"再來一次"和"重製抽數"按鈕的回覆
        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
          new ButtonBuilder().setCustomId(`pull_again_${targetStudentId}`).setLabel('再抽十抽').setStyle(ButtonStyle.Primary).setEmoji(emoji.gacha10),
          new ButtonBuilder().setCustomId(`reset_pull_${targetStudentId}`).setLabel('重製抽數').setStyle(ButtonStyle.Secondary).setEmoji('🔄'),
        );

        // 構建統計顯示文字
        let statsDisplay = '';
        if (updatedPoints.stats.threeStar > 0) {
          const totalPulls = updatedPoints.points; // 總抽數
          const avgPullsPerThreeStar = totalPulls / updatedPoints.stats.threeStar; // 平均幾抽一位3星
          const threeStarRate = ((updatedPoints.stats.threeStar / totalPulls) * 100).toFixed(1); // 3星機率百分比

          statsDisplay = ` | 已抽取 ${updatedPoints.stats.threeStar} 位3星角色 平均 ${avgPullsPerThreeStar.toFixed(1)}/${threeStarRate}% 抽到3星角色 `;
        }

        interaction.editReply({
          content: `-# 招募目標: ${targetStudent.Name} | 已使用 ${updatedPoints.stones}${emoji.stone}${statsDisplay}`,
          embeds: [],
          files: [attachment],
          components: [row],
        });
      } catch (error) {
        console.error(error);
        interaction.editReply({
          embeds: [
            new EmbedBuilder()
              .setColor('#E76161')
              .setTitle('發生了一些問題，請稍後再試，老師！')
              .setDescription(`\`${error}\``)
              .setThumbnail('https://cdnimg-v2.gamekee.com/wiki2.0/images/w_240/h_240/215/43637/2025/3/1/543385.gif'),
          ],
        });
      }
    };

    drawQueue.push(drawTask);

    if (drawQueue.length !== 1) {
      drawInQueueReply(interaction, `正在繪製抽卡結果 ${drawQueue.length - 1} 號，老師請稍等~`);
    }
  },
};

export async function drawPullResultImage(
  pullResult: any,
  recruitmentPoints?: {
    points: number;
    stones: number;
    stats: { oneStar: number; twoStar: number; threeStar: number };
    obtainedCharacters: Set<string>;
    newCharactersInThisPull?: Set<string>;
    firstAppearanceInThisPull?: Map<string, number>;
  },
) {
  try {
    const canvas = createCanvas(1334, 750);
    const ctx = canvas.getContext('2d');

    // 並行載入所有UI圖片
    const uiImagePromises = [
      loadImageWithCache(join(process.cwd(), 'public', 'ui', 'Background.png'), 'background'),
      loadImageWithCache(join(process.cwd(), 'public', 'ui', 'Point.png'), 'point'),
      loadImageWithCache(join(process.cwd(), 'public', 'ui', 'Star.png'), 'star'),
    ];

    const [backgroundImage, pointImage, starImage] = await Promise.all(uiImagePromises);

    // 繪製背景圖片
    if (backgroundImage) {
      ctx.drawImage(backgroundImage, 0, 0, 1334, 750);
    } else {
      // 如果背景圖片載入失敗，使用漸變背景作為備用
      const gradient = ctx.createLinearGradient(0, 0, 0, 750);
      gradient.addColorStop(0, '#87CEEB'); // 淺藍色
      gradient.addColorStop(1, '#FFFFFF'); // 白色
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 1334, 750);
    }

    // 繪製抽卡結果網格 (5x2)
    const cardWidth = 130;
    const cardHeight = 162.5; // 固定卡片比例為120x120
    const spacingX = 50; // 調整水平間距，讓卡片排列更緊湊
    const spacingY = 225; // 調整垂直間距，適應固定卡片高度

    // 計算網格總寬度和起始位置，使網格居中
    const gridWidth = 5 * cardWidth + 4 * spacingX; // 5張卡片 + 4個間距
    const startX = (canvas.width - gridWidth) / 2; // 水平居中
    const startY = 140; // 從標題下方開始，調整位置

    // 並行載入所有角色圖標
    const iconPromises = pullResult.results.map(async (student: any, index: number) => {
      const row = Math.floor(index / 5);
      const col = index % 5;
      const x = startX + col * (cardWidth + spacingX); // 修正：考慮卡片寬度
      const y = startY + row * spacingY;

      return {
        student,
        position: { x, y },
        icon: await loadStudentIcon(student),
        originalIndex: index, // 保存原始索引
      };
    });

    const cardData = await Promise.all(iconPromises);

    // 第一階段：繪製所有漸變背景（確保在最下層）
    for (const data of cardData) {
      if (data.student.StarGrade >= 2) {
        await drawGradientBackground(ctx, data.student, data.position.x, data.position.y, cardWidth, cardHeight);
      }
    }

    // 第二階段：繪製所有卡片
    for (let i = 0; i < cardData.length; i++) {
      const data = cardData[i];
      await drawStudentCard(
        ctx,
        data.student,
        data.position.x,
        data.position.y,
        cardWidth,
        cardHeight,
        pullResult.targetStudent.Id,
        data.icon,
        recruitmentPoints?.obtainedCharacters,
        recruitmentPoints?.newCharactersInThisPull,
        recruitmentPoints?.firstAppearanceInThisPull,
        data.originalIndex, // 使用原始索引
        starImage,
      );
    }

    // 在右下角繪製Point UI元素
    if (pointImage) {
      // 繪製傾斜平行四邊形背景
      const uiWidth = 200;
      const uiHeight = 60; // 減少高度
      const uiX = canvas.width - uiWidth - 50; // 往左移動更多
      const uiY = canvas.height - uiHeight - 20; // 距離下邊緣20像素
      const skewAngle = 10; // 傾斜角度
      const cornerRadius = 5; // 圓角半徑

      ctx.save();

      // 計算傾斜偏移量
      const skewOffset = Math.tan((skewAngle * Math.PI) / 180) * uiHeight;

      // 計算平行四邊形的四個頂點
      const points = [
        { x: uiX + skewOffset, y: uiY }, // 左上
        { x: uiX + uiWidth + skewOffset, y: uiY }, // 右上
        { x: uiX + uiWidth, y: uiY + uiHeight }, // 右下
        { x: uiX, y: uiY + uiHeight }, // 左下
      ];

      // 繪製白色上半部分（底部無圓角）
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.moveTo(points[0].x + cornerRadius, points[0].y);
      ctx.lineTo(points[1].x - cornerRadius, points[1].y);
      ctx.quadraticCurveTo(points[1].x, points[1].y, points[1].x, points[1].y + cornerRadius);
      ctx.lineTo(points[1].x, points[1].y + uiHeight / 2);
      ctx.lineTo(points[0].x, points[0].y + uiHeight / 2);
      ctx.lineTo(points[0].x, points[0].y + cornerRadius);
      ctx.quadraticCurveTo(points[0].x, points[0].y, points[0].x + cornerRadius, points[0].y);
      ctx.closePath();
      ctx.fill();

      // 繪製藍色下半部分覆蓋（使用與白色相同的形狀）
      ctx.fillStyle = '#2C608C';
      ctx.beginPath();
      // 只繪製下半部分，使用較小的傾斜角度
      const blueSkewAngle = 5; // 藍色區域使用更小的傾斜角度
      const blueSkewOffset = Math.tan((blueSkewAngle * Math.PI) / 180) * uiHeight;

      // 計算藍色區域的頂點（使用較小的傾斜角度）
      const bluePoints = [
        { x: uiX + blueSkewOffset, y: uiY + uiHeight / 2 }, // 左上
        { x: uiX + uiWidth + blueSkewOffset, y: uiY + uiHeight / 2 }, // 右上
        { x: uiX + uiWidth, y: uiY + uiHeight }, // 右下
        { x: uiX, y: uiY + uiHeight }, // 左下
      ];

      ctx.moveTo(bluePoints[0].x, bluePoints[0].y);
      ctx.lineTo(bluePoints[1].x, bluePoints[1].y);
      ctx.lineTo(bluePoints[2].x, bluePoints[2].y - cornerRadius);
      ctx.quadraticCurveTo(bluePoints[2].x, bluePoints[2].y, bluePoints[2].x - cornerRadius, bluePoints[2].y);
      ctx.lineTo(bluePoints[3].x + cornerRadius, bluePoints[3].y);
      ctx.quadraticCurveTo(bluePoints[3].x, bluePoints[3].y, bluePoints[3].x, bluePoints[3].y - cornerRadius);
      ctx.lineTo(bluePoints[0].x, bluePoints[0].y + cornerRadius);
      ctx.quadraticCurveTo(bluePoints[0].x, bluePoints[0].y, bluePoints[0].x + cornerRadius, bluePoints[0].y);
      ctx.closePath();
      ctx.fill();

      // 繪製邊框（圓角平行四邊形，使用藍色）
      ctx.strokeStyle = '#2C608C';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(points[0].x + cornerRadius, points[0].y);
      ctx.lineTo(points[1].x - cornerRadius, points[1].y);
      ctx.quadraticCurveTo(points[1].x, points[1].y, points[1].x, points[1].y + cornerRadius);
      ctx.lineTo(points[2].x, points[2].y - cornerRadius);
      ctx.quadraticCurveTo(points[2].x, points[2].y, points[2].x - cornerRadius, points[2].y);
      ctx.lineTo(points[3].x + cornerRadius, points[3].y);
      ctx.quadraticCurveTo(points[3].x, points[3].y, points[3].x, points[3].y - cornerRadius);
      ctx.lineTo(points[0].x, points[0].y + cornerRadius);
      ctx.quadraticCurveTo(points[0].x, points[0].y, points[0].x + cornerRadius, points[0].y);
      ctx.closePath();
      ctx.stroke();

      ctx.restore();

      // 繪製Point圖標（在左側，稍微重疊）
      const pointWidth = 100;
      const pointHeight = 80;
      const pointX = uiX - pointWidth / 2 - 10;
      const pointY = uiY + (uiHeight - pointHeight) / 2;
      ctx.drawImage(pointImage, pointX, pointY, pointWidth, pointHeight);

      // 繪製"招募點數"文字（上半部分，考慮傾斜）
      ctx.save();
      ctx.fillStyle = '#2d4663';
      ctx.font = 'bold 16px Nexon, "SourceHanSansTC", "SourceHanSans", sans-serif';
      ctx.textAlign = 'center';
      const textX = uiX + uiWidth / 2 + skewOffset / 2; // 考慮傾斜調整文字位置
      ctx.fillText('招募點數', textX, uiY + uiHeight / 4 + 6);
      ctx.restore();

      // 繪製"50"數字（下半部分，考慮傾斜）
      ctx.save();
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '20px Nexon, "SourceHanSansTC", "SourceHanSans", sans-serif';
      ctx.textAlign = 'center';
      const numberX = uiX + uiWidth / 2 + skewOffset / 2; // 考慮傾斜調整數字位置
      ctx.fillText((recruitmentPoints?.points || 0).toString(), numberX, uiY + (uiHeight * 3) / 4 + 8);
      ctx.restore();
    }

    return canvas.toBuffer('image/png');
  } catch (error) {
    console.error('Error drawing pull result image:', error);
    return null;
  }
}

// 優化的圖標載入函數
async function loadStudentIcon(student: any) {
  const iconUrl = `https://schaledb.com/images/student/icon/${student.Id}.webp`;
  let iconImage = await loadImageWithCache(iconUrl, student.Id);

  return iconImage;
}

// 繪製漸變背景函數
async function drawGradientBackground(ctx: any, student: any, x: number, y: number, width: number, height: number) {
  const skewAngle = 10;
  const cardRadius = 5;

  if (student.StarGrade === 2) {
    // 繪製漸變背景（比卡片稍大，使用平行四邊形形狀，高度延伸到上面一排）
    const bgOffset = 22;
    const bgWidth = width + bgOffset;
    const bgHeight = height * 2;
    const bgX = x - bgOffset - bgOffset * 0.2;
    const bgY = y - height / 2;
    const bgSkewOffset = Math.tan((skewAngle * Math.PI) / 180) * bgHeight;

    // 2星 - 金色漸變背景（使用背景的實際範圍）
    const gradient = ctx.createLinearGradient(bgX, bgY, bgX, bgY + bgHeight);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
    gradient.addColorStop(0.125, 'rgba(255, 255, 255, 0)');
    gradient.addColorStop(0.25, 'rgba(250, 250, 250, 0.3)');
    gradient.addColorStop(0.45, 'rgba(245, 245, 245, 0.7)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.9)');
    gradient.addColorStop(0.55, 'rgba(245, 245, 245, 0.7)');
    gradient.addColorStop(0.75, 'rgba(250, 250, 250, 0.3)');
    gradient.addColorStop(0.875, 'rgba(255, 255, 255, 0)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    // 計算漸變背景的平行四邊形頂點
    const bgPoints = [
      { x: bgX + bgSkewOffset, y: bgY },
      { x: bgX + bgWidth + bgSkewOffset, y: bgY },
      { x: bgX + bgWidth, y: bgY + bgHeight },
      { x: bgX, y: bgY + bgHeight },
    ];

    ctx.fillStyle = gradient;
    // 繪製圓角平行四邊形背景
    ctx.beginPath();
    ctx.moveTo(bgPoints[0].x + cardRadius, bgPoints[0].y);
    ctx.lineTo(bgPoints[1].x - cardRadius, bgPoints[1].y);
    ctx.quadraticCurveTo(bgPoints[1].x, bgPoints[1].y, bgPoints[1].x, bgPoints[1].y + cardRadius);
    ctx.lineTo(bgPoints[2].x, bgPoints[2].y - cardRadius);
    ctx.quadraticCurveTo(bgPoints[2].x, bgPoints[2].y, bgPoints[2].x - cardRadius, bgPoints[2].y);
    ctx.lineTo(bgPoints[3].x + cardRadius, bgPoints[3].y);
    ctx.quadraticCurveTo(bgPoints[3].x, bgPoints[3].y, bgPoints[3].x, bgPoints[3].y - cardRadius);
    ctx.lineTo(bgPoints[0].x, bgPoints[0].y + cardRadius);
    ctx.quadraticCurveTo(bgPoints[0].x, bgPoints[0].y, bgPoints[0].x + cardRadius, bgPoints[0].y);
    ctx.closePath();
    ctx.fill();
  } else if (student.StarGrade === 3) {
    // 繪製漸變背景（比卡片稍大，使用圓角平行四邊形形狀，高度延伸到上面一排）
    const bgOffset = 44;
    const bgWidth = width + bgOffset;
    const bgHeight = height * 2;
    const bgX = x - bgOffset + 7;
    const bgY = y - height / 2;
    const bgSkewOffset = Math.tan((skewAngle * Math.PI) / 180) * bgHeight;

    // 3星 - 粉色漸變背景（使用背景的實際範圍）
    const gradient = ctx.createLinearGradient(bgX, bgY, bgX, bgY + bgHeight);
    gradient.addColorStop(0, 'rgba(211, 225, 250, 0.2)');
    gradient.addColorStop(0.2, 'rgba(245, 228, 252, 0.65)');
    gradient.addColorStop(0.4, 'rgba(250, 250, 250, 0.9)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.6, 'rgba(250, 250, 250, 0.9)');
    gradient.addColorStop(0.8, 'rgba(245, 228, 252, 0.65)');
    gradient.addColorStop(1, 'rgba(211, 225, 250, 0.2)');

    // 計算漸變背景的圓角平行四邊形頂點
    const bgPoints = [
      { x: bgX + bgSkewOffset, y: bgY },
      { x: bgX + bgWidth + bgSkewOffset, y: bgY },
      { x: bgX + bgWidth, y: bgY + bgHeight },
      { x: bgX, y: bgY + bgHeight },
    ];

    ctx.fillStyle = gradient;
    // 繪製圓角平行四邊形背景
    ctx.beginPath();
    ctx.moveTo(bgPoints[0].x + cardRadius, bgPoints[0].y);
    ctx.lineTo(bgPoints[1].x - cardRadius, bgPoints[1].y);
    ctx.quadraticCurveTo(bgPoints[1].x, bgPoints[1].y, bgPoints[1].x, bgPoints[1].y + cardRadius);
    ctx.lineTo(bgPoints[2].x, bgPoints[2].y - cardRadius);
    ctx.quadraticCurveTo(bgPoints[2].x, bgPoints[2].y, bgPoints[2].x - cardRadius, bgPoints[2].y);
    ctx.lineTo(bgPoints[3].x + cardRadius, bgPoints[3].y);
    ctx.quadraticCurveTo(bgPoints[3].x, bgPoints[3].y, bgPoints[3].x, bgPoints[3].y - cardRadius);
    ctx.lineTo(bgPoints[0].x, bgPoints[0].y + cardRadius);
    ctx.quadraticCurveTo(bgPoints[0].x, bgPoints[0].y, bgPoints[0].x + cardRadius, bgPoints[0].y);
    ctx.closePath();
    ctx.fill();
  }
}

async function drawStudentCard(
  ctx: any,
  student: any,
  x: number,
  y: number,
  width: number,
  height: number,
  targetStudentId: number,
  iconImage?: any,
  obtainedCharacters?: Set<string>,
  newCharactersInThisPull?: Set<string>,
  firstAppearanceInThisPull?: Map<string, number>,
  currentIndex?: number,
  starImage?: any,
) {
  // 平行四邊形參數
  const skewAngle = 10; // 修改傾斜角度為10度
  const cardRadius = 5; // 圓角半徑

  // 定義名條高度（在繪製名條和調整角色圖片區域時都需要使用）
  const nameBarHeight = height * 0.23; // 名條高度為卡片高度的20%
  const nameBarY = y + height - nameBarHeight;

  // 保存當前狀態
  ctx.save();

  // 根據星級設置不同的陰影效果
  if (student.StarGrade === 1) {
    // 1星 - 藍色陰影
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 6;
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 4;
  } else if (student.StarGrade === 2) {
    // 2星 - 金色陰影
    ctx.shadowColor = 'rgba(255, 215, 0, 0.4)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 4;
  } else if (student.StarGrade === 3) {
    // 3星 - 粉色陰影
    ctx.shadowColor = 'rgba(255, 192, 203, 0.4)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 4;
  } else {
    // 默認陰影
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
  }

  // 計算平行四邊形的四個頂點
  const skewOffset = Math.tan((skewAngle * Math.PI) / 180) * height;
  const points = [
    { x: x + skewOffset, y: y }, // 左上
    { x: x + width + skewOffset, y: y }, // 右上
    { x: x + width, y: y + height }, // 右下
    { x: x, y: y + height }, // 左下
  ];

  // 繪製卡片本身的背景
  if (student.StarGrade === 1) {
    // 1星 - 灰色背景 (對應 $gray-card)
    ctx.fillStyle = '#e4ebf1';
  } else if (student.StarGrade === 2) {
    // 2星 - 金色背景 (對應 $golden-card)
    ctx.fillStyle = '#fef687';
  } else if (student.StarGrade === 3) {
    // 3星 - 粉色背景 (對應 $pink-card)
    ctx.fillStyle = '#fbc5e5';
  } else {
    // 默認白色背景
    ctx.fillStyle = '#e4ebf1';
  }

  // 繪製圓角平行四邊形
  ctx.beginPath();
  ctx.moveTo(points[0].x + cardRadius, points[0].y);
  ctx.lineTo(points[1].x - cardRadius, points[1].y);
  ctx.quadraticCurveTo(points[1].x, points[1].y, points[1].x, points[1].y + cardRadius);
  ctx.lineTo(points[2].x, points[2].y - cardRadius);
  ctx.quadraticCurveTo(points[2].x, points[2].y, points[2].x - cardRadius, points[2].y);
  ctx.lineTo(points[3].x + cardRadius, points[3].y);
  ctx.quadraticCurveTo(points[3].x, points[3].y, points[3].x, points[3].y - cardRadius);
  ctx.lineTo(points[0].x, points[0].y + cardRadius);
  ctx.quadraticCurveTo(points[0].x, points[0].y, points[0].x + cardRadius, points[0].y);
  ctx.closePath();
  ctx.fill();

  // 創建裁剪路徑，裁切超出平行四邊形的部分
  ctx.beginPath();
  ctx.moveTo(points[0].x + cardRadius, points[0].y);
  ctx.lineTo(points[1].x - cardRadius, points[1].y);
  ctx.quadraticCurveTo(points[1].x, points[1].y, points[1].x, points[1].y + cardRadius);
  ctx.lineTo(points[2].x, points[2].y - cardRadius);
  ctx.quadraticCurveTo(points[2].x, points[2].y, points[2].x - cardRadius, points[2].y);
  ctx.lineTo(points[3].x + cardRadius, points[3].y);
  ctx.quadraticCurveTo(points[3].x, points[3].y, points[3].x, points[3].y - cardRadius);
  ctx.lineTo(points[0].x, points[0].y + cardRadius);
  ctx.quadraticCurveTo(points[0].x, points[0].y, points[0].x + cardRadius, points[0].y);
  ctx.closePath();
  ctx.clip();

  // 繪製角色圖片（根據四邊形寬度放大並往下移動）
  if (iconImage) {
    // 計算可用於角色圖片的區域高度（卡片高度減去名條高度）
    const availableHeight = height - nameBarHeight;

    // 計算平行四邊形的最大寬度（考慮傾斜）
    const maxWidth = width + skewOffset; // 平行四邊形的最大寬度

    // 根據四邊形寬度放大圖片，但保持1:1比例
    const imageSize = maxWidth * 0.85; // 使用四邊形的最大寬度
    const imageWidth = imageSize;
    const imageHeight = imageSize;

    // 計算圖片位置，水平置中並往下移動一些
    const imageX = x + (maxWidth - imageSize) / 2; // 水平置中
    const imageY = y + (availableHeight - imageSize) / 2; // 在可用區域內垂直置中並往下移動10像素

    // 繪製角色圖片，超出平行四邊形的部分會被裁切
    ctx.drawImage(iconImage, imageX, imageY, imageWidth, imageHeight);
  } else {
    // 如果圖片載入失敗，繪製佔位符
    const availableHeight = height - nameBarHeight;
    const placeholderSize = Math.min(width, availableHeight) * 0.6;
    const placeholderX = x + (width - placeholderSize) / 2 + skewOffset * 0.3;
    const placeholderY = y + (availableHeight - placeholderSize) / 2; // 往下移動10像素

    ctx.fillStyle = '#E0E0E0';
    ctx.fillRect(placeholderX, placeholderY, placeholderSize, placeholderSize);

    ctx.fillStyle = '#999999';
    ctx.font = '14px Nexon, "SourceHanSansTC", "SourceHanSans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('?', placeholderX + placeholderSize / 2, placeholderY + placeholderSize / 2);
  }

  // 恢復畫布狀態
  ctx.restore();

  // 繪製黑色名條背景（形狀與平行四邊形吻合，高度較低，底部圓角）
  ctx.save();
  // 使用與卡片相同的平行四邊形形狀，底部使用圓角
  const nameBarSkewOffset = Math.tan((skewAngle * Math.PI) / 180) * nameBarHeight;
  const nameBarPoints = [
    { x: x + nameBarSkewOffset, y: nameBarY }, // 左上
    { x: x + width + nameBarSkewOffset, y: nameBarY }, // 右上
    { x: x + width, y: nameBarY + nameBarHeight }, // 右下
    { x: x, y: nameBarY + nameBarHeight }, // 左下
  ];

  // 繪製圓角平行四邊形名條背景
  ctx.beginPath();
  ctx.moveTo(nameBarPoints[0].x, nameBarPoints[0].y);
  ctx.lineTo(nameBarPoints[1].x, nameBarPoints[1].y);
  ctx.lineTo(nameBarPoints[2].x, nameBarPoints[2].y - cardRadius);
  ctx.quadraticCurveTo(nameBarPoints[2].x, nameBarPoints[2].y, nameBarPoints[2].x - cardRadius, nameBarPoints[2].y);
  ctx.lineTo(nameBarPoints[3].x + cardRadius, nameBarPoints[3].y);
  ctx.quadraticCurveTo(nameBarPoints[3].x, nameBarPoints[3].y, nameBarPoints[3].x, nameBarPoints[3].y - cardRadius);
  ctx.lineTo(nameBarPoints[0].x, nameBarPoints[0].y);
  ctx.closePath();
  ctx.fillStyle = 'rgb(102,115,134)'; // 黑色背景
  ctx.fill();
  ctx.restore();

  // 繪製角色卡片邊框（與卡片相同形狀，有圓角）
  ctx.save();
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 2;

  // 使用與卡片相同的平行四邊形形狀和圓角
  const borderSkewOffset = Math.tan((skewAngle * Math.PI) / 180) * height;
  const borderPoints = [
    { x: x + borderSkewOffset, y: y }, // 左上
    { x: x + width + borderSkewOffset, y: y }, // 右上
    { x: x + width, y: y + height }, // 右下
    { x: x, y: y + height }, // 左下
  ];

  // 繪製圓角平行四邊形邊框
  ctx.beginPath();
  ctx.moveTo(borderPoints[0].x + cardRadius, borderPoints[0].y);
  ctx.lineTo(borderPoints[1].x - cardRadius, borderPoints[1].y);
  ctx.quadraticCurveTo(borderPoints[1].x, borderPoints[1].y, borderPoints[1].x, borderPoints[1].y + cardRadius);
  ctx.lineTo(borderPoints[2].x, borderPoints[2].y - cardRadius);
  ctx.quadraticCurveTo(borderPoints[2].x, borderPoints[2].y, borderPoints[2].x - cardRadius, borderPoints[2].y);
  ctx.lineTo(borderPoints[3].x + cardRadius, borderPoints[3].y);
  ctx.quadraticCurveTo(borderPoints[3].x, borderPoints[3].y, borderPoints[3].x, borderPoints[3].y - cardRadius);
  ctx.lineTo(borderPoints[0].x, borderPoints[0].y + cardRadius);
  ctx.quadraticCurveTo(borderPoints[0].x, borderPoints[0].y, borderPoints[0].x + cardRadius, borderPoints[0].y);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();

  // 繪製角色圖片區域邊框（裁切到星級背景頂部）
  ctx.save();
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 2;

  // 計算裁切後的卡片高度（到星級背景頂部）
  const cardHeightToNameBar = height - nameBarHeight;
  const cardHeightToNameBarSkewOffset = Math.tan((skewAngle * Math.PI) / 180) * cardHeightToNameBar;
  const borderOffset = 7; // 邊框往右偏移5像素
  const cardPointsToNameBar = [
    { x: x + cardHeightToNameBarSkewOffset + borderOffset, y: y }, // 左上
    { x: x + width + cardHeightToNameBarSkewOffset + borderOffset, y: y }, // 右上
    { x: x + width + borderOffset, y: y + cardHeightToNameBar }, // 右下
    { x: x + borderOffset, y: y + cardHeightToNameBar }, // 左下
  ];

  // 繪製圓角平行四邊形邊框（裁切到星級背景頂部）
  ctx.beginPath();
  ctx.moveTo(cardPointsToNameBar[0].x + cardRadius, cardPointsToNameBar[0].y);
  ctx.lineTo(cardPointsToNameBar[1].x - cardRadius, cardPointsToNameBar[1].y);
  ctx.quadraticCurveTo(cardPointsToNameBar[1].x, cardPointsToNameBar[1].y, cardPointsToNameBar[1].x, cardPointsToNameBar[1].y + cardRadius);
  ctx.lineTo(cardPointsToNameBar[2].x, cardPointsToNameBar[2].y - cardRadius);
  ctx.quadraticCurveTo(cardPointsToNameBar[2].x, cardPointsToNameBar[2].y, cardPointsToNameBar[2].x - cardRadius, cardPointsToNameBar[2].y);
  ctx.lineTo(cardPointsToNameBar[3].x + cardRadius, cardPointsToNameBar[3].y);
  ctx.quadraticCurveTo(cardPointsToNameBar[3].x, cardPointsToNameBar[3].y, cardPointsToNameBar[3].x, cardPointsToNameBar[3].y - cardRadius);
  ctx.lineTo(cardPointsToNameBar[0].x, cardPointsToNameBar[0].y + cardRadius);
  ctx.quadraticCurveTo(cardPointsToNameBar[0].x, cardPointsToNameBar[0].y, cardPointsToNameBar[0].x + cardRadius, cardPointsToNameBar[0].y);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();

  // 在黑色名條上繪製星級
  const starSize = 20; // 調整星級大小
  const starSpacing = 4;
  const totalStarWidth = student.StarGrade * starSize + (student.StarGrade - 1) * starSpacing;
  const starStartX = x + (width - totalStarWidth) / 2; // 基於卡片寬度
  const starY = nameBarY + (nameBarHeight - starSize) / 2; // 在名條內置中

  for (let i = 0; i < student.StarGrade; i++) {
    const starX = starStartX + i * (starSize + starSpacing);

    if (starImage) {
      // 使用星級圖片
      ctx.drawImage(starImage, starX, starY, starSize, starSize);
    } else {
      // 如果星級圖片載入失敗，使用繪製的星星作為備用
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.moveTo(starX + starSize / 2, starY);
      ctx.lineTo(starX + starSize * 0.4, starY + starSize * 0.3);
      ctx.lineTo(starX, starY + starSize * 0.4);
      ctx.lineTo(starX + starSize * 0.3, starY + starSize * 0.6);
      ctx.lineTo(starX + starSize * 0.2, starY + starSize);
      ctx.lineTo(starX + starSize / 2, starY + starSize * 0.8);
      ctx.lineTo(starX + starSize * 0.8, starY + starSize);
      ctx.lineTo(starX + starSize * 0.7, starY + starSize * 0.6);
      ctx.lineTo(starX + starSize, starY + starSize * 0.4);
      ctx.lineTo(starX + starSize * 0.6, starY + starSize * 0.3);
      ctx.closePath();
      ctx.fill();
    }
  }

  // 檢查是否為新角色並繪製"新"標籤
  // 如果角色ID在本次新獲得角色列表中且是本次抽卡中第一次出現，顯示"新"標籤
  const studentId = student.Id.toString();
  const isNewCharacter = newCharactersInThisPull && newCharactersInThisPull.has(studentId);
  const isFirstAppearance = firstAppearanceInThisPull && firstAppearanceInThisPull.has(studentId) && currentIndex !== undefined && firstAppearanceInThisPull.get(studentId) === currentIndex;

  // 只有當角色是新角色且是本次抽卡中第一次出現時才顯示"新"標籤
  if (isNewCharacter && isFirstAppearance) {
    // 載入New.png圖片
    const newImage = await loadImageWithCache(join(process.cwd(), 'public', 'ui', 'New.png'), 'new');

    if (newImage) {
      // 設定圖片大小和位置
      const newLabelWidth = 55;
      const newLabelHeight = 23;
      const newLabelX = x + 5; // 左上角偏移
      const newLabelY = y + 5;

      // 繪製New.png圖片
      ctx.drawImage(newImage, newLabelX, newLabelY, newLabelWidth, newLabelHeight);
    }
  }
}
