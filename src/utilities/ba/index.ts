import axios from 'axios';
import fs from 'fs';

const requestUrl = 'https://schaledb.com/data';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24小時的毫秒數
const SHORT_CACHE_DURATION = 5 * 60 * 1000; // 5分鐘的毫秒數（用於頻繁變化的數據）

// GameKee API 配置
const gamekeeHeaders = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
  'game-id': '0',
  'game-alias': 'ba',
};

const gamekeeUrl = 'https://ba.gamekee.com/v1/wiki/entry';

// 服務器名稱映射
export const SERVER_NAME_MAP: Record<string, string> = {
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

// 改進的緩存管理器
class CacheManager {
  private cache = new Map<string, { data: any; timestamp: number; duration: number }>();
  private pendingRequests = new Map<string, Promise<any>>();

  async get<T>(key: string, fetcher: () => Promise<T>, duration: number = CACHE_DURATION): Promise<T> {
    const now = Date.now();
    const cached = this.cache.get(key);

    // 檢查緩存是否有效
    if (cached && now - cached.timestamp < cached.duration) {
      return cached.data;
    }

    // 檢查是否有正在進行的相同請求
    if (this.pendingRequests.has(key)) {
      return this.pendingRequests.get(key)!;
    }

    // 創建新的請求
    const requestPromise = fetcher()
      .then((data) => {
        this.cache.set(key, { data, timestamp: now, duration });
        this.pendingRequests.delete(key);
        return data;
      })
      .catch((error) => {
        this.pendingRequests.delete(key);
        throw error;
      });

    this.pendingRequests.set(key, requestPromise);
    return requestPromise;
  }

  clear(): void {
    this.cache.clear();
    this.pendingRequests.clear();
  }

  // 清理過期的緩存
  cleanup(): void {
    const now = Date.now();
    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp > value.duration) {
        this.cache.delete(key);
      }
    }
  }

  // 獲取緩存統計信息
  getStats(): { size: number; pendingRequests: number } {
    return {
      size: this.cache.size,
      pendingRequests: this.pendingRequests.size,
    };
  }
}

const cacheManager = new CacheManager();

// 定期清理過期緩存
setInterval(
  () => {
    cacheManager.cleanup();
  },
  5 * 60 * 1000,
); // 每5分鐘清理一次

// 優化的數據獲取函數
const fetchData = async (endpoint: string, duration: number = CACHE_DURATION) => {
  return cacheManager.get(`schaledb_${endpoint}`, () => axios.get(`${requestUrl}/${endpoint}`).then((res) => res.data), duration);
};

const fetchKivoData = async (endpoint: string, duration: number = CACHE_DURATION) => {
  return cacheManager.get(`kivo_${endpoint}`, () => axios.get(`https://api.kivo.wiki/api/v1/data/${endpoint}`).then((res) => res.data), duration);
};

// 優化的 GameKee 數據獲取函數
const fetchGamekeeData = async () => {
  return cacheManager.get(
    'gamekee_students',
    async () => {
      const response = await axios.get(gamekeeUrl, { headers: gamekeeHeaders });
      const data = response.data;

      // 處理 GameKee 數據結構
      const entryList = data.data.entry_list;
      const studentList = entryList.find((x: any) => x.id === 23941)?.child;
      const allStudents = studentList?.find((x: any) => x.id === 49443)?.child || [];

      // 構建學生別名列表
      const studentAliasList: Record<string, string[]> = {};
      for (const student of allStudents) {
        if (student.content_id && student.name) {
          studentAliasList[student.content_id] = [student.name, ...(student.name_alias?.split(',') || [])];
        }
      }

      return {
        studentAliasList,
        rawData: data,
      };
    },
    CACHE_DURATION,
  );
};

const fetchGamekeeStudentData = async (studentId: string) => {
  return cacheManager.get(
    `gamekee_student_${studentId}`,
    async () => {
      const response = await axios.get(`https://www.gamekee.com/v1/content/detail/${studentId}`, { headers: gamekeeHeaders });
      return response.data;
    },
    SHORT_CACHE_DURATION,
  ); // 學生詳細數據使用較短的緩存時間
};

