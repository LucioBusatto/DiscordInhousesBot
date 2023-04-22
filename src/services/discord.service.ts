import { CHANNEL_ID_LOBBIES, CHANNEL_ID_MATCHES } from "../const";
import { client } from "../app";
import { renderLobby, renderMatch } from "../helpers/discord.helpers";
import { lobbiesCache, matchesCache } from "./cache";
import { databaseService } from "./database.service";

export class discordService {
  static async sendNewLobbyMessage(players: any[]) {
    const channel = await client.channels.fetch(CHANNEL_ID_LOBBIES);
    const lobbyEmbed = renderLobby(players);

    channel.send({ embeds: [lobbyEmbed] }).then((sent) => {
      lobbiesCache.set(sent.id, players);
    });
  }

  static async sendNewMatchMessage(players: any[]) {
    const id = await databaseService.createMatch(players);
    const channel = await client.channels.fetch(CHANNEL_ID_MATCHES);
    const lobbyEmbed = renderMatch(players, id);
    channel.send({ embeds: [lobbyEmbed] });

    matchesCache.set(id.toString(), players);
  }
}
