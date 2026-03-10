import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

import { ClusterManager, HeartbeatManager } from 'discord-hybrid-sharding';
import { fileURLToPath } from 'url';
import path from 'path';

import Logger from '@/utilities/core/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 获取当前文件的目录路径
const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = path.dirname(currentFilePath);

/**
 * @description 分片管理器
 */
const clusterManager = new ClusterManager(path.join(currentDirPath, 'index.js'), {
  totalShards: 'auto',
  totalClusters: 'auto',
  mode: 'worker',
  token: process.env.NODE_ENV === 'dev' ? process.env.TEST_TOKEN : process.env.TOKEN,
  restarts: {
    max: 5,
    interval: 1000 * 60 * 60 * 2,
  },
});

clusterManager.extend(new HeartbeatManager({ interval: 2000, maxMissedHeartbeats: 5 }));

clusterManager.on('clusterCreate', (cluster) => {
  cluster.on('ready', () => {
    new Logger('分片').info(`已啟動 Cluster #${cluster.id}`);
    setInterval(
      () => {
        const memory = process.memoryUsage();
        new Logger('系統').info(
          `[Cluster #${cluster.id}] RSS: ${(memory.rss / 1024 / 1024).toFixed(2)}MB, Heap: ${(memory.heapUsed / 1024 / 1024).toFixed(2)}MB`,
        );
      },
      1000 * 60 * 10,
    );
  });

  cluster.on('reconnecting', () => {
    new Logger('分片').info(`重新連接集群 #${cluster.id} 至 Discord WS`);
  });

  cluster.on('death', () => {
    new Logger('分片').info(`重新聚類集群 ${cluster.id}`);
    clusterManager.recluster?.start();
  });
});

process.on('uncaughtException', (error) => {
  try {
    new Logger('集群').error(`未捕獲的異常: ${error}`);
  } catch {}
});

process.on('unhandledRejection', (reason) => {
  try {
    new Logger('集群').error(`未處理的Promise拒絕: ${reason}`);
  } catch {}
});

(async () => {
  try {
    await clusterManager.spawn();
  } catch (error) {
    new Logger('集群').error(`啟動集群失敗: ${error}`);
    process.exit(1);
  }
})();
