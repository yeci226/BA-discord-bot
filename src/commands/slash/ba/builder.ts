import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, AttachmentBuilder, MessageFlags } from 'discord.js';
import { drawInQueueReply } from '@/utilities';
import { getStudentsData, tomorrowResetTime, ARMOR_TYPE_COLORS, BULLET_TYPE_COLORS, smartTranslate } from '@/utilities/ba';
import Queue from 'queue';
import { createCanvas, loadImage, GlobalFonts } from '@napi-rs/canvas';
import { join } from 'path';
import { readdir } from 'fs/promises';
GlobalFonts.registerFromPath(join(process.cwd(), 'public', 'font', 'NEXONFootballGothicBA1.woff2'), 'Nexon');
const drawQueue = new Queue({ autostart: true });

async function getRandomBackground(): Promise<string> {
  try {
    const backgroundDir = join(process.cwd(), 'public', 'background');
    const files = await readdir(backgroundDir);
    const imageFiles = files.filter(
      (file) => file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg') || file.toLowerCase().endsWith('.png') || file.toLowerCase().endsWith('.webp'),
    );

    if (imageFiles.length === 0) {
      throw new Error('No image files found in background directory');
    }

    const randomIndex = Math.floor(Math.random() * imageFiles.length);
    return imageFiles[randomIndex];
  } catch (error) {
    console.error('Error reading background directory:', error);
    return 'BG_ConventionHall3_Sunset.jpg';
  }
}

