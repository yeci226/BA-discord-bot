import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, AttachmentBuilder } from 'discord.js';
import { drawInQueueReply } from '@/utilities/index.js';
import { getStudentsData, smartTranslate } from '@/utilities/ba/index.js';
import { getVideoPaths } from '@/utilities/ba/video.js';
import Queue from 'queue';
import { createCanvas, loadImage, GlobalFonts } from '@napi-rs/canvas';
import { join } from 'path';
GlobalFonts.registerFromPath(join(process.cwd(), 'src', 'font', 'NunitoSans-Regular.ttf'), 'NunitoSansRegular');
GlobalFonts.registerFromPath(join(process.cwd(), 'src', 'font', 'SourceHanSansTC-Regular.otf'), 'SourceHanSansTC');
GlobalFonts.registerFromPath(join(process.cwd(), 'src', 'font', 'SourceHanSans-Regular.otf'), 'SourceHanSans');

const drawQueue = new Queue({ autostart: true });

// 抽卡机率类
class GachaSimulator {
  private database: any[];
  private targetStudent: any;

  constructor(studentsData: any, targetStudentId: string) {
    // 尝试通过ID查找，如果失败则尝试通过名称查找
    this.targetStudent = studentsData[targetStudentId];
    if (!this.targetStudent) {
      // 通过名称查找
      const studentByName = Object.values(studentsData).find((s: any) => 
        s.Name === targetStudentId || s.PathName === targetStudentId
      );
      if (studentByName) {
        this.targetStudent = studentByName;
      } else {
        throw new Error(`Student with ID or name ${targetStudentId} not found`);
      }
    }

    // 验证目标角色必须是3星角色
    if (this.targetStudent.StarGrade !== 3) {
      throw new Error(`Target student must be a 3-star character, but ${this.targetStudent.Name} is ${this.targetStudent.StarGrade}-star`);
    }

    // 根据目标角色的IsLimited值过滤可抽取的角色
    const targetIsLimited = this.targetStudent.IsLimited || 0;
    let availableStudents = Object.values(studentsData);

    // 排除IsLimited为3的活动角色
    availableStudents = availableStudents.filter((s: any) => s.IsLimited !== 3);

    // 根据目标角色的IsLimited值进一步过滤
    if (targetIsLimited === 0) {
      // 目标角色是常驻角色，不会出现IsLimited为1和2的角色
      availableStudents = availableStudents.filter((s: any) => s.IsLimited === 0);
    } else if (targetIsLimited === 1) {
      // 目标角色是IsLimited为1的角色，不会出现IsLimited为2的角色，但会出现IsLimited为0的角色
      availableStudents = availableStudents.filter((s: any) => s.IsLimited === 0 || s.IsLimited === 1);
    } else if (targetIsLimited === 2) {
      // 目标角色是IsLimited为2的角色，会出现IsLimited为0和1的角色
      availableStudents = availableStudents.filter((s: any) => s.IsLimited === 0 || s.IsLimited === 1 || s.IsLimited === 2);
    }

    // 构建抽卡数据库
    this.database = availableStudents.map((student: any) => {
      let prob = 0;
      let lastProb = 0;

      if (student.StarGrade === 3) {
        if (student.Id === this.targetStudent.Id) {
          prob = 0.007; // UP角色占3星总概率的0.7%
          lastProb = 0.007;
        } else {
          const otherThreeStarCount = availableStudents.filter((s: any) => s.StarGrade === 3 && s.Id !== this.targetStudent.Id).length;
          prob = 0.023 / otherThreeStarCount;
          lastProb = 0.023 / otherThreeStarCount;
        }
      } else if (student.StarGrade === 2) {
        const twoStarCount = availableStudents.filter((s: any) => s.StarGrade === 2).length;
        prob = 0.155 / twoStarCount;
        lastProb = 0.94 / twoStarCount;
      } else if (student.StarGrade === 1) {
        const oneStarCount = availableStudents.filter((s: any) => s.StarGrade === 1).length;
        prob = 0.785 / oneStarCount;
        lastProb = 0;
      }

      return {
        ...student,
        Prob: prob,
        LastProb: lastProb
      };
    });
  }

  // Fisher-Yates 洗牌算法
  private fisherYatesShuffle(arr: any[]) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  // 随机获取一个学生
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
            Icon: item.Icon,
            IsLimited: item.IsLimited
          };
          break;
        }
      }
    }
    return result;
  }

  // 确定三星
  private getSureStudent() {
    const dataTemp = JSON.parse(JSON.stringify(this.database));
    this.fisherYatesShuffle(dataTemp);
    const threeStarStudents = dataTemp.filter((s: any) => s.StarGrade === 3);
    const index = Math.floor(Math.random() * threeStarStudents.length);
    const item = threeStarStudents[index];
    return {
      Id: item.Id,
      Name: item.Name,
      StarGrade: item.StarGrade,
      Icon: item.Icon,
      IsLimited: item.IsLimited
    };
  }

  // 执行10抽
  public pull10() {
    const results = [];
    let hasThreeStar = false;
    let hasTargetStudent = false;

    for (let i = 0; i < 10; i++) {
      const student = this.getRandomStudent();
      results.push(student);
      
      if (student.StarGrade === 3) {
        hasThreeStar = true;
      }
      if (student.Id === this.targetStudent.Id) {
        hasTargetStudent = true;
      }
    }

    // 蓝变紫概率 (5%)
    if (hasThreeStar && Math.random() < 0.05) {
      // 这里可以添加特殊效果，暂时跳过
    }

    return {
      results,
      hasThreeStar,
      hasTargetStudent,
      targetStudent: this.targetStudent
    };
  }
}

