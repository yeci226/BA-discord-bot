import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, AttachmentBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } from 'discord.js';
import { drawInQueueReply } from '@/utilities';
import {
  getStudentsData,
  getEquipmentData,
  tomorrowResetTime,
  ARMOR_TYPE_COLORS,
  BULLET_TYPE_COLORS,
  smartTranslate,
  smartTranslateBatch,
  getLocalizationData,
  SQUAD_TYPE_COLORS,
} from '@/utilities/ba';
import Queue from 'queue';
import { createCanvas, loadImage, GlobalFonts } from '@napi-rs/canvas';
import { join } from 'path';
GlobalFonts.registerFromPath(join(process.cwd(), 'public', 'font', 'NEXONFootballGothicBA1.woff2'), 'Nexon');
const drawQueue = new Queue({ autostart: true });

// 獲取武器最大等級限制
function getMaxWeaponLevel(starGrade: number): number {
  if (starGrade >= 9) return 60;
  if (starGrade >= 8) return 50;
  if (starGrade >= 7) return 40;
  if (starGrade >= 6) return 30;
  return 1; // 5星以下沒有武器
}

export default {
  data: new SlashCommandBuilder()
    .setName('student')
    .setDescription('Query detailed information about a student')
    .setNameLocalizations({
      'zh-TW': '學生資料',
    })
    .setDescriptionLocalizations({
      'zh-TW': '查詢學生的詳細資料',
    })
    .addStringOption((option) =>
      option
        .setName('student')
        .setDescription('Student name or ID')
        .setNameLocalizations({
          'zh-TW': '學生',
        })
        .setDescriptionLocalizations({
          'zh-TW': '學生名稱或ID',
        })
        .setAutocomplete(true)
        .setRequired(true),
    )
    .addIntegerOption((option) =>
      option
        .setName('ex_skill_level')
        .setDescription('EX Skill Level (1-5)')
        .setNameLocalizations({
          'zh-TW': 'ex技能等級',
        })
        .setDescriptionLocalizations({
          'zh-TW': 'EX技能等級 (1-5)',
        })
        .setMinValue(1)
        .setMaxValue(5)
        .setRequired(false),
    )
    .addIntegerOption((option) =>
      option
        .setName('public_skill_level')
        .setDescription('Basic Skill Level (1-10)')
        .setNameLocalizations({
          'zh-TW': '基本技能等級',
        })
        .setDescriptionLocalizations({
          'zh-TW': '強化技能等級 (1-10)',
        })
        .setMinValue(1)
        .setMaxValue(10)
        .setRequired(false),
    )
    .addIntegerOption((option) =>
      option
        .setName('passive_skill_level')
        .setDescription('Enhanced Skill Level (1-10)')
        .setNameLocalizations({
          'zh-TW': '強化技能等級',
        })
        .setDescriptionLocalizations({
          'zh-TW': '強化技能等級 (1-10)',
        })
        .setMinValue(1)
        .setMaxValue(10)
        .setRequired(false),
    )
    .addIntegerOption((option) =>
      option
        .setName('extra_passive_skill_level')
        .setDescription('Sub Skill Level (1-10)')
        .setNameLocalizations({
          'zh-TW': '子技能等級',
        })
        .setDescriptionLocalizations({
          'zh-TW': '子技能等級 (1-10)',
        })
        .setMinValue(1)
        .setMaxValue(10)
        .setRequired(false),
    )
    .addIntegerOption((option) =>
      option
        .setName('equipment1_level')
        .setDescription('Equipment 1 level (0=EMPTY, 1-10)')
        .setNameLocalizations({
          'zh-TW': '裝備1等級',
        })
        .setDescriptionLocalizations({
          'zh-TW': '裝備1等級 (0=不裝備, 1-10)',
        })
        .setMinValue(0)
        .setMaxValue(10)
        .setRequired(false),
    )
    .addIntegerOption((option) =>
      option
        .setName('equipment2_level')
        .setDescription('Equipment 2 level (0=EMPTY, 1-10)')
        .setNameLocalizations({
          'zh-TW': '裝備2等級',
        })
        .setDescriptionLocalizations({
          'zh-TW': '裝備2等級 (0=不裝備, 1-10)',
        })
        .setMinValue(0)
        .setMaxValue(10)
        .setRequired(false),
    )
    .addIntegerOption((option) =>
      option
        .setName('equipment3_level')
        .setDescription('Equipment 3 level (0=EMPTY, 1-10)')
        .setNameLocalizations({
          'zh-TW': '裝備3等級',
        })
        .setDescriptionLocalizations({
          'zh-TW': '裝備3等級 (0=不裝備, 1-10)',
        })
        .setMinValue(0)
        .setMaxValue(10)
        .setRequired(false),
    )
    .addIntegerOption((option) =>
      option
        .setName('character_level')
        .setDescription('Character level (1-100)')
        .setNameLocalizations({
          'zh-TW': '角色等級',
        })
        .setDescriptionLocalizations({
          'zh-TW': '角色等級 (1-100)',
        })
        .setMinValue(1)
        .setMaxValue(100)
        .setRequired(false),
    )
    .addIntegerOption((option) =>
      option
        .setName('favor_level')
        .setDescription('Favor level (1-50)')
        .setNameLocalizations({
          'zh-TW': '羈絆等級',
        })
        .setDescriptionLocalizations({
          'zh-TW': '羈絆等級 (1-50)',
        })
        .setMinValue(1)
        .setMaxValue(50)
        .setRequired(false),
    )
    .addIntegerOption((option) =>
      option
        .setName('star_grade')
        .setDescription('Star grade (1-9)')
        .setNameLocalizations({
          'zh-TW': '星級',
        })
        .setDescriptionLocalizations({
          'zh-TW': '星級 (1-9星)',
        })
        .setMinValue(1)
        .setMaxValue(9)
        .setRequired(false),
    )
    .addIntegerOption((option) =>
      option
        .setName('weapon_level')
        .setDescription('Weapon level (6★:1-30, 7★:1-40, 8★:1-50, 9★:1-60)')
        .setNameLocalizations({
          'zh-TW': '武器等級',
        })
        .setDescriptionLocalizations({
          'zh-TW': '武器等級 (6星:1-30, 7星:1-40, 8星:1-50, 9星:1-60)',
        })
        .setMinValue(1)
        .setMaxValue(60)
        .setRequired(false),
    ),

  /**
   * @description 查詢學生資料
   * @param interaction - 交互實例
   * @param _args - 參數
   */
  async execute(interaction: ChatInputCommandInteraction, ..._args: string[]) {
    const studentId = interaction.options.getString('student');
    const exSkillLevel = interaction.options.getInteger('ex_skill_level') || 1; // 預設EX技能等級為1
    const publicSkillLevel = interaction.options.getInteger('public_skill_level') || 1; // 預設基本技能等級為1
    const passiveSkillLevel = interaction.options.getInteger('passive_skill_level') || 1; // 預設強化技能等級為1
    const extraPassiveSkillLevel = interaction.options.getInteger('extra_passive_skill_level') || 1; // 預設子技能等級為1
    const equipment1Level = interaction.options.getInteger('equipment1_level') ?? 0; // 預設裝備1等級為0
    const equipment2Level = interaction.options.getInteger('equipment2_level') ?? 0; // 預設裝備2等級為0
    const equipment3Level = interaction.options.getInteger('equipment3_level') ?? 0; // 預設裝備3等級為0
    const characterLevel = interaction.options.getInteger('character_level') || 1; // 預設角色等級為1
    const favorLevel = interaction.options.getInteger('favor_level') || 1; // 預設羈絆等級為1
    const starGrade = interaction.options.getInteger('star_grade') || 3; // 預設星級為3
    const rawWeaponLevel = interaction.options.getInteger('weapon_level') || 1; // 預設武器等級為1

    // 根據星級限制武器等級
    const maxWeaponLevel = getMaxWeaponLevel(starGrade);
    const weaponLevel = Math.min(rawWeaponLevel, maxWeaponLevel);

    if (!studentId) {
      return interaction.reply({
        embeds: [new EmbedBuilder().setColor('#E76161').setTitle('請提供學生名稱或ID，老師！').setThumbnail('https://cdnimg-v2.gamekee.com/wiki2.0/images/w_240/h_240/215/43637/2025/3/1/543385.gif')],
      });
    }

    await interaction.deferReply();

    const drawTask = async () => {
      try {
        const imageBuffer = await drawStudentDetailImage(
          studentId,
          exSkillLevel,
          publicSkillLevel,
          passiveSkillLevel,
          extraPassiveSkillLevel,
          equipment1Level,
          equipment2Level,
          equipment3Level,
          characterLevel,
          favorLevel,
          starGrade,
          weaponLevel,
        );
        if (!imageBuffer) {
          return interaction.editReply({
            embeds: [
              new EmbedBuilder()
                .setColor('#E76161')
                .setTitle('找不到該學生或繪製圖片時發生錯誤，請老師稍後再試！')
                .setThumbnail('https://cdnimg-v2.gamekee.com/wiki2.0/images/w_240/h_240/215/43637/2025/3/1/543385.gif'),
            ],
          });
        }

        const attachment = new AttachmentBuilder(imageBuffer, { name: 'student_detail.png' });
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
      drawInQueueReply(interaction, `正在繪製學生資料 ${drawQueue.length - 1} 號，老師請稍等~`);
    }
  },
};

// 根據Category和Tier找到裝備
function findEquipmentByCategoryAndTier(equipmentData: any, category: string, tier: number) {
  for (const [id, equipment] of Object.entries(equipmentData)) {
    if ((equipment as any).Category === category && (equipment as any).Tier === tier) {
      return equipment;
    }
  }
  return null;
}

// 格式化百分比顯示
function formatPercentage(value: number): string {
  // value 已經是百分比值（例如：3.1017 表示 310.17%）
  // 如果是整數，直接顯示整數
  if (value % 1 === 0) {
    return `${value}%`;
  }
  // 最多顯示兩位小數，超過的才四捨五入，並去掉末尾的零
  const formatted = value.toFixed(2);
  // 去掉末尾的零
  const trimmed = formatted.replace(/\.?0+$/, '');
  return `${trimmed}%`;
}

// 計算指定等級的基礎屬性
// 星級加成數值定義（擴展到9星系統）
// 每個索引代表該星級相對於0星的增量加成
const STAR_GRADE_BONUSES = {
  AttackPower: [0, 1000, 1200, 1400, 1700, 2000, 2400, 2800, 3200, 3600], // 0-9星
  MaxHP: [0, 500, 700, 900, 1400, 1800, 2200, 2600, 3000, 3400],
  HealPower: [0, 750, 1000, 1200, 1500, 1800, 2100, 2400, 2700, 3000],
  DefensePower: [0, 400, 600, 800, 1200, 1500, 1800, 2100, 2400, 2700],
};

function calculateLevelStats(student: any, level: number, starGrade: number = 3) {
  // 計算等級係數 (1級=0, 100級=1)
  const levelCoefficient = (level - 1) / 99;

  // 計算基礎屬性值（不含星級加成）
  const baseStats = {
    MaxHP: Math.floor(student.MaxHP1 + (student.MaxHP100 - student.MaxHP1) * levelCoefficient),
    AttackPower: Math.floor(student.AttackPower1 + (student.AttackPower100 - student.AttackPower1) * levelCoefficient),
    DefensePower: Math.floor(student.DefensePower1 + (student.DefensePower100 - student.DefensePower1) * levelCoefficient),
    HealPower: Math.floor(student.HealPower1 + (student.HealPower100 - student.HealPower1) * levelCoefficient),
  };

  // 計算星級倍率
  const starMultiplier = {
    MaxHP: 1 + getStarBonus('MaxHP', starGrade) / 10000,
    AttackPower: 1 + getStarBonus('AttackPower', starGrade) / 10000,
    DefensePower: 1 + getStarBonus('DefensePower', starGrade) / 10000,
    HealPower: 1 + getStarBonus('HealPower', starGrade) / 10000,
  };

  // 應用星級倍率
  const levelStats = {
    MaxHP: Math.ceil(baseStats.MaxHP * starMultiplier.MaxHP),
    AttackPower: Math.ceil(baseStats.AttackPower * starMultiplier.AttackPower),
    DefensePower: Math.ceil(baseStats.DefensePower * starMultiplier.DefensePower),
    HealPower: Math.ceil(baseStats.HealPower * starMultiplier.HealPower),
  };

  return levelStats;
}

// 獲取星級累計加成值
function getStarBonus(statType: string, starGrade: number): number {
  const bonuses = STAR_GRADE_BONUSES[statType as keyof typeof STAR_GRADE_BONUSES] || [0, 0, 0, 0, 0];

  // 根據遊戲邏輯：slice(0, starGrade).reduce()
  // 取從索引0到starGrade-1的元素進行累加
  let totalBonus = 0;
  for (let i = 0; i < Math.min(starGrade, bonuses.length); i++) {
    totalBonus += bonuses[i];
  }

  return totalBonus;
}

// 計算裝備屬性加成
async function calculateEquipmentStats(student: any, equipment1Level: number, equipment2Level: number, equipment3Level: number) {
  const equipmentData = await getEquipmentData();
  const equipmentStats = {
    MaxHP: { base: 0, percent: 0 },
    AttackPower: { base: 0, percent: 0 },
    DefensePower: { base: 0, percent: 0 },
    HealPower: { base: 0, percent: 0 },
    CriticalPoint: { base: 0, percent: 0 },
    CriticalDamageRate: { base: 0, percent: 0 },
    CriticalChanceResistPoint: { base: 0, percent: 0 },
    CriticalDamageResistRate: { base: 0, percent: 0 },
    DodgePoint: { base: 0, percent: 0 },
    AccuracyPoint: { base: 0, percent: 0 },
    OppressionPower: { base: 0, percent: 0 },
    OppressionResist: { base: 0, percent: 0 },
  };

  // 獲取學生的裝備類型
  const equipmentTypes = student.Equipment || [];

  for (let i = 0; i < Math.min(equipmentTypes.length, 3); i++) {
    const equipmentType = equipmentTypes[i];
    const equipmentLevel = i === 0 ? equipment1Level : i === 1 ? equipment2Level : equipment3Level;

    // 如果裝備等級為0，跳過該裝備的屬性計算
    if (equipmentLevel === 0) {
      continue;
    }

    // 根據裝備類型找到對應的裝備
    const equipment = findEquipmentByCategoryAndTier(equipmentData, equipmentType, equipmentLevel);

    if (equipment && (equipment as any).StatType && (equipment as any).StatValue) {
      for (let j = 0; j < (equipment as any).StatType.length; j++) {
        const statType = (equipment as any).StatType[j];
        const statValues = (equipment as any).StatValue[j];

        if (statValues && statValues.length > 0) {
          // 使用裝備等級對應的數值，如果超出範圍則使用最大值
          // 裝備等級從1開始，但數組索引從0開始，所以需要減1
          // 注意：裝備的MaxLevel可能與StatValue數組長度不同
          const maxLevel = (equipment as any).MaxLevel || statValues.length;
          const levelIndex = Math.min(equipmentLevel - 1, maxLevel - 1, statValues.length - 1);
          const statValue = statValues[levelIndex] || statValues[statValues.length - 1];

          // 確保statValue是數字
          if (typeof statValue !== 'number' || isNaN(statValue)) {
            continue;
          }

          // 根據屬性類型累加數值
          switch (statType) {
            case 'MaxHP_Base':
              equipmentStats.MaxHP.base += statValue || 0;
              break;
            case 'MaxHP_Coefficient':
              equipmentStats.MaxHP.percent += (statValue || 0) / 100; // 除以100轉換為百分比
              break;
            case 'AttackPower_Coefficient':
              equipmentStats.AttackPower.percent += (statValue || 0) / 100; // 除以100轉換為百分比
              break;
            case 'DefensePower_Base':
              equipmentStats.DefensePower.base += statValue || 0;
              break;
            case 'HealPower_Coefficient':
              equipmentStats.HealPower.percent += (statValue || 0) / 100; // 除以100轉換為百分比
              break;
            case 'CriticalPoint_Base':
              equipmentStats.CriticalPoint.base += statValue || 0;
              break;
            case 'CriticalDamageRate_Base':
              equipmentStats.CriticalDamageRate.base += statValue || 0;
              break;
            case 'CriticalChanceResistPoint_Base':
              equipmentStats.CriticalChanceResistPoint.base += statValue || 0;
              break;
            case 'CriticalDamageResistRate_Base':
              equipmentStats.CriticalDamageResistRate.base += statValue || 0;
              break;
            case 'DodgePoint_Base':
              equipmentStats.DodgePoint.base += statValue || 0;
              break;
            case 'AccuracyPoint_Base':
              equipmentStats.AccuracyPoint.base += statValue || 0;
              break;
            case 'OppressionPower_Coefficient':
              equipmentStats.OppressionPower.percent += (statValue || 0) / 100; // 除以100轉換為百分比
              break;
            case 'OppressionResist_Coefficient':
              equipmentStats.OppressionResist.percent += (statValue || 0) / 100; // 除以100轉換為百分比
              break;
          }
        }
      }
    }
  }

  return equipmentStats;
}

// 計算羈絆屬性加成
function calculateFavorStats(student: any, favorLevel: number) {
  const favorStats = {
    MaxHP: 0,
    AttackPower: 0,
    DefensePower: 0,
    HealPower: 0,
  };

  if (!student.FavorStatType || !student.FavorStatValue || favorLevel <= 1) {
    return favorStats;
  }

  const favorStatTypes = student.FavorStatType;
  const favorStatValues = student.FavorStatValue;

  // 羈絆等級對應的數值索引計算
  // 1等級 = 預設值 (不加成)
  // FavorStatValue[0] 是第2等級的加成，FavorStatValue[1] 是第3等級的加成，以此類推
  // 每個子數組 [a, b] 對應該等級的屬性加成值：a 是第一個屬性，b 是第二個屬性

  let attackPowerBonus = 0;
  let maxHPBonus = 0;
  let defensePowerBonus = 0;
  let healPowerBonus = 0;

  // 計算總加成 - 從等級2開始累加到目標等級
  for (let level = 2; level <= favorLevel; level++) {
    const levelIndex = level - 2; // 等級2對應索引0，等級3對應索引1，以此類推

    if (levelIndex < favorStatValues.length) {
      const levelBonus = favorStatValues[levelIndex];
      if (Array.isArray(levelBonus) && levelBonus.length >= 2) {
        // 根據FavorStatType的順序分配加成值
        for (let i = 0; i < favorStatTypes.length && i < levelBonus.length; i++) {
          const statType = favorStatTypes[i];
          const bonusValue = levelBonus[i] || 0;

          switch (statType) {
            case 'AttackPower':
              attackPowerBonus += bonusValue;
              break;
            case 'MaxHP':
              maxHPBonus += bonusValue;
              break;
            case 'DefensePower':
              defensePowerBonus += bonusValue;
              break;
            case 'HealPower':
              healPowerBonus += bonusValue;
              break;
          }
        }
      }
    }
  }

  favorStats.AttackPower = attackPowerBonus;
  favorStats.MaxHP = maxHPBonus;
  favorStats.DefensePower = defensePowerBonus;
  favorStats.HealPower = healPowerBonus;

  return favorStats;
}

// 計算專屬裝備屬性加成
function calculateGearStats(student: any, favorLevel: number) {
  const gearStats = {
    MaxHP: { base: 0, percent: 0 },
    AttackPower: { base: 0, percent: 0 },
    DefensePower: { base: 0, percent: 0 },
    HealPower: { base: 0, percent: 0 },
    CriticalPoint: { base: 0, percent: 0 },
    CriticalDamageRate: { base: 0, percent: 0 },
    CriticalChanceResistPoint: { base: 0, percent: 0 },
    CriticalDamageResistRate: { base: 0, percent: 0 },
    DodgePoint: { base: 0, percent: 0 },
    AccuracyPoint: { base: 0, percent: 0 },
    OppressionPower: { base: 0, percent: 0 },
    OppressionResist: { base: 0, percent: 0 },
    EnhanceExplosionRate: { base: 0, percent: 0 },
    EnhancePierceRate: { base: 0, percent: 0 },
    EnhanceMysticRate: { base: 0, percent: 0 },
  };

  // 只有羈絆等級達到15等且有專屬裝備才計算加成
  if (!student.Gear || !student.Gear.StatType || !student.Gear.StatValue || favorLevel < 15) {
    return gearStats;
  }

  const statTypes = student.Gear.StatType;
  const statValues = student.Gear.StatValue;

  for (let i = 0; i < statTypes.length && i < statValues.length; i++) {
    const statType = statTypes[i];
    const statValueArray = statValues[i];

    if (!statValueArray || statValueArray.length === 0) continue;

    // 因為兩個值相同，所以只取第一個值
    const statValue = statValueArray[0] || 0;

    // 根據屬性類型累加數值
    switch (statType) {
      case 'MaxHP_Base':
        gearStats.MaxHP.base += statValue;
        break;
      case 'MaxHP_Coefficient':
        gearStats.MaxHP.percent += statValue / 100;
        break;
      case 'AttackPower_Base':
        gearStats.AttackPower.base += statValue;
        break;
      case 'AttackPower_Coefficient':
        gearStats.AttackPower.percent += statValue / 100;
        break;
      case 'DefensePower_Base':
        gearStats.DefensePower.base += statValue;
        break;
      case 'DefensePower_Coefficient':
        gearStats.DefensePower.percent += statValue / 100;
        break;
      case 'HealPower_Base':
        gearStats.HealPower.base += statValue;
        break;
      case 'HealPower_Coefficient':
        gearStats.HealPower.percent += statValue / 100;
        break;
      case 'CriticalPoint_Base':
        gearStats.CriticalPoint.base += statValue;
        break;
      case 'CriticalDamageRate_Base':
        gearStats.CriticalDamageRate.base += statValue;
        break;
      case 'CriticalChanceResistPoint_Base':
        gearStats.CriticalChanceResistPoint.base += statValue;
        break;
      case 'CriticalDamageResistRate_Base':
        gearStats.CriticalDamageResistRate.base += statValue;
        break;
      case 'DodgePoint_Base':
        gearStats.DodgePoint.base += statValue;
        break;
      case 'AccuracyPoint_Base':
        gearStats.AccuracyPoint.base += statValue;
        break;
      case 'OppressionPower_Coefficient':
        gearStats.OppressionPower.percent += statValue / 100;
        break;
      case 'OppressionResist_Coefficient':
        gearStats.OppressionResist.percent += statValue / 100;
        break;
      case 'EnhanceExplosionRate_Base':
        gearStats.EnhanceExplosionRate.base += statValue;
        break;
      case 'EnhancePierceRate_Base':
        gearStats.EnhancePierceRate.base += statValue;
        break;
      case 'EnhanceMysticRate_Base':
        gearStats.EnhanceMysticRate.base += statValue;
        break;
    }
  }

  return gearStats;
}

// 計算專屬武器屬性加成（6星解鎖）
function calculateWeaponStats(student: any, level: number = 100, starGrade: number = 3) {
  const weaponStats = {
    MaxHP: 0,
    AttackPower: 0,
    DefensePower: 0,
    HealPower: 0,
  };

  // 6星以下不解鎖專屬武器
  if (!student.Weapon || starGrade < 6) {
    return weaponStats;
  }

  const weapon = student.Weapon;
  const levelCoefficient = (level - 1) / 99;

  // 計算武器屬性（類似角色屬性計算）
  weaponStats.MaxHP = Math.floor(weapon.MaxHP1 + (weapon.MaxHP100 - weapon.MaxHP1) * levelCoefficient);
  weaponStats.AttackPower = Math.floor(weapon.AttackPower1 + (weapon.AttackPower100 - weapon.AttackPower1) * levelCoefficient);
  weaponStats.HealPower = Math.floor((weapon.HealPower1 || 0) + ((weapon.HealPower100 || 0) - (weapon.HealPower1 || 0)) * levelCoefficient);

  return weaponStats;
}

// 計算地形適應性加成（8星解鎖）
function calculateAdaptationStats(student: any, starGrade: number = 3) {
  const adaptationStats = {
    MaxHP: 0,
    AttackPower: 0,
    DefensePower: 0,
    HealPower: 0,
  };

  // 8星以下不解鎖地形適應性加成
  if (!student.Weapon || starGrade < 8) {
    return adaptationStats;
  }

  const weapon = student.Weapon;
  const adaptationType = weapon.AdaptationType; // Street, Indoor, Outdoor
  const adaptationValue = weapon.AdaptationValue || 0; // 適應性數值

  if (!adaptationType || adaptationValue <= 0) {
    return adaptationStats;
  }

  // 地形適應性加成計算（基於遊戲邏輯的估算）
  // Street/Indoor/Outdoor 各有不同的加成方式
  const baseBonus = adaptationValue * 100; // 基礎加成值

  switch (adaptationType) {
    case 'Street':
      // 街道適應：攻擊力和迴避值提升
      adaptationStats.AttackPower = baseBonus;
      break;
    case 'Indoor':
      // 室內適應：生命值和防禦力提升
      adaptationStats.MaxHP = baseBonus * 2;
      adaptationStats.DefensePower = baseBonus / 2;
      break;
    case 'Outdoor':
      // 戶外適應：攻擊力和生命值提升
      adaptationStats.AttackPower = baseBonus * 0.8;
      adaptationStats.MaxHP = baseBonus;
      break;
  }

  return adaptationStats;
}

// 計算武器屬性（基於等級和星級）
function calculateWeaponStatsByLevel(student: any, weaponLevel: number = 1, starGrade: number = 3) {
  const weaponStats = {
    MaxHP: 0,
    AttackPower: 0,
    DefensePower: 0,
    HealPower: 0,
  };

  // 6星以下或沒有武器時不計算武器屬性
  if (!student.Weapon || starGrade < 6) {
    return weaponStats;
  }

  const weapon = student.Weapon;
  const maxLevel = getMaxWeaponLevel(starGrade);
  const actualLevel = Math.min(weaponLevel, maxLevel);

  // 計算每個屬性的當前等級數值
  if (weapon.MaxHP1 !== undefined && weapon.MaxHP100 !== undefined) {
    weaponStats.MaxHP = calculateWeaponStatForLevel(weapon.MaxHP1, weapon.MaxHP100, actualLevel, weapon.StatLevelUpType || 'Standard');
  }

  if (weapon.AttackPower1 !== undefined && weapon.AttackPower100 !== undefined) {
    weaponStats.AttackPower = calculateWeaponStatForLevel(weapon.AttackPower1, weapon.AttackPower100, actualLevel, weapon.StatLevelUpType || 'Standard');
  }

  if (weapon.HealPower1 !== undefined && weapon.HealPower100 !== undefined) {
    weaponStats.HealPower = calculateWeaponStatForLevel(weapon.HealPower1, weapon.HealPower100, actualLevel, weapon.StatLevelUpType || 'Standard');
  }

  if (weapon.DefensePower1 !== undefined && weapon.DefensePower100 !== undefined) {
    weaponStats.DefensePower = calculateWeaponStatForLevel(weapon.DefensePower1, weapon.DefensePower100, actualLevel, weapon.StatLevelUpType || 'Standard');
  }

  return weaponStats;
}

// 計算指定等級的武器屬性值（完全複製 index.js 中的 tg 函數邏輯）
function calculateWeaponStatForLevel(level1Value: number, level100Value: number, currentLevel: number, statLevelUpType: string = 'Standard'): number {
  const ratio = getStatLevelUpRatio(currentLevel, statLevelUpType);
  return Math.ceil(level1Value + (level100Value - level1Value) * ratio);
}

// 計算屬性成長比例（基於 index.js 中的 bT 函數邏輯）
function getStatLevelUpRatio(level: number, statLevelUpType: string): number {
  switch (statLevelUpType) {
    case 'TimeAttack':
      if (level <= 1) return 0;
      if (level === 2) return 0.0101;
      if (level <= 24) return 0.0707;
      if (level === 25) return 0.0808;
      if (level <= 39) return 0.1919;
      if (level === 40) return 0.202;
      if (level <= 64) return 0.4444;
      if (level === 65) return 0.4545;
      if (level <= 77) return 0.7172;
      if (level === 78) return 0.7273;
      return parseFloat(((level - 1) / 99).toFixed(4));
    case 'LateBloom':
    case 'Premature':
      return (level - 1) / 99;
    default: // 'Standard'
      return parseFloat(((level - 1) / 99).toFixed(4));
  }
}

// 繪製星級 SVG 圖標
function drawStarSVG(ctx: any, x: number, y: number, size: number, color: string) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();

  // 基於 SVG 路徑的星形繪製
  const centerX = x + size / 2;
  const centerY = y + size / 2;

  // 五角星路徑（簡化版）
  const points = [];
  for (let i = 0; i < 5; i++) {
    const angle = ((i * 144 - 90) * Math.PI) / 180; // 外角
    const outerX = centerX + Math.cos(angle) * (size * 0.4);
    const outerY = centerY + Math.sin(angle) * (size * 0.4);
    points.push([outerX, outerY]);

    const innerAngle = (((i + 0.5) * 144 - 90) * Math.PI) / 180; // 內角
    const innerX = centerX + Math.cos(innerAngle) * (size * 0.16);
    const innerY = centerY + Math.sin(innerAngle) * (size * 0.16);
    points.push([innerX, innerY]);
  }

  ctx.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i][0], points[i][1]);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

