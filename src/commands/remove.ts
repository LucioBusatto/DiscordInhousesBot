import { CommandDefinition } from "../models/Command";
import { databaseService } from "../services/database.service";
import { queue } from "../app";

const remove: CommandDefinition = {
  name: "remove",
  alias: [],
  description: "This commands removes player from queue",
  action: async (interaction) => {
    const player = await databaseService.findPlayer(interaction.user.id);
    let message = `Player ${interaction.user.username} is not registered`;

    if (player) {
      const removed = queue.removePlayer(player);
      message = removed
        ? `Player ${interaction.user.username} was removed from Queue`
        : `Player ${interaction.user.username} was not in the queue`;
    }

    return await interaction.reply(message);
  },
};

export default remove;
