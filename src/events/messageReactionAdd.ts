import { lobbiesCache } from "../services/cache";
import { renderLobby } from "../helpers/discord.helpers";
import { discordService } from "../services/discord.service";
const { Events } = require("discord.js");

export const messageReactionAdd = {
  name: Events.MessageReactionAdd,
  async execute(reaction, user) {
    const lobby = lobbiesCache.get(reaction.message.id);
    if (!lobby) {
      return;
    }
    const player = lobby.find((p) => p.id_discord == user.id);

    if (player) {
      if (reaction._emoji.name === "✅") {
        player.ready = true;
        const playersReady = lobby.filter((player) => player.ready === true);
        if (playersReady.length === 10) {
          discordService.sendNewMatchMessage(lobby);
        }
      } else if (reaction._emoji.name === "❌") {
        player.ready = false;
      }
    }
    reaction.message.edit({ embeds: [renderLobby(lobby)] });
  },
};