async function drawStudentDetailImage(
  studentId: string,
  exSkillLevel: number = 3,
  publicSkillLevel: number = 5,
  passiveSkillLevel: number = 5,
  extraPassiveSkillLevel: number = 5,
  equipment1Level: number = 1,
  equipment2Level: number = 1,
  equipment3Level: number = 1,
  characterLevel: number = 100,
  favorLevel: number = 1,
  starGrade: number = 3,
  weaponLevel: number = 1,
) {
  try {
    const canvas = createCanvas(2100, 1200);
    const ctx = canvas.getContext('2d');

    const studentsData = await getStudentsData();
    const student = studentsData[studentId];

    if (!student) {
      return null;
    }

    // 計算指定等級的基礎屬性（包含星級加成）
    const levelStats = calculateLevelStats(student, characterLevel, starGrade);

    // 計算裝備屬性加成
    const equipmentStats = await calculateEquipmentStats(student, equipment1Level, equipment2Level, equipment3Level);

    // 計算羈絆屬性加成
    const favorStats = calculateFavorStats(student, favorLevel);

    // 計算專屬裝備屬性加成
    const gearStats = calculateGearStats(student, favorLevel);

    // 計算專屬武器屬性加成（6星解鎖）
    const weaponStats = calculateWeaponStatsByLevel(student, weaponLevel, starGrade);

    // 計算地形適應性加成（8星解鎖）
    const adaptationStats = calculateAdaptationStats(student, starGrade);

    // 整體背景
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, 2100, 1200);

    // 左側區域 (1/3 版面) - 學生立繪和背景
    const leftSectionWidth = 2100 / 3;
    const leftSectionHeight = 1200;
    const leftSectionX = 0;
    const leftSectionY = 0;

    // 右側區域 (2/3 版面) - 資訊面板
    const rightSectionWidth = (2100 * 2) / 3;
    const rightSectionHeight = 1200;
    const rightSectionX = leftSectionWidth;
    const rightSectionY = 0;

    // 繪製學生專屬背景
    if (student.CollectionBG) {
      try {
        const backgroundImage = await loadImage(`https://schaledb.com/images/background/${student.CollectionBG}.jpg`);

        // 背景圖片原始尺寸 400x300
        const bgOriginalWidth = 400;
        const bgOriginalHeight = 300;
        const bgAspectRatio = bgOriginalWidth / bgOriginalHeight;

        // 計算背景圖片尺寸 (cover 效果)
        let drawWidth, drawHeight, drawX, drawY;

        if (bgAspectRatio > leftSectionWidth / leftSectionHeight) {
          // 背景圖片更寬，以高度為準
          drawHeight = leftSectionHeight;
          drawWidth = leftSectionHeight * bgAspectRatio;
          drawX = leftSectionWidth - drawWidth;
          drawY = 0;
        } else {
          // 背景圖片更高，以寬度為準
          drawWidth = leftSectionWidth;
          drawHeight = leftSectionWidth / bgAspectRatio;
          drawX = 0;
          drawY = leftSectionHeight - drawHeight;
        }

        // 應用模糊效果
        ctx.filter = 'blur(4px)';
        ctx.drawImage(backgroundImage, drawX, drawY, drawWidth, drawHeight);
        ctx.filter = 'none';
      } catch (error) {
        console.error(`Failed to load student background for ${student.Name}:`, error);
      }
    }

    // 添加半透明遮罩
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(leftSectionX, leftSectionY, leftSectionWidth, leftSectionHeight);

    // 學生圖片 (在左側區域)
    try {
      const characterImage = await loadImage(`https://schaledb.com/images/student/portrait/${studentId}.webp`);

      // 獲取實際圖片尺寸
      const charOriginalWidth = characterImage.width;
      const charOriginalHeight = characterImage.height;
      const charAspectRatio = charOriginalWidth / charOriginalHeight;

      // 僅根據高度調整，忽略寬度限制
      const maxHeight = leftSectionHeight - 40; // 上下各留20px邊距
      const imageHeight = maxHeight;
      const imageWidth = maxHeight * charAspectRatio;

      // 計算置中位置
      const centerX = leftSectionX + leftSectionWidth / 2;
      const centerY = leftSectionY + leftSectionHeight / 2;
      const imageX = centerX - imageWidth / 2;
      const imageY = centerY - imageHeight / 2;

      // 設置裁切區域，限制在左側區域內
      ctx.save();
      ctx.beginPath();
      ctx.rect(leftSectionX, leftSectionY, leftSectionWidth, leftSectionHeight);
      ctx.clip();

      // 繪製角色圖片
      ctx.drawImage(characterImage, imageX, imageY, imageWidth, imageHeight);

      // 恢復裁切區域
      ctx.restore();
    } catch (error) {
      console.error(`Failed to load character image for ${student.Name}:`, error);
    }

    // 右側內容區域 - 分為左右兩欄
    const leftColumnX = rightSectionX + 20;
    const rightColumnX = rightSectionX + rightSectionWidth / 2 + 10;
    const contentY = rightSectionY + 100;
    const columnWidth = rightSectionWidth / 2 - 30;

    let leftCurrentY = contentY;
    let rightCurrentY = contentY;

    // 第一個區塊 - 學生名稱和基本資訊 (跨越整個右側區域)
    ctx.font = 'bold 78px Nexon, "Noto Sans TC", "Noto Sans JP", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'left';
    ctx.fillText(student.Name, leftColumnX, leftCurrentY);
    const nameWidth = ctx.measureText(student.Name).width;

    // 角色等級（放在角色名稱右下角）
    ctx.font = 'bold 32px Nexon, "Noto Sans TC", "Noto Sans JP", sans-serif';
    ctx.fillStyle = '#cccccc';
    ctx.textAlign = 'left';

    // 計算角色名稱的寬度和等級文字寬度
    const levelText = `Lv.${characterLevel}`;
    ctx.fillText(levelText, leftColumnX + nameWidth + 10, leftCurrentY + 5);
    const levelTextWidth = ctx.measureText(levelText).width;

    // 羈絆等級（放在角色等級右邊）
    if (favorLevel > 1) {
      const favorIconSize = 60; // 增大圖標尺寸
      const favorX = leftColumnX + nameWidth + 10 + levelTextWidth + 5;
      const favorY = leftCurrentY - 35; // 調整Y位置以適應更大的圖標

      // 繪製羈絆圖標
      try {
        const favorIcon = await loadImage('./public/ui/School_Icon_Schedule_Favor.png');
        ctx.drawImage(favorIcon, favorX, favorY, favorIconSize, favorIconSize);

        // 羈絆等級數字（放在圖標中心）
        ctx.font = '700 20px Nexon, "Noto Sans TC", "Noto Sans JP", sans-serif'; // 調整字體大小以適合圖標
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText(favorLevel.toString(), favorX + favorIconSize / 2, favorY + favorIconSize / 2 + 7); // 置中並微調垂直位置
        ctx.textAlign = 'left'; // 恢復原本的對齊方式
      } catch (error) {
        console.error('Failed to load favor icon:', error);
        // 如果載入失敗，使用心形符號背景和數字
        ctx.fillStyle = '#ff69b4';
        ctx.beginPath();
        ctx.arc(favorX + favorIconSize / 2, favorY + favorIconSize / 2, favorIconSize / 2, 0, 2 * Math.PI);
        ctx.fill();

        // 在心形背景上顯示數字
        ctx.font = '700 20px Nexon, "Noto Sans TC", "Noto Sans JP", sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText(favorLevel.toString(), favorX + favorIconSize / 2, favorY + favorIconSize / 2 + 7);
        ctx.textAlign = 'left'; // 恢復原本的對齊方式
      }
    }

    leftCurrentY += 30;

    // 星級和類型資訊
    const infoPillHeight = 50;
    const infoPillSpacing = 15;
    let pillX = leftColumnX;

    // 星級（使用SVG顯示）
    if (starGrade > 0) {
      // 生成限定文字
      const isLimited = student.IsLimited && student.IsLimited !== 0;
      let limitedText = '';
      if (student.IsLimited === 3) {
        limitedText = '週年';
      } else if (student.IsLimited === 2) {
        limitedText = '活動';
      } else if (isLimited) {
        limitedText = '限定';
      }

      // 計算星級顯示相關參數
      const starSize = 36;
      const starSpacing = -5;
      const gapBetweenGroups = 5; // 前5星和後4星之間的間距

      // 計算總寬度
      let totalStarWidth = 0;
      if (starGrade <= 5) {
        totalStarWidth = starGrade * (starSize + starSpacing) - starSpacing;
      } else {
        totalStarWidth = 5 * (starSize + starSpacing) - starSpacing + gapBetweenGroups + (starGrade - 5) * (starSize + starSpacing) - starSpacing;
      }

      const starText = limitedText ? `(${limitedText})` : '';

      // 計算背景框寬度
      ctx.font = 'bold 28px Nexon, "Noto Sans TC", "Noto Sans JP", sans-serif';
      const limitedTextWidth = starText ? ctx.measureText(starText).width + 10 : 0;
      const starPillWidth = Math.max(150, totalStarWidth + limitedTextWidth + 20);
      // 繪製背景
      ctx.fillStyle = '#2a2a2a';
      ctx.beginPath();
      ctx.roundRect(pillX, leftCurrentY, starPillWidth, infoPillHeight, 20);
      ctx.fill();

      // 繪製星級 SVG
      let currentStarX = pillX + 10;
      const starY = leftCurrentY + (infoPillHeight - starSize) / 2;

      // 繪製前5星（金色）
      for (let i = 0; i < Math.min(starGrade, 5); i++) {
        drawStarSVG(ctx, currentStarX, starY, starSize, 'rgb(255, 201, 51)');
        currentStarX += starSize + starSpacing;
      }

      // 如果有6星以上，添加間距並繪製後4星（藍色）
      if (starGrade > 5) {
        currentStarX += gapBetweenGroups - starSpacing;
        for (let i = 5; i < starGrade; i++) {
          drawStarSVG(ctx, currentStarX, starY, starSize, '#00BFFF'); // 使用天藍色 (DeepSkyBlue)
          currentStarX += starSize + starSpacing;
        }
      }

      // 繪製限定文字
      if (starText) {
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'left';
        ctx.fillText(starText, currentStarX + 5, leftCurrentY + 35);
      }

      pillX += starPillWidth + 10;
    }

    // 角色類型
    ctx.fillStyle = '#2a2a2a';
    ctx.beginPath();
    ctx.roundRect(pillX, leftCurrentY, 160, infoPillHeight, 20);
    ctx.fill();

    ctx.font = 'italic bold 32px Nexon, "Noto Sans TC", "Noto Sans JP", sans-serif';
    ctx.fillStyle = SQUAD_TYPE_COLORS[student.SquadType];
    ctx.textAlign = 'center';
    ctx.fillText(await smartTranslate(student.SquadType), pillX + 80, leftCurrentY + 35);

    // 第二個區塊 - 角色屬性資訊 (直接放在星級下面)
    leftCurrentY += 100;

    // 角色屬性內容
    const attributeY = leftCurrentY;
    let attributeX = leftColumnX;

    // 戰術角色
    const roleText = await smartTranslate(student.TacticRole);
    const roleTextWidth = ctx.measureText(roleText).width;
    const rolePillWidth = Math.max(120, roleTextWidth + 80);

    ctx.fillStyle = '#2a2a2a';
    ctx.beginPath();
    ctx.roundRect(attributeX, attributeY, rolePillWidth, infoPillHeight, 20);
    ctx.fill();

    try {
      const roleImage = await loadImage(`./public/role/Role_${student.TacticRole}.png`);
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(attributeX + 8, attributeY + 8, 34, 34, 6);
      ctx.clip();
      ctx.drawImage(roleImage, attributeX + 8, attributeY + 8, 34, 34);
      ctx.restore();
    } catch (error) {
      console.error(`Failed to load role image:`, error);
    }

    ctx.font = 'bold 30px Nexon, "Noto Sans TC", "Noto Sans JP", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(roleText, attributeX + rolePillWidth / 2 + 10, attributeY + 35);

    attributeX += rolePillWidth + 10;

    // 攻擊類型
    const attackText = await smartTranslate(student.BulletType);
    const attackTextWidth = ctx.measureText(attackText).width;
    const attackPillWidth = Math.max(120, attackTextWidth + 80);

    ctx.fillStyle = '#2a2a2a';
    ctx.beginPath();
    ctx.roundRect(attributeX, attributeY, attackPillWidth, infoPillHeight, 20);
    ctx.fill();

    const bulletColor = BULLET_TYPE_COLORS[student.BulletType] || '#ffffff';
    ctx.fillStyle = bulletColor;
    ctx.beginPath();
    ctx.arc(attributeX + 25, attributeY + 25, 19, 0, 2 * Math.PI);
    ctx.fill();

    try {
      const attackImage = await loadImage(`./public/type/Type_Attack.png`);
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(attributeX + 8, attributeY + 8, 34, 34, 6);
      ctx.clip();
      ctx.drawImage(attackImage, attributeX + 12, attributeY + 12, 26, 26);
      ctx.restore();
    } catch (error) {
      console.error(`Failed to load attack type image:`, error);
    }

    ctx.font = 'bold 30px Nexon, "Noto Sans TC", "Noto Sans JP", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(attackText, attributeX + attackPillWidth / 2 + 20, attributeY + 35);

    attributeX += attackPillWidth + 10;

    // 防禦類型
    const defenseText = await smartTranslate(student.ArmorType);
    const defenseTextWidth = ctx.measureText(defenseText).width;
    const defensePillWidth = Math.max(120, defenseTextWidth + 80);

    ctx.fillStyle = '#2a2a2a';
    ctx.beginPath();
    ctx.roundRect(attributeX, attributeY, defensePillWidth, infoPillHeight, 20);
    ctx.fill();

    const armorColor = ARMOR_TYPE_COLORS[student.ArmorType] || '#ffffff';
    ctx.fillStyle = armorColor;
    ctx.beginPath();
    ctx.arc(attributeX + 25, attributeY + 25, 19, 0, 2 * Math.PI);
    ctx.fill();

    try {
      const defenseImage = await loadImage(`./public/type/Type_Defense.png`);
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(attributeX + 8, attributeY + 8, 34, 34, 6);
      ctx.clip();
      ctx.drawImage(defenseImage, attributeX + 12, attributeY + 12, 26, 26);
      ctx.restore();
    } catch (error) {
      console.error(`Failed to load defense type image:`, error);
    }

    ctx.font = 'bold 30px Nexon, "Noto Sans TC", "Noto Sans JP", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(defenseText, attributeX + defensePillWidth / 2 + 20, attributeY + 35);

    leftCurrentY += infoPillHeight + 20;

    // 學校和社團 (放在role下面)
    let schoolClubPillWidth = 0;
    if (student.School || student.Club) {
      const schoolName = student.School ? await smartTranslate(student.School) : '';
      const clubName = student.Club ? await smartTranslate(student.Club) : '';

      // 計算最大寬度（圖標寬度 + 文字寬度 + 間距）
      const iconWidth = 29 * 1.5; // 圖標寬度
      const iconPadding = 20; // 圖標與文字的間距
      const schoolTextWidth = ctx.measureText(schoolName).width;
      const clubTextWidth = ctx.measureText(clubName).width;
      const maxTextWidth = Math.max(iconWidth + schoolTextWidth, clubTextWidth);

      // 背景寬度 = 圖標寬度 + 間距 + 最長文字寬度 + 左右邊距
      schoolClubPillWidth = Math.max(160, iconWidth + iconPadding + maxTextWidth - 40);

      ctx.fillStyle = '#2a2a2a';
      ctx.beginPath();
      ctx.roundRect(leftColumnX, leftCurrentY, schoolClubPillWidth, infoPillHeight * 2 + 10, 20);
      ctx.fill();

      // 嘗試載入學校圖標
      if (student.School) {
        try {
          const schoolIcon = await loadImage(`https://schaledb.com/images/schoolicon/${student.School}.png`);
          const iconWidth = 29 * 1.5;
          const iconHeight = 26 * 1.5;
          ctx.save();
          ctx.beginPath();
          ctx.roundRect(leftColumnX + 10, leftCurrentY + 10, iconWidth, iconHeight, 6);
          ctx.clip();
          ctx.drawImage(schoolIcon, leftColumnX + 5, leftCurrentY + 5, iconWidth, iconHeight);
          ctx.restore();
        } catch (error) {
          console.error(`Failed to load school icon for ${student.School}:`, error);
        }
      }

      ctx.font = 'bold 30px Nexon, "Noto Sans TC", "Noto Sans JP", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'left';

      // 第一行：學校名稱
      if (schoolName) {
        ctx.fillText(schoolName, leftColumnX + 52.5, leftCurrentY + 35);
      }

      // 第二行：社團名稱（放在圖標下方）
      if (clubName) {
        ctx.fillText(clubName, leftColumnX + 10, leftCurrentY + infoPillHeight + 35);
      }

      leftCurrentY += infoPillHeight * 2 + 30;
    } else {
      leftCurrentY += 20;
    }

    // 第三個區塊 - 地形適應性 (放在school club後面)
    const terrainIconSize = 51;
    const adaptIconSize = 45;
    const terrainSpacing = 65;
    const terrainStartX = leftColumnX + schoolClubPillWidth + 20; // 調整間距，更靠近school club
    const terrainY = leftCurrentY - infoPillHeight - 80; // 往上移動20px

    // 獲取武器地形適應性資訊
    const weaponAdaptationType = student.Weapon?.AdaptationType;
    const weaponAdaptationValue = student.Weapon?.AdaptationValue || 0;

    // 定義三種地形及其對應的適應性等級
    const terrains = [
      {
        name: 'Street',
        image: 'Terrain_Street.png',
        x: terrainStartX,
        baseAdaptation: student.StreetBattleAdaptation || 0,
      },
      {
        name: 'Outdoor',
        image: 'Terrain_Outdoor.png',
        x: terrainStartX + terrainSpacing,
        baseAdaptation: student.OutdoorBattleAdaptation || 0,
      },
      {
        name: 'Indoor',
        image: 'Terrain_Indoor.png',
        x: terrainStartX + terrainSpacing * 2,
        baseAdaptation: student.IndoorBattleAdaptation || 0,
      },
    ];

    // 繪製三種地形
    for (const terrain of terrains) {
      // 計算這個地形的適應性等級
      let finalAdaptation = terrain.baseAdaptation;
      const isEnhanced = weaponAdaptationType === terrain.name && weaponAdaptationValue > 0 && starGrade >= 8;

      if (isEnhanced) {
        // 如果武器強化了此地形，且達到8星，則添加適應性數值
        finalAdaptation = terrain.baseAdaptation + weaponAdaptationValue;
      }

      // 地形背景條
      ctx.fillStyle = '#2a2a2a';
      ctx.beginPath();
      ctx.roundRect(terrain.x - 5, terrainY - 5, terrainIconSize + 10, terrainIconSize + adaptIconSize + 15, 8);
      ctx.fill();

      // 地形圖標
      try {
        const terrainImage = await loadImage(`./public/terrain/${terrain.image}`);
        ctx.drawImage(terrainImage, terrain.x, terrainY, terrainIconSize, terrainIconSize);
      } catch (error) {
        console.error(`Failed to load ${terrain.name} terrain image:`, error);
      }

      // 適應性等級圖標
      try {
        const adaptImage = await loadImage(`./public/terrain/Adaptresult${finalAdaptation}.png`);
        ctx.drawImage(adaptImage, terrain.x + 2, terrainY + terrainIconSize + 5, adaptIconSize, adaptIconSize);
      } catch (error) {
        console.error(`Failed to load ${terrain.name} adapt image:`, error);
      }
    }

    // 第四個區塊 - 裝備系統 (跨越整個右側區域)
    leftCurrentY += 40; // 增加間距，整體往下移動15px

    // 裝備系統面板
    const equipmentPanelHeight = 140;
    ctx.beginPath();
    ctx.roundRect(leftColumnX, leftCurrentY, columnWidth, equipmentPanelHeight, 15);
    ctx.fill();

    // 繪製武器資訊 (左側)
    const weaponIconWidth = 320; // 武器圖標寬度，恢復原始大小
    const weaponIconHeight = 82; // 武器圖標高度，恢復原始大小
    const weaponX = leftColumnX;
    const weaponY = leftCurrentY + 20;

    // 6星解鎖專屬武器
    if (starGrade >= 6 && student.Weapon) {
      // 嘗試載入專屬武器圖標
      try {
        const weaponImage = await loadImage(`https://schaledb.com/images/weapon/${student.WeaponImg}.webp`);
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(weaponX, weaponY, weaponIconWidth, weaponIconHeight, 12);
        ctx.clip();
        ctx.drawImage(weaponImage, weaponX - 15, weaponY, weaponIconWidth, weaponIconHeight);
        ctx.restore();
      } catch (error) {
        // 如果載入失敗，顯示武器名稱
        console.error(`Failed to load weapon for ${studentId}:`, error);
        ctx.font = 'bold 24px Nexon, "Noto Sans TC", "Noto Sans JP", sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText(student.Weapon.Name || 'WEAPON', weaponX + weaponIconWidth / 2 - 15, weaponY + weaponIconHeight / 2 + 4);
      }
    } else {
      // 6星以下顯示EMPTY
      ctx.font = 'italic bold 30px Nexon, "Noto Sans TC", "Noto Sans JP", sans-serif';
      ctx.fillStyle = '#2a2a2a';
      ctx.textAlign = 'center';
      ctx.fillText('EMPTY', weaponX + weaponIconWidth / 2 - 15, weaponY + weaponIconHeight / 2 + 4); // 文字往右移動為圖標留空間
    }

    // 武器類型文字和等級
    ctx.font = 'italic bold 32px Nexon, "Noto Sans TC", "Noto Sans JP", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';

    // 構建顯示文字
    let weaponText = `${student.WeaponType} / ${student.Position}`;

    // 6星以上且有武器時，在 Position 後面添加武器等級
    if (starGrade >= 6 && student.Weapon) {
      const maxLevel = getMaxWeaponLevel(starGrade);
      weaponText += ` Lv.${weaponLevel}/${maxLevel}`;

      // 分兩部分繪製以實現不同顏色
      const baseText = `${student.WeaponType} / ${student.Position} `;
      const levelText = `Lv.${weaponLevel}/${maxLevel}`;

      // 測量基礎文字寬度
      const baseTextWidth = ctx.measureText(baseText).width;
      ctx.font = 'bold 24px Nexon, "Noto Sans TC", "Noto Sans JP", sans-serif';
      const totalTextWidth = ctx.measureText(weaponText).width;

      // 計算起始位置（居中對齊）
      const startX = weaponX + weaponIconWidth / 2 - 15 - totalTextWidth / 2 - 7.5;

      // 繪製基礎文字
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'left';
      ctx.font = 'italic bold 32px Nexon, "Noto Sans TC", "Noto Sans JP", sans-serif';
      ctx.fillText(baseText, startX, weaponY + weaponIconHeight + 25);

      ctx.fillStyle = '#cccccc';
      ctx.font = 'bold 24px Nexon, "Noto Sans TC", "Noto Sans JP", sans-serif';
      ctx.fillText(levelText, startX + baseTextWidth + 7.5, weaponY + weaponIconHeight + 25);
    } else {
      // 沒有武器時只顯示基礎文字
      ctx.fillText(weaponText, weaponX + weaponIconWidth / 2 - 15, weaponY + weaponIconHeight + 25);
    }

    // 繪製分隔線
    const separatorX = weaponX + weaponIconWidth - 15;
    const separatorY = leftCurrentY + 10;
    const separatorHeight = equipmentPanelHeight - 20;

    ctx.fillStyle = '#666666';
    ctx.fillRect(separatorX, separatorY, 2, separatorHeight);

    // 繪製裝備圖標 (右側，放大)
    const equipmentIconWidth = 90 * 1.1; // 裝備圖標寬度，變大
    const equipmentIconHeight = 72 * 1.1; // 裝備圖標高度，變大
    const equipmentSpacing = 85; // 進一步減少間距
    const equipmentStartX = leftColumnX + weaponIconWidth - 10; // 放到專屬武器右邊，調整間距
    const equipmentY = leftCurrentY + 35;

    // 根據角色實際裝備數據繪製三個裝備
    for (let i = 0; i < 3; i++) {
      const equipmentType = student.Equipment && student.Equipment[i] ? student.Equipment[i] : 'Unknown';
      const equipmentLevel = i === 0 ? equipment1Level : i === 1 ? equipment2Level : equipment3Level;
      const equipmentX = equipmentStartX + equipmentSpacing * i;

      // 裝備背景
      ctx.fillStyle = '#545b5e';
      ctx.beginPath();
      ctx.arc(equipmentX + equipmentIconWidth / 2, equipmentY + equipmentIconHeight / 2, Math.min(equipmentIconWidth, equipmentIconHeight) / 2, 0, 2 * Math.PI);
      ctx.fill();

      if (equipmentLevel === 0) {
        // 如果裝備等級為0，顯示EMPTY
        ctx.save();
        ctx.beginPath();
        ctx.arc(equipmentX + equipmentIconWidth / 2, equipmentY + equipmentIconHeight / 2, Math.min(equipmentIconWidth, equipmentIconHeight) / 2 - 5, 0, 2 * Math.PI);
        ctx.clip();
        ctx.fillRect(equipmentX + 5, equipmentY + 5, equipmentIconWidth - 10, equipmentIconHeight - 10);
        ctx.font = 'italic bold 20px Nexon, "Noto Sans TC", "Noto Sans JP", sans-serif';
        ctx.fillStyle = '#2a2a2a';
        ctx.textAlign = 'center';
        ctx.fillText('EMPTY', equipmentX + equipmentIconWidth / 2 - 2, equipmentY + equipmentIconHeight / 2 + 6);
        ctx.restore();
      } else {
        // 嘗試載入裝備圖標
        try {
          const equipmentImage = await loadImage(`https://schaledb.com/images/equipment/icon/equipment_icon_${equipmentType.toLowerCase()}_tier${equipmentLevel}.webp`);
          ctx.save();
          ctx.beginPath();
          ctx.arc(equipmentX + equipmentIconWidth / 2, equipmentY + equipmentIconHeight / 2, Math.min(equipmentIconWidth, equipmentIconHeight) / 2 - 5, 0, 2 * Math.PI);
          ctx.clip();
          ctx.drawImage(equipmentImage, equipmentX + 5, equipmentY + 5, equipmentIconWidth - 10, equipmentIconHeight - 10);
          ctx.restore();
        } catch (error) {
          // 如果載入失敗，顯示裝備類型名稱
          ctx.font = 'bold 30px Nexon, "Noto Sans TC", "Noto Sans JP", sans-serif'; // 放大字體
          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'center';
          ctx.fillText(equipmentType, equipmentX + equipmentIconWidth / 2, equipmentY + equipmentIconHeight / 2 + 4);
        }

        // 裝備等級
        ctx.font = 'bold 32px Nexon, "Noto Sans TC", "Noto Sans JP", sans-serif'; // 放大字體
        ctx.fillStyle = '#cccccc';
        ctx.textAlign = 'center';
        ctx.fillText(`T${equipmentLevel}`, equipmentX + equipmentIconWidth / 2, equipmentY + equipmentIconHeight + 20);
      }
    }

    // 專屬裝備
    const exclusiveEquipmentX = equipmentStartX + equipmentSpacing * 3 + 10;

    // 專屬裝備背景
    ctx.fillStyle = '#545b5e';
    ctx.beginPath();
    ctx.arc(exclusiveEquipmentX + equipmentIconWidth / 2, equipmentY + equipmentIconHeight / 2, Math.min(equipmentIconWidth, equipmentIconHeight) / 2, 0, 2 * Math.PI);
    ctx.fill();

    // 檢查是否有專屬裝備且羈絆等級達到15等
    if (student.Gear && Object.keys(student.Gear).length > 0 && favorLevel >= 15) {
      // 嘗試載入專屬裝備圖標
      try {
        const exclusiveEquipmentImage = await loadImage(`https://schaledb.com/images/gear/icon/${studentId}.webp`);
        ctx.save();
        ctx.beginPath();
        ctx.arc(exclusiveEquipmentX + equipmentIconWidth / 2, equipmentY + equipmentIconHeight / 2, Math.min(equipmentIconWidth, equipmentIconHeight) / 2 - 5, 0, 2 * Math.PI);
        ctx.clip();
        ctx.drawImage(exclusiveEquipmentImage, exclusiveEquipmentX + 5, equipmentY + 5, equipmentIconWidth - 10, equipmentIconHeight - 10);
        ctx.restore();
      } catch (error) {
        // 如果載入失敗，顯示EMPTY
        console.error(`Failed to load exclusive equipment for ${studentId}:`, error);
        ctx.save();
        ctx.beginPath();
        ctx.arc(exclusiveEquipmentX + equipmentIconWidth / 2, equipmentY + equipmentIconHeight / 2, Math.min(equipmentIconWidth, equipmentIconHeight) / 2 - 5, 0, 2 * Math.PI);
        ctx.clip();
        ctx.fillRect(exclusiveEquipmentX + 5, equipmentY + 5, equipmentIconWidth - 10, equipmentIconHeight - 10);
        ctx.font = 'italic bold 20px Nexon, "Noto Sans TC", "Noto Sans JP", sans-serif';
        ctx.fillStyle = '#2a2a2a';
        ctx.textAlign = 'center';
        ctx.fillText('ERROR', exclusiveEquipmentX + equipmentIconWidth / 2 - 2, equipmentY + equipmentIconHeight / 2 + 6);
        ctx.restore();
      }

      // 專屬裝備等級顯示
      ctx.font = 'bold 32px Nexon, "Noto Sans TC", "Noto Sans JP", sans-serif';
      ctx.fillStyle = '#cccccc';
      ctx.textAlign = 'center';
      const gearTier = favorLevel >= 20 ? 'T2' : 'T1'; // 20等以上顯示T2，15-19等顯示T1
      ctx.fillText(gearTier, exclusiveEquipmentX + equipmentIconWidth / 2, equipmentY + equipmentIconHeight + 20);
    } else {
      // 如果沒有專屬裝備或羈絆等級不足15等，顯示EMPTY
      ctx.save();
      ctx.beginPath();
      ctx.arc(exclusiveEquipmentX + equipmentIconWidth / 2, equipmentY + equipmentIconHeight / 2, Math.min(equipmentIconWidth, equipmentIconHeight) / 2 - 5, 0, 2 * Math.PI);
      ctx.clip();
      ctx.fillRect(exclusiveEquipmentX + 5, equipmentY + 5, equipmentIconWidth - 10, equipmentIconHeight - 10);
      ctx.font = 'italic bold 20px Nexon, "Noto Sans TC", "Noto Sans JP", sans-serif';
      ctx.fillStyle = '#2a2a2a';
      ctx.textAlign = 'center';
      ctx.fillText('EMPTY', exclusiveEquipmentX + equipmentIconWidth / 2 - 2, equipmentY + equipmentIconHeight / 2 + 6);
      ctx.restore();
    }

    leftCurrentY += equipmentPanelHeight + 20;

    // 第五個區塊 - 屬性數值 (左欄)
    leftCurrentY += 30; // 增加間距，整體往下移動15px

    // 屬性數值面板
    const statsPanelHeight = 500; // 增加高度，拉長框
    ctx.fillStyle = '#2a2a2a';
    ctx.beginPath();
    ctx.roundRect(leftColumnX, leftCurrentY, columnWidth, statsPanelHeight, 15);
    ctx.fill();

    // 移除屬性標題，內容直接從頂部開始

    // 計算最終屬性值 (基礎值 + 羈絆加成 + 裝備基礎值 + 專屬裝備基礎值 + 專屬武器加成 + 地形適應性加成) × (1 + 裝備百分比加成 + 專屬裝備百分比加成)
    const calculateFinalStat = (
      baseValue: number,
      favorBonus: number,
      equipmentStat: { base: number; percent: number },
      gearStat: { base: number; percent: number },
      weaponBonus: number = 0,
      adaptationBonus: number = 0,
    ) => {
      return Math.floor((baseValue + favorBonus + equipmentStat.base + gearStat.base + weaponBonus + adaptationBonus) * (1 + equipmentStat.percent / 100 + gearStat.percent / 100));
    };

    // 計算百分比屬性值 (基礎值 + 裝備基礎值 + 專屬裝備基礎值) × (1 + 裝備百分比 + 專屬裝備百分比) / 100
    const calculateFinalPercentStat = (baseValue: number, equipmentStat: { base: number; percent: number }, gearStat: { base: number; percent: number }) => {
      return ((baseValue + equipmentStat.base + gearStat.base) * (1 + equipmentStat.percent / 100 + gearStat.percent / 100)) / 100;
    };

    // 定義屬性列表（包含羈絆加成、裝備加成、專屬裝備加成、專屬武器加成和地形適應性加成）
    const stats = [
      { name: '生命值', value: calculateFinalStat(levelStats.MaxHP, favorStats.MaxHP, equipmentStats.MaxHP, gearStats.MaxHP, weaponStats.MaxHP, adaptationStats.MaxHP), icon: 'MaxHP' },
      {
        name: '攻擊力',
        value: calculateFinalStat(levelStats.AttackPower, favorStats.AttackPower, equipmentStats.AttackPower, gearStats.AttackPower, weaponStats.AttackPower, adaptationStats.AttackPower),
        icon: 'AttackPower',
      },
      {
        name: '防禦力',
        value: calculateFinalStat(levelStats.DefensePower, favorStats.DefensePower, equipmentStats.DefensePower, gearStats.DefensePower, weaponStats.DefensePower, adaptationStats.DefensePower),
        icon: 'DefensePower',
      },
      {
        name: '治癒力',
        value: calculateFinalStat(levelStats.HealPower, favorStats.HealPower, equipmentStats.HealPower, gearStats.HealPower, weaponStats.HealPower, adaptationStats.HealPower),
        icon: 'HealPower',
      },
      { name: '命中值', value: calculateFinalStat(student.AccuracyPoint || 0, 0, equipmentStats.AccuracyPoint, gearStats.AccuracyPoint), icon: 'AccuracyPoint' },
      { name: '迴避值', value: calculateFinalStat(student.DodgePoint || 0, 0, equipmentStats.DodgePoint, gearStats.DodgePoint), icon: 'DodgePoint' },
      { name: '暴擊值', value: calculateFinalStat(student.CriticalPoint || 0, 0, equipmentStats.CriticalPoint, gearStats.CriticalPoint), icon: 'CriticalPoint' },
      {
        name: '暴擊抵抗值',
        value: calculateFinalStat(student.CriticalChanceResistPoint || 100, 0, equipmentStats.CriticalChanceResistPoint, gearStats.CriticalChanceResistPoint),
        icon: 'CriticalChanceResistPoint',
      },
      { name: '暴擊傷害', value: `${formatPercentage(calculateFinalPercentStat(20000, equipmentStats.CriticalDamageRate, gearStats.CriticalDamageRate))}`, icon: 'CriticalDamageRate' },
      {
        name: '暴擊傷害抵抗率',
        value: `${formatPercentage(calculateFinalPercentStat(5000, equipmentStats.CriticalDamageResistRate, gearStats.CriticalDamageResistRate))}`,
        icon: 'CriticalDamageResistRate',
      },
      { name: '穩定值', value: student.StabilityPoint || 1400, icon: 'StabilityPoint' },
      { name: '射程', value: student.Range || 650, icon: 'Range' },
      { name: '群控強化力', value: calculateFinalStat(student.OppressionPower || 108, 0, equipmentStats.OppressionPower, gearStats.OppressionPower), icon: 'OppressionPower' },
      { name: '群控抵抗力', value: calculateFinalStat(student.OppressionResist || 100, 0, equipmentStats.OppressionResist, gearStats.OppressionResist), icon: 'OppressionResist' },
      { name: '防禦無視值', value: student.DefensePenetration || 0, icon: 'DefensePenetration' },
      { name: '載彈量', value: `${student.AmmoCount || '15'} (${student.AmmoCost || '3'})`, icon: 'AmmoCount' },
    ];

    // 繪製屬性網格
    const statsPerRow = 2; // 每行兩個屬性
    const statHeight = 45;
    const statSpacing = 15;
    const statIconSize = 35; // 增大圖標尺寸
    const startY = leftCurrentY + 10; // 往上移動，從頂部開始

    ctx.font = 'bold 30px Nexon, "Noto Sans TC", "Noto Sans JP", sans-serif';
    ctx.textAlign = 'left';

    for (let index = 0; index < stats.length; index++) {
      const stat = stats[index];
      const row = Math.floor(index / statsPerRow);
      const col = index % statsPerRow;
      const x = leftColumnX + 15 + col * (columnWidth / 2); // 往左移動
      const y = startY + row * (statHeight + statSpacing);

      // 繪製屬性圖標（往左移動）
      await drawStatIcon(ctx, x - 10, y + statHeight / 2 - statIconSize / 2, statIconSize, stat.icon);

      // 繪製屬性名稱（左側）
      ctx.fillStyle = '#cccccc'; // 偏好屬性顯示金色
      ctx.textAlign = 'left';
      ctx.fillText(stat.name, x + statIconSize - 5, y + 35);

      // 繪製屬性數值（右側）
      ctx.fillStyle = '#ffffff'; // 偏好屬性顯示金色
      ctx.textAlign = 'right';
      ctx.fillText(stat.value.toString(), x + (columnWidth / 2 - 25), y + 35);
    }

    // 第六個區塊 - 技能詳細信息 (右欄，整體往下並拉長)
    // 先計算所有技能卡片的總高度
    let totalSkillHeight = 0;
    const skillCardSpacing = 20; // 增加技能卡片間距

    // 提前定義專屬裝備檢查邏輯
    const hasGearEquipped = student.Gear && Object.keys(student.Gear).length > 0 && favorLevel >= 15;
    // 技能替換需要20等，屬性加成只需要15等
    const hasSkillUpgrade = student.Gear && Object.keys(student.Gear).length > 0 && favorLevel >= 20;
    const publicSkill = hasSkillUpgrade && student.Skills.GearPublic ? student.Skills.GearPublic : student.Skills.Public;

    if (student.Skills) {
      // EX技能 - 先不使用縮放計算原始高度
      if (student.Skills.Ex) {
        const exSkillHeight = await calculateSkillCardHeight(ctx, columnWidth - 40, student.Skills.Ex, exSkillLevel, 1);
        totalSkillHeight += exSkillHeight + skillCardSpacing;
      }

      // 基本技能 - 使用專屬裝備檢查結果
      if (publicSkill) {
        const publicSkillHeight = await calculateSkillCardHeight(ctx, columnWidth - 40, publicSkill, publicSkillLevel, 1);
        totalSkillHeight += publicSkillHeight + skillCardSpacing;
      }

      // 強化技能 (7星可能被WeaponPassive替換)
      const passiveSkillForCalc = starGrade >= 7 && student.WeaponPassive ? student.WeaponPassive : student.Skills.Passive;
      if (passiveSkillForCalc) {
        const passiveSkillHeight = await calculateSkillCardHeight(ctx, columnWidth - 40, passiveSkillForCalc, passiveSkillLevel, 1);
        totalSkillHeight += passiveSkillHeight + skillCardSpacing;
      }

      // 子技能
      if (student.Skills.ExtraPassive) {
        const extraPassiveSkillHeight = await calculateSkillCardHeight(ctx, columnWidth - 40, student.Skills.ExtraPassive, extraPassiveSkillLevel, 1);
        totalSkillHeight += extraPassiveSkillHeight;
      }
    }

    // 計算技能面板高度，根據技能實際高度動態調整，但要限制在畫布範圍内
    const canvasHeight = 1200; // 畫布總高度
    const skillPanelStartY = rightCurrentY + 20; // 技能面板起始Y位置
    const maxAvailableHeight = canvasHeight - skillPanelStartY - 10; // 減去底部邊距

    const minSkillPanelHeight = 400; // 設定最小高度
    const actualSkillHeight = totalSkillHeight + 20; // 30px 為上下邊距（從60改為30）

    // 確保技能面板高度不超過可用空間
    const skillPanelHeight = Math.min(Math.max(minSkillPanelHeight, actualSkillHeight), maxAvailableHeight);

    // 技能詳細面板 - 往上移動到緊貼學生資訊區域
    ctx.fillStyle = '#2a2a2a';
    ctx.beginPath();
    ctx.roundRect(rightColumnX, rightCurrentY - 10, columnWidth, skillPanelHeight, 15);
    ctx.fill();

    // 繪製技能卡片 - 往上移動
    let skillY = rightCurrentY + 10; // 技能卡片起始位置往上移動

    if (student.Skills) {
      // 計算技能數量和收集技能信息
      let skillCount = 0;
      const skillsInfo = [];
      if (student.Skills.Ex) {
        skillCount++;
        skillsInfo.push({ skill: student.Skills.Ex, type: 'EX技能', level: exSkillLevel, cost: null });
      }
      // 使用前面已定義的專屬裝備檢查結果

      if (publicSkill) {
        skillCount++;
        skillsInfo.push({ skill: publicSkill, type: '基本技能', level: publicSkillLevel, cost: null });
      }
      // 7星解鎖WeaponPassive替換Passive技能
      const passiveSkill = starGrade >= 7 && student.WeaponPassive ? student.WeaponPassive : student.Skills.Passive;
      const passiveSkillType = starGrade >= 7 && student.WeaponPassive ? '武器強化技能' : '強化技能';

      if (passiveSkill) {
        skillCount++;
        skillsInfo.push({ skill: passiveSkill, type: passiveSkillType, level: passiveSkillLevel, cost: null });
      }
      if (student.Skills.ExtraPassive) {
        skillCount++;
        skillsInfo.push({ skill: student.Skills.ExtraPassive, type: '子技能', level: extraPassiveSkillLevel, cost: null });
      }

      // 計算EX技能的COST
      if (student.Skills.Ex && student.Skills.Ex.Cost && student.Skills.Ex.Cost.length > 0) {
        const costIndex = Math.min(exSkillLevel - 1, student.Skills.Ex.Cost.length - 1);
        skillsInfo[0].cost = student.Skills.Ex.Cost[costIndex] || student.Skills.Ex.Cost[0];
      }

      // 設定上下間隔相同
      const topBottomMargin = 15; // 上下間隔各15px，總共30px
      const availableHeight = skillPanelHeight - topBottomMargin * 2; // 減去上下邊距
      const skillsStartY = rightCurrentY - 10 + topBottomMargin; // 技能卡片起始位置，確保上間隔為15px

      // 智能空間分配算法
      let optimalFontScale = 1;
      let optimalSpacing = skillCardSpacing;

      // 智能搜索最佳縮放和間距組合
      let bestScale = 0.8; // 設定最小默認值
      let bestSpacing = 4;
      let found = false;

      for (let testSpacing = skillCardSpacing; testSpacing >= 10; testSpacing -= 5) {
        // 從大到小嘗試縮放比例
        for (let testScale = 1.2; testScale >= 0.6; testScale -= 0.1) {
          // 使用更大的步長提高性能
          // 計算所有技能在此縮放比例下的實際高度
          let testTotalHeight = 0;
          let calculationError = false;

          try {
            for (const skillInfo of skillsInfo) {
              const testHeight = await calculateSkillCardHeight(ctx, columnWidth - 40, skillInfo.skill, skillInfo.level, testScale);
              testTotalHeight += testHeight;
            }
          } catch (error) {
            console.error(`計算高度時出錯 (scale: ${testScale}):`, error);
            calculationError = true;
            continue;
          }

          if (!calculationError) {
            const fixedSpacingHeight = (skillCount - 1) * testSpacing;
            const totalRequiredHeight = testTotalHeight + fixedSpacingHeight;

            if (totalRequiredHeight <= availableHeight) {
              // 只有當新的縮放比例更大時才更新，或間距更大時才更新
              if (testScale > bestScale || (testScale === bestScale && testSpacing > bestSpacing)) {
                bestScale = testScale;
                bestSpacing = testSpacing;
                found = true;
              }
            }
          }
        }

        // 如果已經找到合適的組合，就停止搜索更小的間距
        if (found) break;
      }

      // 使用找到的最佳組合
      optimalFontScale = bestScale;
      optimalSpacing = bestSpacing;

      // 確保最小值
      if (optimalFontScale < 0.6) {
        optimalFontScale = 0.6;
        optimalSpacing = 10;
      }

      skillY = skillsStartY;

      // 計算每個技能的實際分配高度 - 使用正確的縮放比例
      let skillIndex = 0;
      const skillHeights = [];
      let totalScaledHeight = 0;
      for (const skillInfo of skillsInfo) {
        // 計算原始高度作為對比
        const originalHeight = await calculateSkillCardHeight(ctx, columnWidth - 40, skillInfo.skill, skillInfo.level, 1);
        // 使用縮放比例重新計算高度，確保與實際渲染一致
        const scaledHeight = await calculateSkillCardHeight(ctx, columnWidth - 40, skillInfo.skill, skillInfo.level, optimalFontScale);
        skillHeights.push(scaledHeight);
        totalScaledHeight += scaledHeight;
      }

      // 驗證總高度並重新分配剩餘空間
      const totalWithSpacing = totalScaledHeight + (skillCount - 1) * optimalSpacing;

      // 計算剩餘空間並增加卡片間距
      const remainingSpace = availableHeight - totalScaledHeight;
      let finalSpacing = optimalSpacing;

      if (skillCount > 1 && remainingSpace > (skillCount - 1) * optimalSpacing) {
        // 如果有剩餘空間，將其分配給卡片間距
        const extraSpace = remainingSpace - (skillCount - 1) * optimalSpacing;
        const additionalSpacing = Math.floor(extraSpace / (skillCount - 1));
        finalSpacing = optimalSpacing + additionalSpacing;
      }

      // 繪製技能卡片
      skillIndex = 0;

      // EX技能
      if (student.Skills.Ex) {
        const skillHeight = skillHeights[skillIndex];
        const exSkillHeight = await drawSkillCard(
          ctx,
          rightColumnX + 20,
          skillY,
          columnWidth - 40,
          student.Skills.Ex,
          'EX技能',
          skillsInfo[skillIndex].cost,
          BULLET_TYPE_COLORS[student.BulletType],
          exSkillLevel,
          1, // 移除整體縮放，改用個別調整
          skillHeight, // 使用計算出的實際高度
          optimalFontScale, // 傳遞字體縮放比例
        );
        skillY += skillHeight + finalSpacing;
        skillIndex++;
      }

      // 基本技能 - 檢查是否使用專屬裝備技能
      if (publicSkill) {
        const skillHeight = skillHeights[skillIndex];
        const publicSkillHeight = await drawSkillCard(
          ctx,
          rightColumnX + 20,
          skillY,
          columnWidth - 40,
          publicSkill,
          '基本技能',
          null,
          BULLET_TYPE_COLORS[student.BulletType],
          publicSkillLevel,
          1, // 移除整體縮放，改用個別調整
          skillHeight, // 使用計算出的實際高度
          optimalFontScale, // 傳遞字體縮放比例
        );
        skillY += skillHeight + finalSpacing;
        skillIndex++;
      }

      // 強化技能 (7星可能被WeaponPassive替換)
      if (passiveSkill) {
        const skillHeight = skillHeights[skillIndex];
        const passiveSkillHeight = await drawSkillCard(
          ctx,
          rightColumnX + 20,
          skillY,
          columnWidth - 40,
          passiveSkill,
          passiveSkillType,
          null,
          BULLET_TYPE_COLORS[student.BulletType],
          passiveSkillLevel,
          1, // 移除整體縮放，改用個別調整
          skillHeight, // 使用計算出的實際高度
          optimalFontScale, // 傳遞字體縮放比例
        );
        skillY += skillHeight + finalSpacing;
        skillIndex++;
      }

      // 子技能
      if (student.Skills.ExtraPassive) {
        const skillHeight = skillHeights[skillIndex];
        await drawSkillCard(
          ctx,
          rightColumnX + 20,
          skillY,
          columnWidth - 40,
          student.Skills.ExtraPassive,
          '子技能',
          null,
          BULLET_TYPE_COLORS[student.BulletType],
          extraPassiveSkillLevel,
          1,
          skillHeight, // 使用計算出的實際高度
          optimalFontScale, // 傳遞字體縮放比例
        );
      }
    }

    return canvas.toBuffer('image/png');
  } catch (error) {
    console.error('[Error] drawStudentDetailImage', error);
    return null;
  }
}

