import { CommandDefinition } from "../models/Command";
import { lobbiesCache } from "../services/cache";
import { renderLobby } from "../helpers/discord.helpers";
import { playersMock } from "../mock";

const players = playersMock;

const test: CommandDefinition = {
  name: "test",
  alias: [],
  description: "This commands is for testing",
  action: async (interaction) => {
    const exampleEmbed = renderLobby(players);
    const response = await interaction
      .reply({ embeds: [exampleEmbed] })
      .then((int) => int.fetch());
    lobbiesCache.set(response.id, players);
  },
};

export default test;
