import { CommandDefinition } from "../models/Command";
import { EmbedBuilder } from "discord.js";
import { databaseService } from "../services/database.service";

const profile: CommandDefinition = {
  name: "profile",
  alias: ["me"],
  description: "This commands brings a player profile",
  action: async (interaction) => {
    const player = await databaseService.findPlayer(interaction.user.id);
    if (player) {
      const exampleEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(player.name)
        .setThumbnail(interaction.user.avatarURL())
        .addFields(
          { name: "EL0", value: `${player.elo}` },
          { name: "\u200B", value: "\u200B" },
          { name: "Games", value: `${player.games}` },
          {
            name: "Wins / Loses",
            value: `${player.wins} - ${player.loses}`,
            inline: true,
          }
        );
      await interaction.reply({ embeds: [exampleEmbed] });
    } else {
      await interaction.reply("You have to register first!");
    }
  },
};

export default profile;