// 生成圖標URL的輔助函數
function generateIconUrl(iconType: string, iconKey: string, skillType: string): string {
  const iconTypeMap: Record<string, string> = {
    buff: 'Buff',
    debuff: 'Debuff',
    cc: 'CC',
    status: 'Special',
  };

  const iconPrefix = iconTypeMap[iconType] || 'Buff';

  // 清理 iconKey：移除 ='文字' 格式的後綴
  let cleanedIconKey = iconKey;
  if (cleanedIconKey.includes("='")) {
    cleanedIconKey = cleanedIconKey.split("='")[0];
  }

  // 處理 status 類型的特殊情況，根據技能類型添加對應後綴
  if (iconType == 'status') {
    // 根據中文技能類型決定英文後綴
    const skillTypeSuffix = skillType === '基本技能' ? '_Public' : skillType === '子技能' ? '_ExtraPassive' : skillType === 'EX技能' ? '' : skillType === '強化技能' ? '_Passive' : '';

    // 如果 cleanedIconKey 已經包含後綴，則使用原值，否則添加對應後綴
    const finalIconKey = cleanedIconKey.includes('_') ? cleanedIconKey : `${cleanedIconKey}${skillTypeSuffix}`;
    return `https://schaledb.com/images/buff/Special_${finalIconKey}.webp`;
  } else {
    return `https://schaledb.com/images/buff/${iconPrefix}_${cleanedIconKey}.webp`;
  }
}

