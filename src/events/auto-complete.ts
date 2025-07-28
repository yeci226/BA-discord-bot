import { Events, Interaction } from 'discord.js';

import { database, client } from '@/index';

client.on(Events.InteractionCreate, async (interaction: Interaction) => {
  if (!interaction.isAutocomplete()) return;

  const focusedOption = interaction.options.getFocused(true);

  const { name: optionName } = focusedOption;

  if (optionName == 'account') {
    const userAccounts = await database.get(`${interaction.user.id}.account`);
    if (!userAccounts) return;

    const choices = [];
    for (const account of userAccounts) {
      choices.push({
        name: `${account.uid} ${account.nickname ? `- ${account.nickname}` : ''}`,
        value: `${userAccounts.indexOf(account)}`,
      });
    }

    await interaction.respond(choices);
  }
});
