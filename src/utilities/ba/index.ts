import axios from 'axios';
const requestUrl = 'https://schaledb.com/data';

const bulletTypeColorMap: Record<string, string> = {
  Pierce: '#b26d1f',
  Sonic: '#9431a5',
  Explosion: '#a70c19',
  Mystic: '#216f9c',
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

async function getStudentsData() {
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
  // 計算隔天重置時間 (GMT+8)
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // 設置為隔天上午3:00 (GMT+8)
  tomorrow.setHours(3, 0, 0, 0);

  const resetTimestamp = Math.floor(tomorrow.getTime() / 1000);
  const resetTimeString = `-# <t:${resetTimestamp}:R> (上午3:00 [GMT+8]) 伺服器重置，老師今天上線了嗎？`;

  return resetTimeString;
}