// 繪製技能圖標的輔助函數
async function drawSkillIcon(ctx: any, iconType: string, iconKey: string, currentX: number, currentY: number, skillType: string): Promise<number> {
  try {
    const iconUrl = generateIconUrl(iconType, iconKey, skillType);
    const iconImage = await loadImage(iconUrl);
    const iconWidth = 19 * 1.3; // 固定大小，不縮放
    const iconHeight = 22 * 1.3; // 固定大小，不縮放
    ctx.drawImage(iconImage, currentX, currentY - iconHeight + 5, iconWidth, iconHeight);
    return iconWidth + 5; // 返回圖標寬度 + 間距
  } catch (error) {
    if (iconType === 'status') {
      try {
        let cleanedIconKey = iconKey;
        if (cleanedIconKey.includes("='")) {
          cleanedIconKey = cleanedIconKey.split("='")[0];
        }

        const fallbackUrl = `https://schaledb.com/images/buff/Special_${cleanedIconKey}.webp`;
        const fallbackImage = await loadImage(fallbackUrl);
        const iconWidth = 19 * 1.3;
        const iconHeight = 22 * 1.3;
        ctx.drawImage(fallbackImage, currentX, currentY - iconHeight + 5, iconWidth, iconHeight);
        return iconWidth + 5;
      } catch (fallbackError) {
        console.error(`無法載入圖標: ${iconType}_${iconKey}`);
        return 0;
      }
    }
    console.error(`無法載入圖標: ${iconType}_${iconKey}`);
    return 0;
  }
}

