import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, AttachmentBuilder } from 'discord.js';
import { drawInQueueReply } from '@/utilities/index.js';
import { getCurrentGachaData, tomorrowResetTime } from '@/utilities/ba/index.js';
import Queue from 'queue';
import { createCanvas, loadImage, GlobalFonts } from '@napi-rs/canvas';
import { join } from 'path';
GlobalFonts.registerFromPath(join(process.cwd(), 'src', 'font', 'NunitoSans-Regular.ttf'), 'NunitoSansRegular');
GlobalFonts.registerFromPath(join(process.cwd(), 'src', 'font', 'SourceHanSansTC-Regular.otf'), 'SourceHanSansTC');
GlobalFonts.registerFromPath(join(process.cwd(), 'src', 'font', 'SourceHanSans-Regular.otf'), 'SourceHanSans');

const drawQueue = new Queue({ autostart: true });

export default {
  data: new SlashCommandBuilder()
    .setName('gacha')
    .setDescription('View the current gacha pool')
    .setNameLocalizations({
      'zh-TW': '當前池',
    })
    .setDescriptionLocalizations({
      'zh-TW': '查看當前特選招募池',
    })
    .addStringOption((option) =>
      option
        .setName('server')
        .setDescription('Select server')
        .setNameLocalizations({
          'zh-TW': '伺服器',
        })
        .setDescriptionLocalizations({
          'zh-TW': '選擇伺服器',
        })
        .setRequired(true)
        .addChoices({ name: '日服', value: 'Jp' }, { name: '國際服', value: 'Global' }, { name: '國服', value: 'Cn' }),
    ),
  /**
   * @description 調頻
   * @param interaction - 交互實例
   * @param _args - 參數
   */
  async execute(interaction: ChatInputCommandInteraction, ..._args: string[]) {
    const server = interaction.options.getString('server') || 'Global';
    await interaction.deferReply();

    const drawTask = async () => {
      try {
        // interaction.editReply({
        //   embeds: [new EmbedBuilder().setTitle('正在搜尋資料中，老師請稍等~').setColor(getRandomColor()).setThumbnail('https://media.tenor.com/ChVfzwizTxQAAAAj/arona-kururu.gif')],
        // });

        const gachaData = await getCurrentGachaData(server);
        const imageBuffer = await drawCurrentGachaImage(gachaData);
        if (!imageBuffer) {
          return interaction.editReply({
            embeds: [
              new EmbedBuilder().setColor('#E76161').setTitle('繪製圖片時發生錯誤，老師！').setThumbnail('https://cdnimg-v2.gamekee.com/wiki2.0/images/w_240/h_240/215/43637/2025/3/1/543385.gif'),
            ],
          });
        }

        const attachment = new AttachmentBuilder(imageBuffer, { name: 'currentgacha.png' });
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

async function drawCurrentGachaImage(gachaData: any) {
  try {
    const canvas = createCanvas(1200, 600);
    const ctx = canvas.getContext('2d');

    // 加載並繪製背景圖片
    try {
      const backgroundImage = await loadImage('./public/ui/BG_CS_PR_00.jpg');
      ctx.drawImage(backgroundImage, 0, 0, 1200, 600);
    } catch (error) {
      console.error('Failed to load background image:', error);
      // 如果背景圖片加載失敗，使用透明背景
      ctx.clearRect(0, 0, 1200, 600);
    }

    // 添加標題陰影效果
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    // 繪製主標題（帶邊框）
    ctx.font = '900 52px Nexon, "SourceHanSansTC", "SourceHanSans", sans-serif';
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.lineWidth = 3;
    ctx.textAlign = 'center';
    ctx.strokeText('特選招募', 600, 90);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('特選招募', 600, 90);

    // 繪製伺服器名稱（帶邊框）
    ctx.font = '900 40px Nexon, "SourceHanSansTC", "SourceHanSans", sans-serif';
    ctx.strokeText(gachaData.server, 600, 135);
    ctx.fillStyle = '#f0f0f0';
    ctx.fillText(gachaData.server, 600, 135);

    // 重置陰影效果
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.strokeStyle = 'transparent';
    ctx.lineWidth = 0;

    const cardWidth = 200;
    const cardHeight = 226;
    const cardSpacing = 20;
    const totalCardsWidth = gachaData.characters.length * cardWidth + (gachaData.characters.length - 1) * cardSpacing;
    const startX = (1200 - totalCardsWidth) / 2;
    const cardY = 180; // 將卡片往下移動20px

    if (totalCardsWidth > 1100) {
      const maxCards = Math.floor(1100 / (cardWidth + cardSpacing));
      const adjustedCardWidth = Math.floor((1100 - (maxCards - 1) * cardSpacing) / maxCards);
      const adjustedStartX = (1200 - (maxCards * adjustedCardWidth + (maxCards - 1) * cardSpacing)) / 2;

      for (let i = 0; i < Math.min(gachaData.characters.length, maxCards); i++) {
        const character = gachaData.characters[i];
        const cardX = adjustedStartX + i * (adjustedCardWidth + cardSpacing);

        await drawCharacterCard(ctx, character, cardX, cardY, adjustedCardWidth, cardHeight, true);
      }
    } else {
      for (let i = 0; i < gachaData.characters.length; i++) {
        const character = gachaData.characters[i];
        const cardX = startX + i * (cardWidth + cardSpacing);

        await drawCharacterCard(ctx, character, cardX, cardY, cardWidth, cardHeight, false);
      }
    }

    // 繪製時間區域背景
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(50, 450, 1100, 120, 15);
    } else {
      ctx.rect(50, 450, 1100, 120);
    }
    ctx.fill();

    // 添加時間區域陰影效果
    ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;

    ctx.font = '900 36px Nexon, "SourceHanSansTC", "SourceHanSans", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';

    let startDate: Date;
    let endDate: Date;

    try {
      if (typeof gachaData.start === 'number') {
        startDate = new Date(gachaData.start * 1000);
      } else {
        startDate = new Date(gachaData.start);
      }

      if (typeof gachaData.end === 'number') {
        endDate = new Date(gachaData.end * 1000);
      } else {
        endDate = new Date(gachaData.end);
      }
    } catch (error) {
      console.error('Error parsing dates:', error);
      startDate = new Date();
      endDate = new Date();
    }

    const now = new Date();

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      console.error('Invalid date data:', gachaData.start, gachaData.end);
      ctx.fillText('時間數據錯誤', 600, 520);
      ctx.fillText('請稍後再試', 600, 550);
      return canvas.toBuffer('image/png');
    }

    const formatDate = (date: Date) => {
      return date.toLocaleString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Taipei',
      });
    };

    const timeText = `${formatDate(startDate)} - ${formatDate(endDate)}`;
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.9)';
    ctx.lineWidth = 3;
    ctx.strokeText(timeText, 600, 500);
    ctx.fillText(timeText, 600, 500);

    const timeLeft = endDate.getTime() - now.getTime();

    if (timeLeft > 0) {
      const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hoursLeft = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

      const countdownText = `${daysLeft}日${hoursLeft}時${minutesLeft}分後結束`;
      ctx.strokeText(countdownText, 600, 540);
      ctx.fillText(countdownText, 600, 540);
    } else {
      ctx.strokeText('活動已結束', 600, 540);
      ctx.fillText('活動已結束', 600, 540);
    }

    // 重置陰影效果
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.strokeStyle = 'transparent';
    ctx.lineWidth = 0;

    return canvas.toBuffer('image/png');
  } catch (error) {
    console.error('[Error] drawCurrentGachaImage', error);
    return null;
  }
}

