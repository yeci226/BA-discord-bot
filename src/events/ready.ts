import { Events, ActivityType } from 'discord.js';
import { client, cluster } from '@/index.js';
import { startForumChecker } from '@/events/forum-checker.js';
import Logger from '@/utilities/core/logger.js';

async function updatePresence() {
  const results = await cluster.broadcastEval((c) => c.guilds.cache.size);
  const totalGuilds = results.reduce((prev, val) => prev + val, 0);

  client.user?.setPresence({
    activities: [{ name: `${totalGuilds} 個伺服器`, type: ActivityType.Watching }],
    status: 'online',
  });
}

client.on(Events.ClientReady, async () => {
  new Logger('系統').success(`${client.user?.tag} 已經上線！`);
  setInterval(updatePresence, 10000);
  startForumChecker();
});