// 獲取圖標寬度的輔助函數（與drawSkillIcon保持一致）
function getIconWidth(): number {
  return 19 * 1.3 + 5; // 圖標寬度 + 間距，與drawSkillIcon中的計算保持一致
}

// 計算包含圖標的文字寬度的輔助函數
function measureTextWithIcons(ctx: any, text: string, fontScaleRatio: number = 1): number {
  let measureText = text;

  // 處理被轉換的換行符，將其還原為空格
  measureText = measureText.replace(/\\n/g, ' ');

  // 處理圖標占位符 - 使用更精確的正則表達式
  const iconRegex = /__ICON_(buff|debuff|status|cc)_([^_]+)_([^*]+?)__/g;
  let match;

  while ((match = iconRegex.exec(measureText)) !== null) {
    const [, , , textPart] = match;
    // 用占位字符替換圖標，寬度等於圖標實際寬度
    const iconPlaceholder = '□'.repeat(Math.ceil(getIconWidth() / 12)); // 約12px每個□字符
    measureText = measureText.replace(match[0], textPart + iconPlaceholder);
  }

  return measureTextWithSpecialSymbols(ctx, measureText, fontScaleRatio);
}

// 智能換行函數，考慮圖標和特殊標記
async function wrapTextWithIcons(ctx: any, text: string, maxWidth: number, fontScaleRatio: number = 1): Promise<string[]> {
  const lines: string[] = [];
  const words = text.split(' ');
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine + (currentLine ? ' ' : '') + word;
    const lineWidth = measureTextWithIcons(ctx, testLine, fontScaleRatio);

    if (lineWidth <= maxWidth) {
      currentLine = testLine;
    } else {
      if (currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        // 單個詞就超過寬度，強制換行
        lines.push(word);
      }
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

// 正確處理格式化文本的函數
async function drawFormattedLine(ctx: any, line: string, startX: number, y: number, iconColor: string, fontScaleRatio: number, skillType: string): Promise<number> {
  let currentX = startX;
  let processedText = line;

  // 處理被轉換的換行符，將其還原為空格
  processedText = processedText.replace(/\\n/g, ' ');

  // 步驟1：找到所有 **__ICON_....__** 模式並替換為臨時標記
  const iconMatches: Array<{ placeholder: string; original: string; iconType: string; iconKey: string; text: string }> = [];
  let iconCounter = 0;

  // 使用更精確的正則表達式來避免貪婪匹配問題
  processedText = processedText.replace(/\*\*__ICON_(buff|debuff|status|cc)_([^_]+)_([^*]+?)__\*\*/g, (match, iconType, iconKey, text) => {
    const placeholder = `__TEMP_ICON_${iconCounter}__`;
    iconMatches.push({
      placeholder,
      original: match,
      iconType,
      iconKey,
      text,
    });
    iconCounter++;
    return placeholder;
  });

  // 步驟2：處理剩餘的 ** 標記（用於粗體）
  const parts = processedText.split('**');

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    // 步驟3：還原圖標標記並處理
    let currentPart = part;
    for (const iconMatch of iconMatches) {
      if (currentPart.includes(iconMatch.placeholder)) {
        currentPart = currentPart.replace(iconMatch.placeholder, iconMatch.original);
      }
    }

    if (i % 2 === 0) {
      // 普通文字 - 檢查是否包含圖標
      let lastIndex = 0;

      // 使用更精確的正則表達式來匹配圖標
      const iconRegex = /\*\*__ICON_(buff|debuff|status|cc)_([^_]+)_([^*]+?)__\*\*/g;
      let match;

      // 使用 while 循環和 exec 來避免 matchAll 的狀態問題
      while ((match = iconRegex.exec(currentPart)) !== null) {
        // 繪製圖標前的普通文字
        if (match.index > lastIndex) {
          const normalText = currentPart.substring(lastIndex, match.index);
          if (normalText) {
            const boldParts = normalText.split('__BOLD_');
            for (let k = 0; k < boldParts.length; k++) {
              if (k % 2 === 0) {
                const textWidth = drawTextWithSpecialSymbols(ctx, boldParts[k], currentX, y, '#cccccc', fontScaleRatio);
                currentX += textWidth;
              } else {
                const boldText = boldParts[k].replace('__', '');
                ctx.font = `bold ${Math.floor(24 * fontScaleRatio)}px Nexon, "Noto Sans TC", "Noto Sans JP", sans-serif`;
                ctx.fillStyle = '#cccccc';
                ctx.fillText(boldText, currentX, y);
                currentX += ctx.measureText(boldText).width;
              }
            }
          }
        }

        // 繪製圖標
        const [, iconType, iconKey, text] = match;
        const iconWidth = await drawSkillIcon(ctx, iconType, iconKey, currentX, y, skillType);
        currentX += iconWidth;

        // 繪製圖標文字
        ctx.font = `bold ${Math.floor(24 * fontScaleRatio)}px Nexon, "Noto Sans TC", "Noto Sans JP", sans-serif`;
        if (iconType === 'buff') {
          ctx.fillStyle = 'rgb(255, 79, 50)';
        } else if (iconType === 'debuff') {
          ctx.fillStyle = 'rgb(63, 158, 238)';
        } else if (iconType === 'cc') {
          ctx.fillStyle = 'rgb(174, 106, 247)';
        } else if (iconType === 'status') {
          ctx.fillStyle = 'rgb(255, 203, 51)';
        } else {
          ctx.fillStyle = iconColor;
        }
        ctx.fillText(text, currentX, y);
        currentX += ctx.measureText(text).width;

        lastIndex = match.index + match[0].length;
      }

      // 繪製剩餘的普通文字
      if (lastIndex < currentPart.length) {
        const remainingText = currentPart.substring(lastIndex);
        if (remainingText) {
          const boldParts = remainingText.split('__BOLD_');
          for (let k = 0; k < boldParts.length; k++) {
            if (k % 2 === 0) {
              const textWidth = drawTextWithSpecialSymbols(ctx, boldParts[k], currentX, y, '#cccccc', fontScaleRatio);
              currentX += textWidth;
            } else {
              const boldText = boldParts[k].replace('__', '');
              ctx.font = `bold ${Math.floor(24 * fontScaleRatio)}px Nexon, "Noto Sans TC", "Noto Sans JP", sans-serif`;
              ctx.fillStyle = '#cccccc';
              ctx.fillText(boldText, currentX, y);
              currentX += ctx.measureText(boldText).width;
            }
          }
        }
      }
    } else {
      // 粗體文字（在**之間的部分）
      ctx.font = `bold ${Math.floor(24 * fontScaleRatio)}px Nexon, "Noto Sans TC", "Noto Sans JP", sans-serif`;
      ctx.fillStyle = iconColor;
      ctx.fillText(currentPart, currentX, y);
      currentX += ctx.measureText(currentPart).width;
    }
  }

  // 如果沒有找到任何圖標，確保普通文本使用正確的顏色
  if (iconMatches.length === 0) {
    // 重置為普通文本顏色
    ctx.font = `${Math.floor(24 * fontScaleRatio)}px Nexon, "Noto Sans TC", "Noto Sans JP", sans-serif`;
    ctx.fillStyle = '#cccccc';
  }

  // 重置字體狀態
  ctx.font = `${Math.floor(24 * fontScaleRatio)}px Nexon, "Noto Sans TC", "Noto Sans JP", sans-serif`;
  ctx.fillStyle = '#cccccc';

  return currentX;
}

// 計算特殊符號文字寬度的輔助函數
function measureTextWithSpecialSymbols(ctx: any, text: string, fontScaleRatio: number = 1): number {
  let totalWidth = 0;
  let i = 0;

  while (i < text.length) {
    const char = text[i];

    if (char === '-' || char === '※') {
      // 特殊符號：非粗體
      ctx.font = `normal ${Math.floor(24 * fontScaleRatio)}px Nexon, "Noto Sans TC", "Noto Sans JP", sans-serif`;
      totalWidth += ctx.measureText(char).width;
    } else {
      // 普通字符：找到連續的非特殊符號
      let normalText = '';
      let j = i;
      while (j < text.length && text[j] !== '-' && text[j] !== '※') {
        normalText += text[j];
        j++;
      }

      if (normalText) {
        // 普通文字：粗體
        ctx.font = `bold ${Math.floor(24 * fontScaleRatio)}px Nexon, "Noto Sans TC", "Noto Sans JP", sans-serif`;
        totalWidth += ctx.measureText(normalText).width;
        i = j - 1; // j-1 因為循環最後會i++
      }
    }

    i++;
  }

  return totalWidth;
}

// 繪製帶有特殊符號樣式的文字輔助函數
function drawTextWithSpecialSymbols(ctx: any, text: string, x: number, y: number, normalColor: string = '#cccccc', fontScaleRatio: number = 1): number {
  let currentX = x;
  let i = 0;

  while (i < text.length) {
    const char = text[i];

    if (char === '-' || char === '※') {
      // 特殊符號：非粗體，透明度較高
      ctx.font = `normal ${Math.floor(24 * fontScaleRatio)}px Nexon, "Noto Sans TC", "Noto Sans JP", sans-serif`;
      ctx.fillStyle = normalColor + '80'; // 添加透明度 (50%)
      ctx.fillText(char, currentX, y);
      currentX += ctx.measureText(char).width;
    } else {
      // 普通字符：找到連續的非特殊符號
      let normalText = '';
      let j = i;
      while (j < text.length && text[j] !== '-' && text[j] !== '※') {
        normalText += text[j];
        j++;
      }

      if (normalText) {
        // 普通文字：粗體，正常透明度
        ctx.font = `bold ${Math.floor(24 * fontScaleRatio)}px Nexon, "Noto Sans TC", "Noto Sans JP", sans-serif`;
        ctx.fillStyle = normalColor;
        ctx.fillText(normalText, currentX, y);
        currentX += ctx.measureText(normalText).width;
        i = j - 1; // j-1 因為循環最後會i++
      }
    }

    i++;
  }

  return currentX - x; // 返回文字的總寬度
}

// 繪製技能卡片的輔助函數
async function drawSkillCard(
  ctx: any,
  x: number,
  y: number,
  width: number,
  skill: any,
  skillType: string,
  cost: number | null,
  iconColor: string,
  skillLevel: number = 5,
  scaleRatio: number = 1,
  maxHeight?: number,
  fontScaleRatio: number = 1,
) {
  // 檢查是否有額外信息（Radius、Range、Duration等）
  let hasInfo = false;
  if ((skill.Radius && skill.Radius.length > 0) || skill.Range || skill.Duration) {
    hasInfo = true;
  }

  // 使用傳入的高度限制，如果沒有則計算原始高度
  let actualHeight = maxHeight || (await calculateSkillCardHeight(ctx, width, skill, skillLevel, 1));

  // 如果有額外信息，增加背景高度
  if (hasInfo) {
    actualHeight += 15;
  }

  // 技能卡片背景
  ctx.fillStyle = '#3a3a3a';
  ctx.beginPath();
  ctx.roundRect(x, y, width, actualHeight, 10);
  ctx.fill();

  // 等級標示 - 顯示指定等級（不縮放）
  ctx.font = 'bold 22px Nexon, "Noto Sans TC", "Noto Sans JP", sans-serif';
  ctx.fillStyle = '#888888';
  ctx.textAlign = 'right';

  // 計算最高等級（用於驗證）
  let maxLevel = 1;
  if (skill.Parameters && skill.Parameters.length > 0) {
    // 取第一個參數數組的長度作為最高等級
    maxLevel = skill.Parameters[0].length;
  } else if (skill.Cost && skill.Cost.length > 0) {
    // 如果沒有Parameters，使用Cost數組的長度
    maxLevel = skill.Cost.length;
  }

  // 確保技能等級不超過最高等級
  const displayLevel = Math.min(skillLevel, maxLevel);
  ctx.fillText(`Lv.${displayLevel}`, x + width - 15, y + 40);

  // 技能圖標
  const iconSize = 80;
  const iconX = x + 20;
  const iconY = y + 10;

  // 嘗試載入技能圖標
  if (skill.Icon) {
    drawHexagonIcon(ctx, iconX, iconY, iconSize, iconColor);
    const image = await loadImage(`https://schaledb.com/images/skill/${skill.Icon}.webp`);
    ctx.drawImage(image, iconX + 5, iconY + 5, iconSize - 10, iconSize - 10);
  }

  // 技能標題 - 往下20px（不縮放）
  ctx.font = 'bold 32px Nexon, "Noto Sans TC", "Noto Sans JP", sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'left';
  ctx.fillText(skill.Name, iconX + iconSize + 15, iconY + 35);

  // 技能類型、消耗、持續時間和射程 - 與標題間隔10px（不縮放）
  ctx.font = 'italic bold 24px Nexon, "Noto Sans TC", "Noto Sans JP", sans-serif';
  ctx.fillStyle = '#cccccc';

  let currentX = iconX + iconSize + 15;

  // 顯示技能類型和COST
  if (cost !== null) {
    const typeAndCost = `${skillType} / COST: ${cost}`;
    ctx.fillText(typeAndCost, currentX, iconY + 65);
  } else {
    // 如果沒有COST，只顯示技能類型
    ctx.fillText(skillType, currentX, iconY + 65);
  }

  // 顯示Radius（若有）
  if (skill.Radius && skill.Radius.length > 0) {
    for (const radius of skill.Radius) {
      let displayText = '';
      let iconName = '';

      if (radius.Type === 'Fan') {
        displayText = `${radius.Radius} / ${radius.Degree}°`;
        iconName = 'COMMON_SKILLICON_FAN';
      } else if (radius.Type === 'Circle') {
        displayText = radius.Radius.toString();
        iconName = 'COMMON_SKILLICON_CIRCLE';
      } else if (radius.Type === 'Obb') {
        displayText = radius.Height.toString();
        iconName = 'COMMON_SKILLICON_LINE';
      } else if (radius.Type === 'Bounce') {
        displayText = radius.Radius.toString();
        iconName = 'COMMON_SKILLICON_BOUNCEPROJECTILE';
      } else if (radius.Type === 'Donut') {
        displayText = `${radius.ExcludeRadius} - ${radius.Radius} / ${radius.Degree}°`;
        iconName = 'COMMON_SKILLICON_DONUT';
      }

      if (iconName && displayText) {
        const radiusPillWidth = await drawSkillInfoPillWithWebp(ctx, currentX, iconY + 75, displayText, iconName);
        currentX += radiusPillWidth + 5; // 增加間距
      }
    }
  }

  // 顯示Range（若有）
  if (skill.Range && skill.Range > 0) {
    const rangePillWidth = await drawSkillInfoPill(ctx, currentX, iconY + 75, skill.Range.toString(), 'Range');
    currentX += rangePillWidth + 5; // 增加間距
  }

  // 顯示Duration（若有）
  if (skill.Duration && skill.Duration > 0) {
    const durationInSeconds = (skill.Duration / 30).toFixed(2);
    await drawSkillInfoPill(ctx, currentX, iconY + 75, `${durationInSeconds}秒`, 'Duration');
  }

  // 技能描述
  let lineY = iconY + iconSize + 30 + (hasInfo ? 20 : 0); // 描述在圖標下面，間隔25px

  if (skill.Desc) {
    ctx.font = `bold ${Math.floor(24 * fontScaleRatio)}px Nexon, "Noto Sans TC", "Noto Sans JP", sans-serif`;
    ctx.fillStyle = '#cccccc';

    // 計算最高等級
    let maxLevel = 1;
    if (skill.Parameters && skill.Parameters.length > 0) {
      maxLevel = skill.Parameters[0].length;
    } else if (skill.Cost && skill.Cost.length > 0) {
      maxLevel = skill.Cost.length;
    }

    // 處理描述文字，替換參數占位符並高亮百分比
    let desc = skill.Desc;

    // 替換參數占位符 <?1>, <?2> 等為指定等級的參數值
    if (skill.Parameters && skill.Parameters.length > 0) {
      desc = desc.replace(/<\?(\d+)>/g, (match: string, paramIndex: string) => {
        const index = parseInt(paramIndex) - 1; // 參數索引從1開始，數組索引從0開始
        if (index >= 0 && index < skill.Parameters.length) {
          const paramArray = skill.Parameters[index];
          if (paramArray && paramArray.length > 0) {
            // 使用指定的技能等級，但確保不超出數組範圍
            const levelIndex = Math.min(skillLevel - 1, paramArray.length - 1);
            return paramArray[levelIndex] || paramArray[0];
          }
        }
        return match; // 如果找不到對應參數，保持原樣
      });
    }

    // 處理HTML標籤
    desc = desc.replace(/<b>(.*?)<\/b>/g, (match: string, content: string) => {
      return `__BOLD_${content}__`;
    });

    // 處理localization標籤 - 先收集所有需要翻譯的key和圖標信息
    const translationKeys: string[] = [];
    const iconInfo: { type: string; key: string; index: number }[] = [];

    // 處理 <b:key> 格式 (Buff類型)
    desc = desc.replace(/<b:(.*?)>/g, (match: string, key: string) => {
      const index = translationKeys.length;
      translationKeys.push(`Buff_${key}`);
      iconInfo.push({ type: 'buff', key: key, index: index });
      return `**__ICON_TRANSLATION_${index}__**`;
    });

    // 處理 <c:key> 格式 (CC類型)
    desc = desc.replace(/<c:(.*?)>/g, (match: string, key: string) => {
      const index = translationKeys.length;
      translationKeys.push(`CC_${key}`);
      iconInfo.push({ type: 'cc', key: key, index: index });
      return `**__ICON_TRANSLATION_${index}__**`;
    });

    // 處理 <s:key> 格式 (Status類型)
    desc = desc.replace(/<s:(.*?)>/g, (match: string, key: string) => {
      const index = translationKeys.length;
      translationKeys.push(`Special_${key}`);
      iconInfo.push({ type: 'status', key: key, index: index });
      return `**__ICON_TRANSLATION_${index}__**`;
    });

    // 處理 <d:key> 格式 (Debuff類型)
    desc = desc.replace(/<d:(.*?)>/g, (match: string, key: string) => {
      const index = translationKeys.length;
      translationKeys.push(`Debuff_${key}`);
      iconInfo.push({ type: 'debuff', key: key, index: index });
      return `**__ICON_TRANSLATION_${index}__**`;
    });

    // 批量翻譯
    if (translationKeys.length > 0) {
      const translations = await smartTranslateBatch(translationKeys);

      // 替換翻譯佔位符，保留圖標信息
      for (let i = 0; i < translationKeys.length; i++) {
        const key = translationKeys[i];
        let translation = translations[key];
        const iconData = iconInfo.find((info) => info.index === i);

        // 清理翻譯文本，去除可能的前缀
        if (translation && typeof translation === 'string') {
          // 去除常見的前缀：Public_, Buff_, Debuff_, Special_, CC_等
          translation = translation.replace(/^(Public_|Buff_|Debuff_|Special_|CC_)/, '');
          // 也清理文本中間可能出現的前綴
          translation = translation.replace(/Public_/g, '');
          translation = translation.replace(/Buff_/g, '');
          translation = translation.replace(/Debuff_/g, '');
          translation = translation.replace(/Special_/g, '');
          translation = translation.replace(/CC_/g, '');
        }

        if (iconData) {
          // 創建帶圖標的佔位符
          const iconPlaceholder = `__ICON_${iconData.type}_${iconData.key}_${translation}__`;
          desc = desc.replace(`**__ICON_TRANSLATION_${i}__**`, `**${iconPlaceholder}**`);
        } else {
          desc = desc.replace(`**__ICON_TRANSLATION_${i}__**`, `**${translation}**`);
        }
      }
    }

    // 處理HTML實體
    desc = desc.replace(/&nbsp;/g, ' ');

    // 處理換行符
    desc = desc.replace(/\\n/g, '\n');

    // 高亮百分比
    desc = desc.replace(/(\d+(?:\.\d+)?%)/g, (match: string) => {
      return `**${match}**`;
    });

    // 將連續的換行符替換為單個換行符
    desc = desc.replace(/\n\n+/g, '\n');

    // 清理翻譯文本中的前綴
    desc = desc.replace(/Public_/g, '');
    desc = desc.replace(/Buff_/g, '');
    desc = desc.replace(/Debuff_/g, '');
    desc = desc.replace(/Special_/g, '');
    desc = desc.replace(/CC_/g, '');

    // 步驟1：先將所有的圖標標記都轉換完成，避免被換行符截斷
    // 將圖標文字中的換行符替換為特殊標記
    desc = desc.replace(/\*\*__ICON_(buff|debuff|status|cc)_([^_]+)_([^*\n]+?)__\*\*/g, (match: string, iconType: string, iconKey: string, text: string) => {
      // 將換行符替換為特殊標記
      const processedText = text.replace(/\n/g, '\\n');
      return `**__ICON_${iconType}_${iconKey}_${processedText}__**`;
    });

    // 步驟2：按換行符分割文字，現在所有的圖標標記都已經完整
    const lines = desc.split('\n');

    // 步驟3：設置最大寬度，用於後續的寬度計算和換行處理
    const maxWidth = width - 40; // 使用全寬度減去左右邊距，與calculateSkillCardHeight保持一致

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex];

      if (line.trim() === '') {
        // 空行，只增加行距，應用縮放比例
        lineY += Math.floor(10 * fontScaleRatio);
        continue;
      }

      // 步驟4：先計算整行的寬度，包括圖標
      const lineWidth = measureTextWithIcons(ctx, line, fontScaleRatio);

      // 如果整行寬度超過最大寬度，需要進行換行處理
      if (lineWidth > maxWidth) {
        // 使用智能換行邏輯
        const wrappedLines = await wrapTextWithIcons(ctx, line, maxWidth, fontScaleRatio);

        for (const wrappedLine of wrappedLines) {
          // 繪製換行後的行
          const currentX = x + 20; // 從卡片左邊開始，間隔20px
          await drawFormattedLine(ctx, wrappedLine, currentX, lineY, iconColor, fontScaleRatio, skillType);
          lineY += Math.floor(30 * fontScaleRatio); // 行間距
        }
      } else {
        // 整行寬度在範圍內，直接繪製
        const currentX = x + 20; // 從卡片左邊開始，間隔20px
        await drawFormattedLine(ctx, line, currentX, lineY, iconColor, fontScaleRatio, skillType);
        lineY += Math.floor(30 * fontScaleRatio); // 行間距
      }
    }
  }

  // 返回計算出的高度
  return actualHeight;
}