async function drawCharacterCard(ctx: any, character: any, cardX: number, cardY: number, cardWidth: number, cardHeight: number, isAdjusted: boolean) {
  ctx.fillStyle = '#242729';
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(cardX, cardY, cardWidth, cardHeight, 15);
  } else {
    ctx.rect(cardX, cardY, cardWidth, cardHeight);
  }
  ctx.fill();

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(cardX, cardY, cardWidth, cardHeight, 15);
  } else {
    ctx.rect(cardX, cardY, cardWidth, cardHeight);
  }
  ctx.stroke();

  const imageWidth = isAdjusted ? Math.min(200, cardWidth) : 200;
  const imageHeight = isAdjusted ? Math.min(226, cardHeight) : 226;
  const imageX = isAdjusted ? cardX + (cardWidth - imageWidth) / 2 : cardX;
  const imageY = cardY;

  await drawCharacterImage(ctx, character, imageX, imageY, imageWidth, imageHeight, isAdjusted);
  await drawCharacterIcon(ctx, character, cardX, cardY);
  drawCharacterName(ctx, character, imageX, imageY, imageWidth, imageHeight, isAdjusted);
}

async function drawCharacterImage(ctx: any, character: any, imageX: number, imageY: number, imageWidth: number, imageHeight: number, isAdjusted: boolean = false) {
  try {
    const characterImage = await loadImage(`https://schaledb.com/images/student/collection/${character.id}.webp`);

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(imageX + 15, imageY);
    ctx.lineTo(imageX + imageWidth - 15, imageY);
    ctx.quadraticCurveTo(imageX + imageWidth, imageY, imageX + imageWidth, imageY + 15);
    ctx.lineTo(imageX + imageWidth, imageY + imageHeight - 15);
    ctx.quadraticCurveTo(imageX + imageWidth, imageY + imageHeight, imageX + imageWidth - 15, imageY + imageHeight);
    ctx.lineTo(imageX + 15, imageY + imageHeight);
    ctx.quadraticCurveTo(imageX, imageY + imageHeight, imageX, imageY + imageHeight - 15);
    ctx.lineTo(imageX, imageY + 15);
    ctx.quadraticCurveTo(imageX, imageY, imageX + 15, imageY);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(characterImage, imageX, imageY, imageWidth, imageHeight);
    ctx.restore();
  } catch (error) {
    console.error(`Failed to load character image for ${character.name}:`, error);

    ctx.fillStyle = isAdjusted ? 'rgba(74, 74, 74, 0.8)' : '#242729';
    ctx.beginPath();
    ctx.moveTo(imageX + 15, imageY);
    ctx.lineTo(imageX + imageWidth - 15, imageY);
    ctx.quadraticCurveTo(imageX + imageWidth, imageY, imageX + imageWidth, imageY + 15);
    ctx.lineTo(imageX + imageWidth, imageY + imageHeight - 15);
    ctx.quadraticCurveTo(imageX + imageWidth, imageY + imageHeight, imageX + imageWidth - 15, imageY + imageHeight);
    ctx.lineTo(imageX + 15, imageY + imageHeight);
    ctx.quadraticCurveTo(imageX, imageY + imageHeight, imageX, imageY + imageHeight - 15);
    ctx.lineTo(imageX, imageY + 15);
    ctx.quadraticCurveTo(imageX, imageY, imageX + 15, imageY);
    ctx.closePath();
    ctx.fill();

    ctx.font = 'bold 32px Nexon, "SourceHanSansTC", "SourceHanSans", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(character.name.charAt(0), imageX + imageWidth / 2, imageY + imageHeight / 2 + 10);
  }
}