export default {
  data: new SlashCommandBuilder()
    .setName('pull')
    .setDescription('Pull 10 students with specified target')
    .setNameLocalizations({
      'zh-TW': '抽卡',
    })
    .setDescriptionLocalizations({
      'zh-TW': '指定角色进行10抽',
    })
    .addStringOption((option) =>
      option
        .setName('target')
        .setDescription('Target student name or ID')
        .setNameLocalizations({
          'zh-TW': '目標角色',
        })
        .setDescriptionLocalizations({
          'zh-TW': '目標角色名稱或ID',
        })
        .setAutocomplete(true)
        .setRequired(true),
    ),
  /**
   * @description 指定角色10抽
   * @param interaction - 交互實例
   * @param _args - 參數
   */
  async execute(interaction: ChatInputCommandInteraction, ..._args: string[]) {
    const targetStudentId = interaction.options.getString('target');

    if (!targetStudentId) {
      return interaction.reply({
        embeds: [new EmbedBuilder().setColor('#E76161').setTitle('請提供目標角色名稱或ID，老師！').setThumbnail('https://cdnimg-v2.gamekee.com/wiki2.0/images/w_240/h_240/215/43637/2025/3/1/543385.gif')],
      });
    }

    await interaction.deferReply();

    const drawTask = async () => {
      try {
        const studentsData = await getStudentsData();
        
        // 验证目标角色是否存在
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

        // 创建抽卡模拟器
        const gachaSimulator = new GachaSimulator(studentsData, targetStudentId);
        const pullResult = gachaSimulator.pull10();

        // 获取视频路径
        const videoPaths = getVideoPaths();
        
        // 根据是否抽到三星选择动画
        const hasThreeStar = pullResult.hasThreeStar;
        const animationType = hasThreeStar ? 'special' : 'normal';
        const videoUrl = videoPaths[animationType as keyof typeof videoPaths];

        // 播放抽卡动画，显示目标角色头像
        const animationEmbed = new EmbedBuilder()
          .setColor(hasThreeStar ? '#FFD700' : '#4169E1')
          .setTitle('🎬 抽卡動畫')
          .setDescription(hasThreeStar ? '正在抽取三星角色...' : '正在抽取角色...')
          .addFields([
            { name: '動畫類型', value: animationType, inline: true },
            { name: '播放時間', value: '8秒', inline: true },
            { name: '狀態', value: '播放中...', inline: true },
            { name: '目標角色', value: pullResult.targetStudent.Name, inline: true }
          ])
          .setImage(videoUrl);

        await interaction.editReply({
          embeds: [animationEmbed],
        });

        // 同时开始绘制图片和等待动画，确保图片绘制完成后再显示结果
        const [imageBuffer] = await Promise.all([
          drawPullResultImage(pullResult),
          new Promise(resolve => setTimeout(resolve, 8000)) // 等待时间改为8秒
        ]);
        
        // 确保图片绘制完成后再继续
        if (!imageBuffer) {
          return interaction.editReply({
            embeds: [
              new EmbedBuilder()
                .setColor('#E76161')
                .setTitle('繪製圖片時發生錯誤，老師！')
                .setThumbnail('https://cdnimg-v2.gamekee.com/wiki2.0/images/w_240/h_240/215/43637/2025/3/1/543385.gif'),
            ],
          });
        }
        if (!imageBuffer) {
          return interaction.editReply({
            embeds: [
              new EmbedBuilder()
                .setColor('#E76161')
                .setTitle('繪製圖片時發生錯誤，老師！')
                .setThumbnail('https://cdnimg-v2.gamekee.com/wiki2.0/images/w_240/h_240/215/43637/2025/3/1/543385.gif'),
            ],
          });
        }

        const attachment = new AttachmentBuilder(imageBuffer, { name: 'pullresult.png' });
        
        // 构建结果描述
        const targetStudentName = await smartTranslate(pullResult.targetStudent.Name);
        const hasTarget = pullResult.hasTargetStudent ? '✅' : '❌';
        const hasThreeStarText = hasThreeStar ? '✅' : '❌';
        
        const description = `**目標角色:** ${targetStudentName} ${hasTarget}\n**獲得三星:** ${hasThreeStarText}\n**抽卡次數:** 10次`;

        // 最终阶段：显示抽卡结果
        const resultEmbed = new EmbedBuilder()
          .setColor(hasThreeStar ? '#FFD700' : '#4169E1')
          .setTitle(hasThreeStar ? '🎉 恭喜抽到三星！' : '📋 抽卡結果')
          .setDescription(description)
          .setImage('attachment://pullresult.png');

        interaction.editReply({
          embeds: [resultEmbed],
          files: [attachment],
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

async function drawPullResultImage(pullResult: any) {
  try {
    const canvas = createCanvas(1200, 800);
    const ctx = canvas.getContext('2d');

    // 绘制渐变背景（类似游戏界面）
    const gradient = ctx.createLinearGradient(0, 0, 0, 800);
    gradient.addColorStop(0, '#87CEEB'); // 浅蓝色
    gradient.addColorStop(1, '#FFFFFF'); // 白色
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 800);

    // 绘制标题
    ctx.fillStyle = '#2C3E50';
    ctx.font = 'bold 36px SourceHanSansTC';
    ctx.textAlign = 'center';
    ctx.fillText('抽卡結果', 600, 60);

    // 绘制抽卡结果网格 (5x2)
    const cardWidth = 180;
    const cardHeight = 240;
    const startX = 120;
    const startY = 100;
    const spacingX = 200;
    const spacingY = 260;

    for (let i = 0; i < 10; i++) {
      const row = Math.floor(i / 5);
      const col = i % 5;
      const x = startX + col * spacingX;
      const y = startY + row * spacingY;

      await drawStudentCard(ctx, pullResult.results[i], x, y, cardWidth, cardHeight, pullResult.targetStudent.Id);
    }

    return canvas.toBuffer('image/png');
  } catch (error) {
    console.error('Error drawing pull result image:', error);
    return null;
  }
}

async function drawStudentCard(ctx: any, student: any, x: number, y: number, width: number, height: number, targetStudentId: number) {
  // 绘制卡片背景（圆角矩形）
  const cardRadius = 10;
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, cardRadius);
  ctx.fill();
  
  // 添加卡片阴影
  ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
  ctx.shadowBlur = 5;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.fill();
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  // 根据星级添加边框颜色
  const borderColors: Record<number, string> = {
    1: '#8B4513', // 棕色
    2: '#4169E1', // 蓝色
    3: '#FFD700'  // 金色
  };
  
  const borderColor = borderColors[student.StarGrade] || '#666666';
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, cardRadius);
  ctx.stroke();

  // 绘制角色图标
  let iconName = student.Icon;

  try {
    // 处理图标名称，移除enemyinfo_前缀
    if (iconName && iconName.startsWith('enemyinfo_')) {
      iconName = iconName.replace('enemyinfo_', '');
    }
    
    // 如果Icon为null或undefined，使用学生ID
    if (!iconName) {
      iconName = student.Id;
    }
    
    const iconUrl = `https://schale.gg/images/student/collection/${iconName}.webp`;
    const iconImage = await loadImage(iconUrl);
    const iconSize = 100;
    const iconX = x + (width - iconSize) / 2;
    const iconY = y + 15;
    ctx.drawImage(iconImage, iconX, iconY, iconSize, iconSize);
  } catch (error) {
    console.log(`图标加载失败: ${student.Name} (Icon: ${student.Icon}, 处理后: ${iconName})`);
    
    // 尝试使用学生ID作为备用方案
    try {
      const fallbackUrl = `https://schale.gg/images/student/collection/${student.Id}.webp`;
      const fallbackImage = await loadImage(fallbackUrl);
      const iconSize = 100;
      const iconX = x + (width - iconSize) / 2;
      const iconY = y + 15;
      ctx.drawImage(fallbackImage, iconX, iconY, iconSize, iconSize);
    } catch (fallbackError) {
      console.log(`备用图标也加载失败: ${student.Name} (ID: ${student.Id})`);
      // 如果备用方案也失败，绘制占位符
      ctx.fillStyle = '#E0E0E0';
      ctx.fillRect(x + (width - 60) / 2, y + 15, 60, 60);
      
      // 在占位符上绘制文字
      ctx.fillStyle = '#999999';
      ctx.font = '12px SourceHanSansTC';
      ctx.textAlign = 'center';
      ctx.fillText('?', x + width / 2, y + 45);
    }
  }

  // 绘制角色名称
  ctx.fillStyle = '#2C3E50';
  ctx.font = 'bold 14px SourceHanSansTC';
  ctx.textAlign = 'center';
  ctx.fillText(student.Name, x + width / 2, y + height - 50);

  // 绘制星级
  const starSize = 12;
  const starSpacing = 3;
  const totalStarWidth = student.StarGrade * starSize + (student.StarGrade - 1) * starSpacing;
  const starStartX = x + (width - totalStarWidth) / 2;

  for (let i = 0; i < student.StarGrade; i++) {
    const starX = starStartX + i * (starSize + starSpacing);
    const starY = y + height - 30;
    
    // 绘制星星
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

  // 如果是目标角色，添加特殊标记
  if (student.Id === targetStudentId) {
    ctx.strokeStyle = '#FF0000';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(x - 3, y - 3, width + 6, height + 6, cardRadius + 3);
    ctx.stroke();
  }
} 