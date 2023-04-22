import { CommandDefinition } from "../models/Command";
import { queue } from "../app";
import { queuedPlayers } from "../helpers/discord.helpers";

const queued: CommandDefinition = {
  name: "queued",
  alias: [],
  description: "This commands show players in queue",
  action: async (interaction) => {
    const lobbyEmbed = queuedPlayers(queue.getPlayers());
    await interaction.reply({ embeds: [lobbyEmbed] });
  },
};

export default queued;
