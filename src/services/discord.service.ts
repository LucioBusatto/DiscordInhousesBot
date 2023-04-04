import {CHANNEL_ID_MATCHS} from "../const";
import {client} from "../app";
import {renderLobby} from "../helpers/discord.helpers";
import {lobbiesCache} from "./cache";

export class discordService {
    static async sendNewLobbyMessage(players: any[]) {
        const channel = await client.channels.fetch(CHANNEL_ID_MATCHS)
        const lobbyEmbed = renderLobby(players);

        channel.send({embeds: [lobbyEmbed]}).then(sent => {
            lobbiesCache.set(sent.id, players);
        });
    }
}