async function drawCharacterIcon(ctx: any, character: any, cardX: number, cardY: number) {
  const iconSize = 38;
  const iconX = cardX + 10;
  const iconY = cardY + 10;

  ctx.fillStyle = character.bulletTypeColor || '#ffffff';
  ctx.beginPath();
  ctx.arc(iconX + iconSize / 2, iconY + iconSize / 2, iconSize / 2, 0, 2 * Math.PI);
  ctx.fill();

  try {
    const typeIcon = await loadImage(`./public/role/Role_${character.tacticRole}.png`);
    const typeIconSize = 36;
    const typeIconX = iconX + (iconSize - typeIconSize) / 2;
    const typeIconY = iconY + (iconSize - typeIconSize) / 2;
    ctx.drawImage(typeIcon, typeIconX, typeIconY, typeIconSize, typeIconSize);
  } catch (error) {
    console.error(`Failed to load Role_${character.tacticRole}.png:`, error);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(iconX + iconSize / 2 - 4, iconY + iconSize / 2);
    ctx.lineTo(iconX + iconSize / 2 + 4, iconY + iconSize / 2);
    ctx.moveTo(iconX + iconSize / 2, iconY + iconSize / 2 - 4);
    ctx.lineTo(iconX + iconSize / 2, iconY + iconSize / 2 + 4);
    ctx.stroke();
  }
}

function drawCharacterName(ctx: any, character: any, imageX: number, imageY: number, imageWidth: number, imageHeight: number, isAdjusted: boolean) {
  const maxWidth = imageWidth - 20;
  const maxFontSize = isAdjusted ? 24 : 28;
  const minFontSize = 14;

  let fontSize = maxFontSize;
  let textWidth = 0;

  while (fontSize > minFontSize) {
    ctx.font = `bold ${fontSize}px Nexon, "SourceHanSansTC", "SourceHanSans", sans-serif`;
    textWidth = ctx.measureText(character.name).width;

    if (textWidth <= maxWidth) {
      break;
    }

    fontSize -= 1;
  }

  if (fontSize <= minFontSize) {
    fontSize = minFontSize;
    ctx.font = `bold ${fontSize}px Nexon, "SourceHanSansTC", "SourceHanSans", sans-serif`;
  }

  const textHeight = fontSize + 12;
  const textY = imageY + imageHeight - textHeight - 8;

  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.beginPath();
  ctx.moveTo(imageX + 15, textY);
  ctx.lineTo(imageX + imageWidth, textY);
  ctx.lineTo(imageX + imageWidth, imageY + imageHeight - 15);
  ctx.quadraticCurveTo(imageX + imageWidth, imageY + imageHeight, imageX + imageWidth - 15, imageY + imageHeight);
  ctx.lineTo(imageX + 15, imageY + imageHeight);
  ctx.quadraticCurveTo(imageX, imageY + imageHeight, imageX, imageY + imageHeight - 15);
  ctx.lineTo(imageX, textY);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.fillText(character.name, imageX + imageWidth / 2, textY + textHeight - 8);
}