// 計算技能卡片高度的輔助函數
async function calculateSkillCardHeight(ctx: any, width: number, skill: any, skillLevel: number = 5, scaleRatio: number = 1): Promise<number> {
  // 計算技能描述需要的行數
  let descLines = 1;
  if (skill.Desc) {
    // 計算最高等級
    let maxLevel = 1;
    if (skill.Parameters && skill.Parameters.length > 0) {
      maxLevel = skill.Parameters[0].length;
    } else if (skill.Cost && skill.Cost.length > 0) {
      maxLevel = skill.Cost.length;
    }

    // 處理描述文字，替換參數占位符
    let desc = skill.Desc;
    if (skill.Parameters && skill.Parameters.length > 0) {
      desc = desc.replace(/<\?(\d+)>/g, (match: string, paramIndex: string) => {
        const index = parseInt(paramIndex) - 1;
        if (index >= 0 && index < skill.Parameters.length) {
          const paramArray = skill.Parameters[index];
          if (paramArray && paramArray.length > 0) {
            // 使用指定的技能等級，但確保不超出數組範圍
            const levelIndex = Math.min(skillLevel - 1, paramArray.length - 1);
            return paramArray[levelIndex] || paramArray[0];
          }
        }
        return match;
      });
    }

    // 處理HTML標籤 - 使用粗體字體
    desc = desc.replace(/<b>(.*?)<\/b>/g, (match: string, content: string) => {
      return `__BOLD_${content}__`;
    });

    // 處理localization標籤 - 先收集所有需要翻譯的key和圖標信息
    const translationKeys: string[] = [];
    const iconInfo: { type: string; key: string; index: number }[] = [];

    // 處理 <b:key> 格式 (Buff類型)
    desc = desc.replace(/<b:(.*?)>/g, (match: string, key: string) => {
      const index = translationKeys.length;
      translationKeys.push(`Buff_${key}`);
      iconInfo.push({ type: 'buff', key: key, index: index });
      return `**__ICON_TRANSLATION_${index}__**`;
    });

    // 處理 <c:key> 格式 (CC類型)
    desc = desc.replace(/<c:(.*?)>/g, (match: string, key: string) => {
      const index = translationKeys.length;
      translationKeys.push(`CC_${key}`);
      iconInfo.push({ type: 'cc', key: key, index: index });
      return `**__ICON_TRANSLATION_${index}__**`;
    });

    // 處理 <s:key> 格式 (Status類型)
    desc = desc.replace(/<s:(.*?)>/g, (match: string, key: string) => {
      const index = translationKeys.length;
      translationKeys.push(`Special_${key}`);
      iconInfo.push({ type: 'status', key: key, index: index });
      return `**__ICON_TRANSLATION_${index}__**`;
    });

    // 處理 <d:key> 格式 (Debuff類型)
    desc = desc.replace(/<d:(.*?)>/g, (match: string, key: string) => {
      const index = translationKeys.length;
      translationKeys.push(`Debuff_${key}`);
      iconInfo.push({ type: 'debuff', key: key, index: index });
      return `**__ICON_TRANSLATION_${index}__**`;
    });

    // 批量翻譯
    if (translationKeys.length > 0) {
      const translations = await smartTranslateBatch(translationKeys);

      // 替換翻譯佔位符，保留圖標信息
      for (let i = 0; i < translationKeys.length; i++) {
        const key = translationKeys[i];
        let translation = translations[key];
        const iconData = iconInfo.find((info) => info.index === i);

        // 清理翻譯文本，去除可能的前缀
        if (translation && typeof translation === 'string') {
          // 去除常見的前缀：Public_, Buff_, Debuff_, Special_, CC_等
          translation = translation.replace(/^(Public_|Buff_|Debuff_|Special_|CC_)/, '');
          // 也清理文本中間可能出現的前綴
          translation = translation.replace(/Public_/g, '');
          translation = translation.replace(/Buff_/g, '');
          translation = translation.replace(/Debuff_/g, '');
          translation = translation.replace(/Special_/g, '');
          translation = translation.replace(/CC_/g, '');
        }

        if (iconData) {
          // 創建帶圖標的佔位符
          const iconPlaceholder = `__ICON_${iconData.type}_${iconData.key}_${translation}__`;
          desc = desc.replace(`**__ICON_TRANSLATION_${i}__**`, `**${iconPlaceholder}**`);
        } else {
          desc = desc.replace(`**__ICON_TRANSLATION_${i}__**`, `**${translation}**`);
        }
      }
    }

    // 處理HTML實體
    desc = desc.replace(/&nbsp;/g, ' ');

    // 處理換行符
    desc = desc.replace(/\\n/g, '\n');

    // 高亮百分比
    desc = desc.replace(/(\d+(?:\.\d+)?%)/g, (match: string) => {
      return `**${match}**`;
    });

    // 將連續的換行符替換為單個換行符
    desc = desc.replace(/\n\n+/g, '\n');

    // 步驟1：先將所有的圖標標記都轉換完成，避免被換行符截斷
    // 將圖標文字中的換行符替換為特殊標記
    desc = desc.replace(/\*\*__ICON_(buff|debuff|status|cc)_([^_]+)_([^*\n]+?)__\*\*/g, (match: string, iconType: string, iconKey: string, text: string) => {
      // 將換行符替換為特殊標記
      const processedText = text.replace(/\n/g, '\\n');
      return `**__ICON_${iconType}_${iconKey}_${processedText}__**`;
    });

    // 步驟2：按換行符分割文字，現在所有的圖標標記都已經完整
    const lines = desc.split('\n');

    // 步驟3：設置字體和最大寬度，用於後續的寬度計算和換行處理
    ctx.font = 'bold 24px Nexon, "Noto Sans TC", "Noto Sans JP", sans-serif';
    const maxWidth = width - 40; // 使用全寬度減去左右邊距，適當調整避免過早換行

    for (const line of lines) {
      if (line.trim() === '') {
        // 空行，只增加行數
        descLines++;
        continue;
      }

      // 處理每一行的文字換行 - 使用更智能的分詞方式
      let currentLine = '';

      // 改進的分詞邏輯，避免將標點符號與後續文字分離
      const tokens = [];
      let currentToken = '';

      for (let i = 0; i < line.length; i++) {
        const char = line[i];

        // 如果遇到空格，結束當前token並添加空格token
        if (char === ' ') {
          if (currentToken) {
            tokens.push(currentToken);
            currentToken = '';
          }
          tokens.push(' ');
        }
        // 如果遇到特殊標點符號，與前面的詞組合
        else if (/[，。；：！？]/.test(char)) {
          // 將標點符號添加到當前token
          currentToken += char;
          // 完成這個token
          tokens.push(currentToken);
          currentToken = '';
        }
        // 如果遇到行首特殊標點符號（※、・等），與後續文字保持在一起
        else if (/[※・]/.test(char)) {
          // 如果當前token不為空，先添加它
          if (currentToken) {
            tokens.push(currentToken);
            currentToken = '';
          }
          // 開始新的token，包含標點符號，並嘗試包含後續的一些文字以避免孤立
          currentToken = char;

          // 嘗試包含後面的空格和一些文字（固定最多約35個字符，確保不超出卡片寬度）
          if (i + 1 < line.length) {
            // 添加後面的空格
            if (line[i + 1] === ' ') {
              i++;
              currentToken += line[i];
            }
            // 添加後面的文字，最多35個字符，不管是否遇到標點符號
            let charCount = 0;
            let nextIndex = i + 1;
            while (nextIndex < line.length && charCount < 35) {
              currentToken += line[nextIndex];
              nextIndex++;
              charCount++;
            }
            i = nextIndex - 1; // 調整索引
          }
        }
        // 如果遇到數字和百分比，保持完整性
        else if (/\d/.test(char)) {
          currentToken += char;
          // 檢查後續字符是否為小數點、百分比或數字
          let j = i + 1;
          while (j < line.length && /[\d.%]/.test(line[j])) {
            currentToken += line[j];
            j++;
          }
          tokens.push(currentToken);
          currentToken = '';
          i = j - 1; // 調整索引
        }
        // 如果遇到 ** 標記，保持 **text** 格式完整，並與後續文字保持在一起
        else if (char === '*' && i + 1 < line.length && line[i + 1] === '*') {
          if (currentToken) {
            tokens.push(currentToken);
            currentToken = '';
          }

          // 開始處理 **text** 標記
          currentToken = '**';
          i += 2; // 跳過第二個 *

          // 找到結束的 **
          while (i < line.length) {
            currentToken += line[i];
            if (line[i] === '*' && i + 1 < line.length && line[i + 1] === '*') {
              currentToken += line[i + 1];
              i += 2; // 跳過結束的 **
              break;
            }
            i++;
          }

          // 嘗試包含後面的一些文字以避免孤立，最多包含20個字符
          let charCount = 0;
          while (i < line.length && charCount < 20) {
            const nextChar = line[i];
            // 如果遇到空格，包含它並繼續
            if (nextChar === ' ') {
              currentToken += nextChar;
              i++;
              charCount++;
              continue;
            }
            // 如果遇到標點符號，在此處停止
            if (/[，。；：！？、※・]/.test(nextChar)) {
              break;
            }
            currentToken += nextChar;
            i++;
            charCount++;
          }

          tokens.push(currentToken);
          currentToken = '';
          i--; // 調整索引，因為 for 循環會自動增加
        }
        // 如果遇到括號，保持括號內容完整
        else if (char === '(') {
          if (currentToken) {
            tokens.push(currentToken);
            currentToken = '';
          }
          currentToken = char;
          let j = i + 1;
          let depth = 1;
          while (j < line.length && depth > 0) {
            currentToken += line[j];
            if (line[j] === '(') depth++;
            if (line[j] === ')') depth--;
            j++;
          }
          tokens.push(currentToken);
          currentToken = '';
          i = j - 1;
        } else {
          currentToken += char;
        }
      }

      // 添加最後的token
      if (currentToken) {
        tokens.push(currentToken);
      }

      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        const testLine = currentLine + token;

        // 使用精確的圖標寬度計算
        const textWidth = measureTextWithIcons(ctx, testLine, scaleRatio);

        if (textWidth > maxWidth && currentLine !== '') {
          descLines++;
          currentLine = token;
        } else {
          currentLine = testLine;
        }
      }

      // 檢查最後一行是否會超出邊界
      if (currentLine) {
        // 使用精確的圖標寬度計算
        const finalTextWidth = measureTextWithIcons(ctx, currentLine, scaleRatio);
        if (finalTextWidth > maxWidth) {
          // 如果最後一行超出邊界，需要額外的換行處理
          let remainingText = currentLine;

          while (remainingText.length > 0) {
            let testText = '';
            let foundBreak = false;

            // 智能尋找合適的斷點，避免在標點符號後立即換行
            for (let i = 1; i <= remainingText.length; i++) {
              const testLine = remainingText.substring(0, i);
              // 使用精確的圖標寬度計算
              const textWidth = measureTextWithIcons(ctx, testLine, scaleRatio);
              if (textWidth > maxWidth) {
                // 找到斷點，但檢查是否在標點符號後
                if (i > 1) {
                  const prevChar = remainingText[i - 2];
                  const currentChar = remainingText[i - 1];
                  // 如果前一個字符是標點符號，嘗試往前找更好的斷點
                  if (/[※・、，。；：！？]/.test(prevChar) && i > 2) {
                    // 尋找前面更好的斷點位置
                    for (let j = i - 2; j >= Math.max(1, i - 10); j--) {
                      const backChar = remainingText[j];
                      if (!/[※・、，。；：！？]/.test(backChar)) {
                        testText = remainingText.substring(0, j + 1);
                        foundBreak = true;
                        break;
                      }
                    }
                    if (!foundBreak) {
                      testText = remainingText.substring(0, i - 1);
                      foundBreak = true;
                    }
                  } else {
                    foundBreak = true;
                  }
                } else {
                  foundBreak = true;
                }
                break;
              }
              testText = testLine;
            }

            if (!foundBreak) {
              // 如果沒有找到斷點，使用剩餘的所有文字
              testText = remainingText;
            }

            // 更新剩餘文字
            remainingText = remainingText.substring(testText.length);
            if (remainingText.length > 0) {
              descLines++; // 額外增加一行
            }
          }
        }
      }

      // 每行結束後增加行數
      descLines++;
    }
  }

  // 計算卡片高度
  const baseHeight = Math.floor(120 * scaleRatio); // 基本高度：圖標區域(100) + 標題和類型區域(20) + 描述起始間距(20)，應用縮放比例
  const lineHeight = Math.floor(30 * scaleRatio); // 每行描述的高度，應用縮放比例，與實際渲染時的行距保持一致
  const padding = 0; // 增加上下邊距，確保背景完全包覆內容，應用縮放比例
  const bufferSpace = -10; // 移除文字敘述底部的間隔 - 將緩衝空間設為0
  const actualHeight = baseHeight + descLines * lineHeight + padding + bufferSpace;

  return actualHeight;
}

