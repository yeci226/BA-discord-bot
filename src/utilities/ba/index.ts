import axios from 'axios';
const requestUrl = 'https://schaledb.com/data';

export const tacticRoleMap: Record<string, string> = {
  DamageDealer: '輸出',
  Supporter: '支援',
  Tanker: '坦克',
  Healer: '補師',
  Vehicle: '戰術',
};

export const bulletTypeMap: Record<string, string> = {
  Pierce: '貫通',
  Sonic: '振動',
  Explosion: '爆炸',
  Mystic: '神秘',
};

export const bulletTypeColorMap: Record<string, string> = {
  Pierce: '#b26d1f', // 貫通
  Sonic: '#9431a5', // 振動
  Explosion: '#a70c19', // 爆炸
  Mystic: '#216f9c', // 神秘
};

export const armorTypeMap: Record<string, string> = {
  HeavyArmor: '重型',
  LightArmor: '輕型',
  ElasticArmor: '彈性',
  Unarmed: '特殊',
};

export const armorTypeColorMap: Record<string, string> = {
  HeavyArmor: '#b26d1f', // 重型
  LightArmor: '#a70c19', // 輕型
  ElasticArmor: '#9431a5', // 彈性
  Unarmed: '#216f9c', // 特殊
};

const serverNameMap: Record<string, string> = {
  Jp: '日服',
  Global: '國際服',
  Cn: '國服',
};

async function getConfigData() {
  const response = await axios.get(requestUrl + '/config.min.json').then((res) => res.data);
  return response;
}

export async function getStudentsData() {
  const response = await axios.get(requestUrl + '/tw/students.min.json').then((res) => res.data);
  return response;
}

async function getStudentData(id: string) {
  const students = await getStudentsData();
  const student = students[id];
  return {
    id: student.Id,
    name: student.Name,
    tacticRole: student.TacticRole,
    bulletTypeColor: bulletTypeColorMap[student.BulletType],
  };
}

export async function getCurrentGachaData(server: string) {
  const config = await getConfigData();
  const serverConfigData = config.Regions.find((region: any) => region.Name === server);
  const currentGacha = serverConfigData.CurrentGacha[0];
  const characters = await Promise.all(currentGacha.characters.map((id: string) => getStudentData(id)));

  return {
    characters,
    server: serverNameMap[server],
    start: currentGacha.start,
    end: currentGacha.end,
  };
}

export function tomorrowResetTime() {
  // 計算當天上午3:00 (GMT+8)
  const now = new Date();
  const todayReset = new Date(now);
  todayReset.setHours(3, 0, 0, 0);

  // 如果還沒超過今天上午3點，顯示剩餘時間
  if (now < todayReset) {
    const remainingTime = todayReset.getTime() - now.getTime();
    const remainingHours = Math.floor(remainingTime / (1000 * 60 * 60));
    const remainingMinutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));

    const resetTimestamp = Math.floor(todayReset.getTime() / 1000);
    const resetTimeString = `-# <t:${resetTimestamp}:R> (上午3:00 [GMT+8]) 伺服器重置，老師今天上線了嗎？`;

    return resetTimeString;
  }

  // 如果已經超過今天上午3點，顯示隔天重置時間
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(3, 0, 0, 0);

  const resetTimestamp = Math.floor(tomorrow.getTime() / 1000);
  const resetTimeString = `-# <t:${resetTimestamp}:R> (上午3:00 [GMT+8]) 伺服器重置，老師今天上線了嗎？`;

  return resetTimeString;
}
