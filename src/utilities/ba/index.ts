import axios from 'axios';

const requestUrl = 'https://schaledb.com/data';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24小時的毫秒數

// 服務器名稱映射
const SERVER_NAME_MAP: Record<string, string> = {
  Jp: '日服',
  Global: '國際服',
  Cn: '簡中服',
};

export const SQUAD_TYPE_COLORS: Record<string, string> = {
  Main: 'rgba(204, 26, 37, 1)',
  Support: 'rgba(0, 107, 255, 1)',
};

// 顏色映射常量
export const BULLET_TYPE_COLORS: Record<string, string> = {
  Pierce: '#b26d1f', // 貫通
  Sonic: '#9431a5', // 振動
  Explosion: '#a70c19', // 爆炸
  Mystic: '#216f9c', // 神秘
  Normal: '#666666', // 常規
  Mixed: '#999999', // 輪換
};

export const ARMOR_TYPE_COLORS: Record<string, string> = {
  HeavyArmor: '#b26d1f', // 重型
  LightArmor: '#a70c19', // 輕型
  ElasticArmor: '#9431a5', // 彈性
  Unarmed: '#216f9c', // 特殊
  Normal: '#666666', // 常規
  Structure: '#999999', // 結構物
};

// 緩存管理器
class CacheManager {
  private cache = new Map<string, { data: any; timestamp: number }>();

  async get<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    const now = Date.now();
    const cached = this.cache.get(key);

    if (cached && now - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }

    const data = await fetcher();
    this.cache.set(key, { data, timestamp: now });
    return data;
  }

  clear(): void {
    this.cache.clear();
  }
}

const cacheManager = new CacheManager();

// 數據獲取函數
const fetchData = async (endpoint: string) => {
  return cacheManager.get(endpoint, () => axios.get(`${requestUrl}/${endpoint}`).then((res) => res.data));
};

export const getLocalizationData = () => fetchData('tw/localization.min.json');
export const getConfigData = () => fetchData('config.min.json');
export const getStudentsData = () => fetchData('tw/students.min.json');
export const getEquipmentData = () => fetchData('tw/equipment.min.json');

// 統一的翻譯映射獲取
export async function getTranslationMaps() {
  const localization = await getLocalizationData();
  return {
    tacticRole: localization.TacticRole || {},
    bulletType: localization.BulletType || {},
    armorType: localization.ArmorType || {},
    school: localization.School || {},
    club: localization.Club || {},
  };
}

// 智能翻譯函數 - 自動在所有翻譯類別中查找
export async function smartTranslate(key: string): Promise<string> {
  const localization = await getLocalizationData();

  // 在所有翻譯類別中查找key
  for (const [category, translations] of Object.entries(localization)) {
    if (translations && typeof translations === 'object' && key in translations) {
      return (translations as Record<string, string>)[key];
    }
  }

  // 如果找不到翻譯，返回原始key
  return key;
}

// 批量智能翻譯函數
export async function smartTranslateBatch(keys: string[]): Promise<Record<string, string>> {
  const localization = await getLocalizationData();
  const result: Record<string, string> = {};

  for (const key of keys) {
    let found = false;

    // 在所有翻譯類別中查找key
    for (const [category, translations] of Object.entries(localization)) {
      if (translations && typeof translations === 'object' && key in translations) {
        result[key] = (translations as Record<string, string>)[key];
        found = true;
        break;
      }
    }

    // 如果找不到翻譯，使用原始key
    if (!found) {
      result[key] = key;
    }
  }

  return result;
}

// 向後兼容的翻譯函數（簡化版本）
export const getTacticRoleMap = () => getTranslationMaps().then((maps) => maps.tacticRole);
export const getBulletTypeMap = () => getTranslationMaps().then((maps) => maps.bulletType);
export const getArmorTypeMap = () => getTranslationMaps().then((maps) => maps.armorType);
export const getSchoolMap = () => getTranslationMaps().then((maps) => maps.school);
export const getClubMap = () => getTranslationMaps().then((maps) => maps.club);

// 學生數據處理
async function getStudentData(id: string) {
  const students = await getStudentsData();
  const student = students[id];

  if (!student) {
    throw new Error(`Student with ID ${id} not found`);
  }

  return {
    id: student.Id,
    name: student.Name,
    tacticRole: student.TacticRole,
    bulletTypeColor: BULLET_TYPE_COLORS[student.BulletType] || '#666666',
  };
}

// 抽卡數據獲取
export async function getCurrentGachaData(server: string) {
  const config = await getConfigData();
  const serverConfigData = config.Regions.find((region: any) => region.Name === server);

  if (!serverConfigData) {
    throw new Error(`Server ${server} not found`);
  }

  const currentGacha = serverConfigData.CurrentGacha[0];
  if (!currentGacha) {
    throw new Error(`No current gacha data for server ${server}`);
  }

  const characters = await Promise.all(currentGacha.characters.map((id: string) => getStudentData(id)));

  return {
    characters,
    server: SERVER_NAME_MAP[server] || server,
    start: currentGacha.start,
    end: currentGacha.end,
  };
}

// 重置時間計算
export function tomorrowResetTime(): string {
  const now = new Date();

  const todayReset = new Date(now);
  todayReset.setHours(19, 0, 0, 0);

  const resetTime =
    now < todayReset
      ? todayReset
      : (() => {
          const tomorrow = new Date(now);
          tomorrow.setDate(tomorrow.getDate() + 1);
          tomorrow.setHours(19, 0, 0, 0);
          return tomorrow;
        })();

  const resetTimestamp = Math.floor(resetTime.getTime() / 1000);
  return `-# <t:${resetTimestamp}:R> (上午3:00 [GMT+8]) 伺服器重置，老師今天上線了嗎？`;
}

export { cacheManager };