// 繪製屬性圖標的輔助函數
async function drawStatIcon(ctx: any, x: number, y: number, size: number, iconType: string) {
  try {
    // 動態構建圖標路徑
    const iconPath = `./public/property/${iconType}.svg`;

    // 載入 SVG 圖標
    const iconImage = await loadImage(iconPath);

    ctx.save();
    ctx.filter = 'brightness(0) invert(1)'; // 白色
    ctx.drawImage(iconImage, x, y, size, size);
    ctx.restore();
  } catch (error) {
    console.error(`Failed to load stat icon ${iconType}:`, error);
    // 如果載入失敗，使用默認的白色圓形圖標
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(x + size / 2, y + size / 2, size / 2, 0, 2 * Math.PI);
    ctx.fill();
  }
}

// 繪製技能信息標籤的輔助函數
async function drawSkillInfoPill(ctx: any, x: number, y: number, text: string, iconType: string): Promise<number> {
  // 計算文字寬度，動態調整標籤寬度 - 使用更大的字體
  ctx.font = 'bold 16px Nexon, "Noto Sans TC", "Noto Sans JP", sans-serif';
  const textWidth = ctx.measureText(text).width;
  const pillWidth = Math.max(70, textWidth + 40); // 增大最小寬度和內邊距
  const pillHeight = 28; // 增大標籤高度

  // 繪製背景（與SquidType相同的樣式）
  ctx.fillStyle = '#2a2a2a';
  ctx.beginPath();
  ctx.roundRect(x, y, pillWidth, pillHeight, 12);
  ctx.fill();

  // 繪製白色SVG圖標 - 使用更大的圖標
  try {
    const iconPath = `./public/property/${iconType}.svg`;
    const iconImage = await loadImage(iconPath);

    ctx.save();
    ctx.filter = 'brightness(0) invert(1)'; // 轉為白色
    ctx.drawImage(iconImage, x + 6, y + 4, 19, 19); // 增大圖標尺寸和調整位置
    ctx.restore();
  } catch (error) {
    console.error(`無法載入圖標: ${iconType}`);
    // 如果載入失敗，使用默認的白色圓形圖標
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(x + 17, y + 13, 7, 0, 2 * Math.PI); // 調整圓形圖標大小和位置
    ctx.fill();
  }

  // 繪製文字 - 使用更大的字體
  ctx.font = 'bold 17px Nexon, "Noto Sans TC", "Noto Sans JP", sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'left';
  ctx.fillText(text, x + 30, y + 20); // 調整文字位置

  return pillWidth; // 返回標籤寬度，用於計算下一個元素的位置
}