// 並行數據預加載
let preloadedData: {
  localization?: any;
  config?: any;
  twStudents?: any;
  cnStudents?: any;
  equipment?: any;
} = {};

// 預加載常用數據
export async function preloadCommonData() {
  try {
    const [localization, config, twStudents, cnStudents, equipment] = await Promise.all([
      fetchData('tw/localization.min.json'),
      fetchData('config.min.json'),
      fetchData('tw/students.min.json'),
      fetchData('cn/students.min.json'),
      fetchData('tw/equipment.min.json'),
    ]);

    preloadedData = {
      localization,
      config,
      twStudents,
      cnStudents,
      equipment,
    };
  } catch (error) {}
}

// 優化的數據獲取函數
export const getLocalizationData = () => {
  if (preloadedData.localization) {
    return Promise.resolve(preloadedData.localization);
  }
  return fetchData('tw/localization.min.json');
};

export const getConfigData = () => {
  if (preloadedData.config) {
    return Promise.resolve(preloadedData.config);
  }
  return fetchData('config.min.json');
};

export const getTWStudentsData = () => {
  if (preloadedData.twStudents) {
    return Promise.resolve(preloadedData.twStudents);
  }
  return fetchData('tw/students.min.json');
};

export const getCNStudentsData = () => {
  if (preloadedData.cnStudents) {
    return Promise.resolve(preloadedData.cnStudents);
  }
  return fetchData('cn/students.min.json');
};

export const getEquipmentData = () => {
  if (preloadedData.equipment) {
    return Promise.resolve(preloadedData.equipment);
  }
  return fetchData('tw/equipment.min.json');
};

export const getGamekeeStudentsData = () => fetchGamekeeData();
export const getGamekeeStudentData = (studentId: string) => fetchGamekeeStudentData(studentId);

// 統一的翻譯映射獲取（優化版本）
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

// 優化的學生數據處理
async function getStudentData(id: string) {
  const students = await getTWStudentsData();
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

// 優化的抽卡數據獲取
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

  // 並行獲取所有學生數據
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

// 優化的 Kivo 學生數據獲取函數
export async function getKivoStudentsData() {
  const kivoData = await fetchKivoData('students/?page=1&page_size=10000');
  return kivoData.data;
}

// 優化的根據學生 ID 獲取 CN FamilyName 和 PersonalName 找到在 Kivo 中該學生 ID
export async function getKivoStudentDataByCNName(studentId: string) {
  const [students, kivoData] = await Promise.all([getCNStudentsData(), getKivoStudentsData()]);

  const student = students[studentId];
  const skinName = student.Name.match(/\(([^)]+)\)/)?.[1] || student.Name.match(/\（([^)]+)\）/)?.[1];

  const kivoStudent = kivoData.students.find((s: any) => s.family_name_cn === student.FamilyName && s.given_name_cn === student.PersonalName && (skinName ? s.skin_cn === skinName : true));

  if (!kivoStudent) {
    throw new Error(`Kivo student not found for CN student ID: ${studentId}`);
  }

  const kivoStudentData = await fetchKivoData(`students/${kivoStudent.id}`);
  return kivoStudentData.data;
}

// GameKee 學生別名獲取函數
export async function getGamekeeStudentAliases(): Promise<Record<string, string[]>> {
  const gamekeeData = await getGamekeeStudentsData();
  return gamekeeData.studentAliasList;
}

// 優化的根據學生 DevName 找到 GameKee 中該學生 ID
export async function getGamekeeStudentDataByDevName(devName: string): Promise<any> {
  const gamekeeData = await getGamekeeStudentsData();
  const studentAliases = gamekeeData.studentAliasList;
  const lowerDevName = devName.toLowerCase();

  // 使用更高效的搜索
  const foundStudent = Object.entries(studentAliases).find(([id, aliases]) => aliases.some((alias) => alias.toLowerCase().includes(lowerDevName)));

  if (foundStudent) {
    return await getGamekeeStudentData(foundStudent[0]);
  }

  return {};
}

// 導出緩存管理器，方便外部監控和管理
export { cacheManager };
