import { ApplicationCommandOptionType, ChannelType, EmbedBuilder, Events, MessageFlags, WebhookClient, Interaction, ChatInputCommandInteraction } from 'discord.js';
import { client, commands } from '@/index';

import { failedReply } from '@/utilities';
import Logger from '@/utilities/core/logger';

const webhook = process.env.CMD_WEBHOOK ? new WebhookClient({ url: process.env.CMD_WEBHOOK }) : null;

client.on(Events.InteractionCreate, async (interaction: Interaction) => {
  const interactionUser = interaction.user;
  const interactionGuild = interaction.guild;
  const interactionChannel = interaction.channel;

  if (interactionChannel?.type == ChannelType.DM) return;

  if (interaction.isButton()) {
    await interaction.deferUpdate().catch(() => {});
  }

  if (interaction.isCommand()) {
    const command = commands.slash.get(interaction.commandName);
    if (!command)
      return interaction.followUp({
        content: 'An error has occured',
        flags: MessageFlags.Ephemeral,
      });

    const args: string[] = [];

    for (let option of interaction.options.data) {
      if (option.type === ApplicationCommandOptionType.Subcommand) {
        if (option.name) args.push(option.name);
        option.options?.forEach((x) => {
          if (x.value) args.push(x.value.toString());
        });
      } else if (option.value) args.push(option.value.toString());
    }

    try {
      await command.execute(interaction as ChatInputCommandInteraction, ...args);
      const time = `花費 ${((Date.now() - interaction.createdTimestamp) / 1000).toFixed(2)} 秒`;

      new Logger('指令').command(`${interactionUser.displayName}(${interactionUser.id}) 執行 ${command.data.name} - ${time}`);
      if (webhook) {
        webhook.send({
          embeds: [
            new EmbedBuilder()
              .setTimestamp()
              .setAuthor({
                iconURL: interactionUser.displayAvatarURL({ size: 4096 }),
                name: `${interactionUser.username} - ${interactionUser.id}`,
              })
              .setThumbnail(interactionGuild?.iconURL() ?? null)
              .setDescription(`\`\`\`${interactionGuild?.name} - ${interactionGuild?.id}\`\`\``),
            // .addFields(command.data.name, `${interaction.getSubcommand() ? `> ${interaction.getSubcommand()}` : '\u200b'}`, true),
          ],
        });
      }
    } catch (error: any) {
      new Logger('指令').error(`${interactionUser.displayName}(${interactionUser.id}) 執行 ${command.data.name} - 錯誤訊息：${error.message}`);
      await failedReply(interaction, '哦喲', '好像出了一點小問題，請重試，若問題持續發生，可以截圖下方錯誤訊息並附上錯誤碼 <errorCode> 聯絡開發者，我們會盡快處理', `[${error.code}] ${error.message}`);
    }
  }
  // else if (interaction.isContextMenuCommand()) {
  //   const command = commands.slash.get(interaction.commandName);
  //   if (!command) return;
  //   try {
  //     await command.execute(interaction, userLocale);
  //   } catch (e: any) {
  //     new Logger('指令').error(`錯誤訊息：${e.message}`);
  //     await interaction.reply({
  //       content: '哦喲，好像出了一點小問題，請重試',
  //       flags: MessageFlags.Ephemeral,
  //     });
  //   }
  // }
});