// 繪製技能信息標籤的輔助函數（使用 webp 圖標）
async function drawSkillInfoPillWithWebp(ctx: any, x: number, y: number, text: string, iconName: string): Promise<number> {
  // 計算文字寬度，動態調整標籤寬度 - 使用更大的字體
  ctx.font = 'bold 16px Nexon, "Noto Sans TC", "Noto Sans JP", sans-serif';
  const textWidth = ctx.measureText(text).width;
  const pillWidth = Math.max(70, textWidth + 50); // 增大最小寬度和內邊距
  const pillHeight = 28; // 增大標籤高度

  // 繪製背景（與SquidType相同的樣式）
  ctx.fillStyle = '#2a2a2a';
  ctx.beginPath();
  ctx.roundRect(x, y, pillWidth, pillHeight, 12);
  ctx.fill();

  // 繪製 webp 圖標
  try {
    const iconPath = `./public/property/${iconName}.webp`;
    const iconImage = await loadImage(iconPath);

    // 直接繪製 webp 圖標（不需要顏色過濾器，因為圖標本身就是白色的）
    ctx.drawImage(iconImage, x + 4, y - 2, 28, 28); // 增大圖標尺寸和調整位置
  } catch (error) {
    console.error(`無法載入圖標: ${iconName}`);
    // 如果載入失敗，使用默認的白色圓形圖標
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(x + 17, y + 13, 7, 0, 2 * Math.PI); // 調整圓形圖標大小和位置
    ctx.fill();
  }

  // 繪製文字 - 使用更大的字體
  ctx.font = 'bold 17px Nexon, "Noto Sans TC", "Noto Sans JP", sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'left';
  ctx.fillText(text, x + 33, y + 20); // 調整文字位置3

  return pillWidth; // 返回標籤寬度，用於計算下一個元素的位置
}

// 繪製六邊形圖標的輔助函數
function drawHexagonIcon(ctx: any, x: number, y: number, size: number, color: string) {
  ctx.save(); // 保存當前狀態

  // 設置旋轉中心點和角度（30度 = π/6 弧度）
  const centerX = x + size / 2;
  const centerY = y + size / 2;
  ctx.translate(centerX, centerY);
  ctx.rotate(Math.PI / 6); // 旋轉30度
  ctx.translate(-centerX, -centerY);

  ctx.fillStyle = color;
  ctx.beginPath();
  const radius = size / 2;

  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3;
    const pointX = centerX + radius * Math.cos(angle);
    const pointY = centerY + radius * Math.sin(angle);

    if (i === 0) {
      ctx.moveTo(pointX, pointY);
    } else {
      ctx.lineTo(pointX, pointY);
    }
  }
  ctx.closePath();
  ctx.fill();

  ctx.restore(); // 恢復之前保存的狀態
}