export default {
  data: new SlashCommandBuilder()
    .setName('builder')
    .setDescription('Draw a team image')
    .setNameLocalizations({
      'zh-TW': '隊伍展示圖',
    })
    .setDescriptionLocalizations({
      'zh-TW': '繪製一個隊伍的展示圖片',
    })
    .addStringOption((option) =>
      option
        .setName('main1')
        .setDescription('Main character 1')
        .setNameLocalizations({
          'zh-TW': '主角色1',
        })
        .setDescriptionLocalizations({
          'zh-TW': '主要角色1',
        })
        .setAutocomplete(true)
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName('main2')
        .setDescription('Main character 2')
        .setNameLocalizations({
          'zh-TW': '主角色2',
        })
        .setDescriptionLocalizations({
          'zh-TW': '主要角色2',
        })
        .setAutocomplete(true)
        .setRequired(false),
    )
    .addStringOption((option) =>
      option
        .setName('main3')
        .setDescription('Main character 3')
        .setNameLocalizations({
          'zh-TW': '主角色3',
        })
        .setDescriptionLocalizations({
          'zh-TW': '主要角色3',
        })
        .setAutocomplete(true)
        .setRequired(false),
    )
    .addStringOption((option) =>
      option
        .setName('main4')
        .setDescription('Main character 4')
        .setNameLocalizations({
          'zh-TW': '主角色4',
        })
        .setDescriptionLocalizations({
          'zh-TW': '主要角色4',
        })
        .setAutocomplete(true)
        .setRequired(false),
    )
    .addStringOption((option) =>
      option
        .setName('support1')
        .setDescription('Support character 1')
        .setNameLocalizations({
          'zh-TW': '支援角色1',
        })
        .setDescriptionLocalizations({
          'zh-TW': '支援角色1',
        })
        .setAutocomplete(true)
        .setRequired(false),
    )
    .addStringOption((option) =>
      option
        .setName('support2')
        .setDescription('Support character 2')
        .setNameLocalizations({
          'zh-TW': '支援角色2',
        })
        .setDescriptionLocalizations({
          'zh-TW': '支援角色2',
        })
        .setAutocomplete(true)
        .setRequired(false),
    )
    .addStringOption((option) =>
      option
        .setName('team_name')
        .setDescription('Team name')
        .setNameLocalizations({
          'zh-TW': '隊伍名稱',
        })
        .setDescriptionLocalizations({
          'zh-TW': '隊伍名稱',
        })
        .setRequired(false),
    )
    .addStringOption((option) =>
      option
        .setName('note')
        .setDescription('Team note')
        .setNameLocalizations({
          'zh-TW': '備註',
        })
        .setDescriptionLocalizations({
          'zh-TW': '隊伍備註',
        })
        .setRequired(false),
    )
    .addBooleanOption((option) =>
      option
        .setName('enable_background')
        .setDescription('Enable background image (default: true)')
        .setNameLocalizations({
          'zh-TW': '啟用背景',
        })
        .setDescriptionLocalizations({
          'zh-TW': '是否啟用背景圖片 (預設啟用)',
        })
        .setRequired(false),
    ),

  /**
   * @description 調頻
   * @param interaction - 交互實例
   * @param _args - 參數
   */
  async execute(interaction: ChatInputCommandInteraction, ..._args: string[]) {
    const server = interaction.options.getString('server') || 'Global';
    const main1 = interaction.options.getString('main1');
    const main2 = interaction.options.getString('main2');
    const main3 = interaction.options.getString('main3');
    const main4 = interaction.options.getString('main4');
    const support1 = interaction.options.getString('support1');
    const support2 = interaction.options.getString('support2');
    const teamName = interaction.options.getString('team_name');
    const note = interaction.options.getString('note');
    const enableBackground = interaction.options.getBoolean('enable_background') ?? true;

    const selectedCharacters: Array<{ id: string; type: 'Main' | 'Support'; position: number }> = [];

    const mainCharacters: Array<{ id: string; originalPosition: number }> = [];
    const supportCharacters: Array<{ id: string; originalPosition: number }> = [];

    if (main1) mainCharacters.push({ id: main1, originalPosition: 1 });
    if (main2) mainCharacters.push({ id: main2, originalPosition: 2 });
    if (main3) mainCharacters.push({ id: main3, originalPosition: 3 });
    if (main4) mainCharacters.push({ id: main4, originalPosition: 4 });
    if (support1) supportCharacters.push({ id: support1, originalPosition: 5 });
    if (support2) supportCharacters.push({ id: support2, originalPosition: 6 });

    mainCharacters.forEach((char, index) => {
      selectedCharacters.push({
        id: char.id,
        type: 'Main',
        position: index + 1,
      });
    });

    supportCharacters.forEach((char, index) => {
      selectedCharacters.push({
        id: char.id,
        type: 'Support',
        position: index + 5,
      });
    });

    // 驗證所有選擇的學生是否存在
    const studentsData = await getStudentsData();
    const invalidStudents = selectedCharacters.filter((char) => !studentsData[char.id]);

    if (invalidStudents.length > 0) {
      const invalidIds = invalidStudents.map((char) => char.id).join(', ');
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#E76161')
            .setTitle('找不到指定的學生，請老師確認後再試！')
            .setDescription(`以下學生ID不存在：\`${invalidIds}\``)
            .setThumbnail('https://cdnimg-v2.gamekee.com/wiki2.0/images/w_240/h_240/215/43637/2025/3/1/543385.gif'),
        ],
        flags: MessageFlags.Ephemeral,
      });
    }

    await interaction.deferReply();

    const drawTask = async () => {
      try {
        const imageBuffer = await drawTeamBuildImage(selectedCharacters, teamName || undefined, note || undefined, enableBackground);
        if (!imageBuffer) {
          return interaction.editReply({
            embeds: [
              new EmbedBuilder().setColor('#E76161').setTitle('繪製圖片時發生錯誤，老師！').setThumbnail('https://cdnimg-v2.gamekee.com/wiki2.0/images/w_240/h_240/215/43637/2025/3/1/543385.gif'),
            ],
          });
        }

        const attachment = new AttachmentBuilder(imageBuffer, { name: 'team_builder.png' });
        interaction.editReply({
          content: tomorrowResetTime(),
          embeds: [],
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
      drawInQueueReply(interaction, `正在繪製隊伍 ${drawQueue.length - 1} 號，老師請稍等~`);
    }
  },
};

async function drawTeamBuildImage(selectedCharacters: any[] = [], teamName?: string, note?: string, enableBackground: boolean = true) {
  try {
    const canvas = createCanvas(1400, 400);
    const ctx = canvas.getContext('2d');

    const studentsData = await getStudentsData();

    if (enableBackground) {
      const backgroundImage = await loadImage(`./public/background/${await getRandomBackground()}`);
      const canvasWidth = 1400;
      const canvasHeight = 400;
      const bgAspectRatio = backgroundImage.width / backgroundImage.height;
      const canvasAspectRatio = canvasWidth / canvasHeight;

      let drawWidth, drawHeight, drawX, drawY;

      if (bgAspectRatio > canvasAspectRatio) {
        drawHeight = canvasHeight;
        drawWidth = canvasHeight * bgAspectRatio;
        drawX = (canvasWidth - drawWidth) / 2;
        drawY = 0;
      } else {
        drawWidth = canvasWidth;
        drawHeight = canvasWidth / bgAspectRatio;
        drawX = 0;
        drawY = (canvasHeight - drawHeight) / 2;
      }

      ctx.filter = 'blur(2px)';
      ctx.drawImage(backgroundImage, drawX, drawY, drawWidth, drawHeight);
      ctx.filter = 'none';
    } else {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 1400, 400);
    }
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    ctx.font = '900 52px "Nunito Sans", "Noto Sans TC", "Noto Sans JP", sans-serif';
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.lineWidth = 3;
    ctx.textAlign = 'center';

    const titleY = note ? 70 : 90;
    ctx.strokeText(teamName || '未命名隊伍', 700, titleY);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(teamName || '未命名隊伍', 700, titleY);

    const slotSize = 180;
    const slotSpacing = 25;
    const groupSpacing = 50;
    const totalSlots = 6;
    const totalWidth = slotSize * 4 + slotSpacing * 3 + groupSpacing + slotSize * 2 + slotSpacing;
    const startX = (1400 - totalWidth) / 2;
    const slotY = 160;

    const skewAngle = 10;
    const skewOffset = (slotSize * Math.tan((skewAngle * Math.PI) / 180)) / 2;

    const firstCardLeft = startX + skewOffset;
    const fourthCardRight = startX + slotSize * 4 + slotSpacing * 3 + skewOffset;

    ctx.fillStyle = 'rgba(204, 26, 37, 1)';
    ctx.beginPath();

    const redBarTopLeft = { x: firstCardLeft, y: slotY - 25 };
    const redBarTopRight = { x: fourthCardRight, y: slotY - 25 };
    const redBarBottomRight = { x: fourthCardRight, y: slotY - 17 };
    const redBarBottomLeft = { x: firstCardLeft, y: slotY - 17 };

    const barCornerRadius = 4;
    ctx.moveTo(redBarTopLeft.x + barCornerRadius, redBarTopLeft.y);
    ctx.lineTo(redBarTopRight.x - barCornerRadius, redBarTopRight.y);
    ctx.quadraticCurveTo(redBarTopRight.x - barCornerRadius, redBarTopRight.y, redBarTopRight.x, redBarTopRight.y + barCornerRadius);
    ctx.lineTo(redBarBottomRight.x, redBarBottomRight.y - barCornerRadius);
    ctx.quadraticCurveTo(redBarBottomRight.x, redBarBottomRight.y - barCornerRadius, redBarBottomRight.x - barCornerRadius, redBarBottomRight.y);
    ctx.lineTo(redBarBottomLeft.x + barCornerRadius, redBarBottomLeft.y);
    ctx.quadraticCurveTo(redBarBottomLeft.x + barCornerRadius, redBarBottomLeft.y, redBarBottomLeft.x, redBarBottomLeft.y - barCornerRadius);
    ctx.lineTo(redBarTopLeft.x, redBarTopLeft.y + barCornerRadius);
    ctx.quadraticCurveTo(redBarTopLeft.x, redBarTopLeft.y + barCornerRadius, redBarTopLeft.x + barCornerRadius, redBarTopLeft.y);
    ctx.closePath();
    ctx.fill();

    const fifthCardLeft = startX + slotSize * 4 + slotSpacing * 3 + groupSpacing + skewOffset;
    const sixthCardRight = startX + slotSize * 4 + slotSpacing * 3 + groupSpacing + slotSize * 2 + slotSpacing + skewOffset;

    ctx.fillStyle = 'rgba(0, 107, 255, 1)';
    ctx.beginPath();

    const blueBarTopLeft = { x: fifthCardLeft, y: slotY - 25 };
    const blueBarTopRight = { x: sixthCardRight, y: slotY - 25 };
    const blueBarBottomRight = { x: sixthCardRight, y: slotY - 17 };
    const blueBarBottomLeft = { x: fifthCardLeft, y: slotY - 17 };
    ctx.moveTo(blueBarTopLeft.x + barCornerRadius, blueBarTopLeft.y);
    ctx.lineTo(blueBarTopRight.x - barCornerRadius, blueBarTopRight.y);
    ctx.quadraticCurveTo(blueBarTopRight.x - barCornerRadius, blueBarTopRight.y, blueBarTopRight.x, blueBarTopRight.y + barCornerRadius);
    ctx.lineTo(blueBarBottomRight.x, blueBarBottomRight.y - barCornerRadius);
    ctx.quadraticCurveTo(blueBarBottomRight.x, blueBarBottomRight.y - barCornerRadius, blueBarBottomRight.x - barCornerRadius, blueBarBottomRight.y);
    ctx.lineTo(blueBarBottomLeft.x + barCornerRadius, blueBarBottomLeft.y);
    ctx.quadraticCurveTo(blueBarBottomLeft.x + barCornerRadius, blueBarBottomLeft.y, blueBarBottomLeft.x, blueBarBottomLeft.y - barCornerRadius);
    ctx.lineTo(blueBarTopLeft.x, blueBarTopLeft.y + barCornerRadius);
    ctx.quadraticCurveTo(blueBarTopLeft.x, blueBarTopLeft.y + barCornerRadius, blueBarTopLeft.x + barCornerRadius, blueBarTopLeft.y);
    ctx.closePath();
    ctx.fill();

    for (let i = 0; i < totalSlots; i++) {
      let slotX;
      if (i < 4) {
        slotX = startX + i * (slotSize + slotSpacing);
      } else {
        slotX = startX + slotSize * 4 + slotSpacing * 3 + groupSpacing + (i - 4) * (slotSize + slotSpacing);
      }
      const slotGradient = ctx.createLinearGradient(slotX, slotY, slotX, slotY + slotSize);
      slotGradient.addColorStop(0, '#4a4a4a');
      slotGradient.addColorStop(1, '#3a3a3a');
      ctx.fillStyle = slotGradient;

      const skewAngle = 10;
      const skewOffset = (slotSize * Math.tan((skewAngle * Math.PI) / 180)) / 2;
      const cornerRadius = 12;

      ctx.beginPath();

      const topLeft = { x: slotX + skewOffset, y: slotY };
      const topRight = { x: slotX + slotSize + skewOffset, y: slotY };
      const bottomRight = { x: slotX + slotSize - skewOffset, y: slotY + slotSize };
      const bottomLeft = { x: slotX - skewOffset, y: slotY + slotSize };

      ctx.moveTo(topLeft.x + cornerRadius, topLeft.y);
      ctx.lineTo(topRight.x - cornerRadius, topRight.y);
      ctx.quadraticCurveTo(topRight.x - cornerRadius, topRight.y, topRight.x, topRight.y + cornerRadius);

      ctx.lineTo(bottomRight.x, bottomRight.y - cornerRadius);
      ctx.quadraticCurveTo(bottomRight.x, bottomRight.y - cornerRadius, bottomRight.x - cornerRadius, bottomRight.y);

      ctx.lineTo(bottomLeft.x + cornerRadius, bottomLeft.y);
      ctx.quadraticCurveTo(bottomLeft.x + cornerRadius, bottomLeft.y, bottomLeft.x, bottomLeft.y - cornerRadius);

      ctx.lineTo(topLeft.x, topLeft.y + cornerRadius);
      ctx.quadraticCurveTo(topLeft.x, topLeft.y + cornerRadius, topLeft.x + cornerRadius, topLeft.y);

      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = '#444444';
      ctx.lineWidth = 2;
      ctx.stroke();

      const character = selectedCharacters.find((char) => char.position === i + 1);
      if (character) {
        const student = studentsData[character.id];
        if (student) {
          try {
            const characterImage = await loadImage(`https://schaledb.com/images/student/collection/${character.id}.webp`);

            ctx.save();
            const skewAngle = 10;
            const skewOffset = (slotSize * Math.tan((skewAngle * Math.PI) / 180)) / 2;
            const cornerRadius = 12;

            const imgTopLeft = { x: slotX + skewOffset, y: slotY };
            const imgTopRight = { x: slotX + slotSize + skewOffset, y: slotY };
            const imgBottomRight = { x: slotX + slotSize - skewOffset, y: slotY + slotSize };
            const imgBottomLeft = { x: slotX - skewOffset, y: slotY + slotSize };

            ctx.beginPath();

            ctx.moveTo(imgTopLeft.x + cornerRadius, imgTopLeft.y);
            ctx.lineTo(imgTopRight.x - cornerRadius, imgTopRight.y);
            ctx.quadraticCurveTo(imgTopRight.x - cornerRadius, imgTopRight.y, imgTopRight.x, imgTopRight.y + cornerRadius);

            ctx.lineTo(imgBottomRight.x, imgBottomRight.y - cornerRadius);
            ctx.quadraticCurveTo(imgBottomRight.x, imgBottomRight.y - cornerRadius, imgBottomRight.x - cornerRadius, imgBottomRight.y);

            ctx.lineTo(imgBottomLeft.x + cornerRadius, imgBottomLeft.y);
            ctx.quadraticCurveTo(imgBottomLeft.x + cornerRadius, imgBottomLeft.y, imgBottomLeft.x, imgBottomLeft.y - cornerRadius);

            ctx.lineTo(imgTopLeft.x, imgTopLeft.y + cornerRadius);
            ctx.quadraticCurveTo(imgTopLeft.x, imgTopLeft.y + cornerRadius, imgTopLeft.x + cornerRadius, imgTopLeft.y);

            ctx.closePath();
            ctx.clip();

            const actualWidth = slotSize + 2 * skewOffset;
            const actualHeight = slotSize;

            const originalRatio = 200 / 226;
            const displayRatio = actualWidth / actualHeight;

            let imageWidth, imageHeight, imageX, imageY;

            if (originalRatio > displayRatio) {
              imageHeight = actualHeight * 1.1;
              imageWidth = imageHeight * originalRatio;
              imageX = slotX + (actualWidth - imageWidth) / 2 - 10;
              imageY = slotY - (imageHeight - actualHeight) / 2;
            } else {
              imageWidth = actualWidth * 1.1;
              imageHeight = imageWidth / originalRatio;
              imageX = slotX - (imageWidth - actualWidth) / 2 - 10;
              imageY = slotY + (actualHeight - imageHeight) / 2;
            }

            ctx.drawImage(characterImage, imageX, imageY, imageWidth, imageHeight);
            ctx.restore();

            const text = student.Name;
            ctx.font = 'bold 22px "Nunito Sans", "Noto Sans TC", "Noto Sans JP", sans-serif';
            ctx.textAlign = 'left';

            const textMetrics = ctx.measureText(text);
            const textWidth = textMetrics.width;

            const bgHeight = 32;
            const bgPadding = 8;
            const bgWidth = textWidth + bgPadding * 2;

            const bgX = slotX + skewOffset + 2.5;
            const bgY = slotY + 10;

            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.lineWidth = 2;

            const radius = bgHeight / 2;
            ctx.beginPath();
            ctx.moveTo(bgX + radius, bgY);
            ctx.lineTo(bgX + bgWidth - radius, bgY);
            ctx.quadraticCurveTo(bgX + bgWidth, bgY, bgX + bgWidth, bgY + radius);
            ctx.lineTo(bgX + bgWidth, bgY + bgHeight - radius);
            ctx.quadraticCurveTo(bgX + bgWidth, bgY + bgHeight, bgX + bgWidth - radius, bgY + bgHeight);
            ctx.lineTo(bgX + radius, bgY + bgHeight);
            ctx.quadraticCurveTo(bgX, bgY + bgHeight, bgX, bgY + bgHeight - radius);
            ctx.lineTo(bgX, bgY + radius);
            ctx.quadraticCurveTo(bgX, bgY, bgX + radius, bgY);
            ctx.closePath();

            ctx.fill();

            ctx.fillStyle = '#ffffff';
            ctx.fillText(text, bgX + bgPadding, bgY + bgHeight / 2 + 8);

            const attrBarHeight = 32;
            const firstAttrBarWidth = 70;
            const firstAttrBarX = bgX + bgWidth;
            const firstAttrBarY = bgY;

            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.lineWidth = 2;

            const circleRadius = 16;
            const circleX = firstAttrBarX + firstAttrBarWidth / 2 - 16;
            const circleY = firstAttrBarY + attrBarHeight / 2;

            ctx.beginPath();
            ctx.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI);
            ctx.fill();

            const iconSize = 30;
            const iconMargin = 4;
            const iconX = firstAttrBarX + iconMargin;
            const iconY = firstAttrBarY + (attrBarHeight - iconSize) / 2;

            const roleImage = await loadImage(`./public/role/Role_${student.TacticRole}.png`);
            ctx.save();
            ctx.beginPath();
            ctx.arc(iconX + iconSize / 2, iconY + iconSize / 2, iconSize / 2, 0, 2 * Math.PI);
            ctx.clip();
            ctx.drawImage(roleImage, iconX, iconY, iconSize, iconSize);
            ctx.restore();

            const attrBarsStartY = slotY + slotSize - attrBarHeight - 5;
            const attrBarWidths = [35, 35];
            const totalBarsWidth = attrBarWidths.reduce((sum, width) => sum + width, 0);
            const totalWidth = totalBarsWidth + 2;
            const attrBarsStartX = slotX - totalWidth + 60;
            const attrLabels = [student.BulletType, student.ArmorType];

            for (let i = 0; i < 2; i++) {
              const currentBarWidth = attrBarWidths[i];
              const barX = attrBarsStartX + i * (currentBarWidth + 5);
              const barY = attrBarsStartY;
              const iconSize = 36;
              const iconMargin = 4;
              const iconX = barX + iconMargin;
              const iconY = barY + (attrBarHeight - iconSize) / 2;

              const colorMap = i === 0 ? BULLET_TYPE_COLORS : ARMOR_TYPE_COLORS;
              const colorKey = i === 0 ? student.BulletType : student.ArmorType;
              const iconColor = colorMap[colorKey] || '#ffffff';

              ctx.fillStyle = iconColor;
              ctx.beginPath();
              ctx.arc(iconX + iconSize / 2, iconY + iconSize / 2, iconSize / 2, 0, 2 * Math.PI);
              ctx.fill();

              const typeImageName = i === 0 ? 'Attack' : 'Defense';
              const typeKey = i === 0 ? student.BulletType : student.ArmorType;

              attrLabels[i] = await smartTranslate(typeKey);

              try {
                const typeImage = await loadImage(`./public/type/Type_${typeImageName}.png`);
                ctx.save();
                ctx.beginPath();
                ctx.arc(iconX + iconSize / 2, iconY + iconSize / 2, iconSize / 2, 0, 2 * Math.PI);
                ctx.clip();
                const smallIconSize = 22;
                const smallIconX = iconX + (iconSize - smallIconSize) / 2;
                const smallIconY = iconY + (iconSize - smallIconSize) / 2;
                ctx.drawImage(typeImage, smallIconX, smallIconY, smallIconSize, smallIconSize);
                ctx.restore();
              } catch (error) {
                console.error(`Failed to load type image for ${typeImageName}:`, error);
              }
            }
          } catch (error) {
            console.error(`Failed to load character image for ${student.Name}:`, error);
          }
        } else {
          // 學生不存在的情況
          ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
          ctx.font = 'bold 20px "Nunito Sans", "Noto Sans TC", "Noto Sans JP", sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('UNKNOWN', slotX + slotSize / 2, slotY + 10 + slotSize / 2);
        }
      } else {
        ctx.fillStyle = 'rgba(204, 204, 204, 0.8)';
        ctx.font = 'italic 32px Nexon';
        ctx.textAlign = 'center';
        ctx.fillText('EMPTY', slotX + slotSize / 2, slotY + 10 + slotSize / 2);
      }
    }

    if (note) {
      const noteText = `備註: ${note}`;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;

      ctx.font = 'bold 22px "Nunito Sans", "Noto Sans TC", "Noto Sans JP", sans-serif';
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.lineWidth = 3;
      ctx.textAlign = 'center';
      ctx.strokeText(noteText, 700, 110);
      ctx.fillStyle = '#ffffff';
      ctx.fillText(noteText, 700, 110);
    }

    return canvas.toBuffer('image/png');
  } catch (error) {
    console.error('[Error] drawTeamBuildImage', error);
    return null;
  }
}
