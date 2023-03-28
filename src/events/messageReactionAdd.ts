import { lobbiesCache } from "../services/cache";
import { renderLobby } from "../helpers/discord.helpers";

const { Events } = require("discord.js");

export const messageReactionAdd = {
  name: Events.MessageReactionAdd,
  async execute(reaction, user) {
    const lobby = lobbiesCache.get(reaction.message.id);
    if (!lobby) {
      return;
    }

    const player = lobby.find((p) => p.discordId == user.id);

    if (player) {
      player.ready = true;
      reaction.message.edit({ embeds: [renderLobby(lobby)] });
    }
  },
};
