import {EmbedBuilder} from "discord.js";
import {ICON_ROLES, ICON_URL, ROLES} from "../const";
import {Player} from "../models/Player";

export const renderLobby = (players: Player[]) => {
    const lobbyEmbed = new EmbedBuilder()
        .setTitle(`Archelon Gaming vs. Still Halftime`)
        .setDescription(`Game #34 is about to begin`)
        .setColor("#0099ff")
        .setFooter({
            text: "The Game will start when all players are ready",
            iconURL: ICON_URL,
        });

    ROLES.forEach((role) => {
        const roleIcon = ICON_ROLES[role];
        const [player, otherPlayer] = players.filter(p => p.role === role).sort();

        lobbyEmbed.addFields(
            {
                name: roleIcon,
                value: `${player.name} ${player.ready ? "✅" : "❌"}`,
                inline: true,
            },
            {name: "\u200B", value: "\u200B", inline: true},
            {
                name: roleIcon,
                value: `${otherPlayer.name} ${otherPlayer.ready ? "✅" : "❌"}`,
                inline: true,
            }
        );
    });

    return lobbyEmbed;
}

export const onLobbyExpired = (entry:string, key: Player[]) => {
    console.log(`Deleted lobby ${entry}`);
}