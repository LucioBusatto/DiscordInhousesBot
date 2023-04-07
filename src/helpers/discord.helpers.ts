import {EmbedBuilder} from "discord.js";
import {ICON_ROLES, ICON_URL, ROLES} from "../const";
import {Player} from "../models/Player";

export const renderLobby = (players: Player[]) => {
    const lobbyEmbed = new EmbedBuilder()
        .setTitle(`New In-House Lobby`)
        .setDescription(`React with "✅" to accept game or "❌" to decline`)
        .setColor("#0099ff")
        .addFields(
            {
                name: '🟦',
                value: `BLUE TEAM`,
                inline: true,
            },
            {name: "\u200B", value: "\u200B", inline: true},
            {
                name: '🟥',
                value: `RED TEAM`,
                inline: true,
            }
        )
        .setFooter({
            text: "The Game will start when all players are ready, otherwise it will be cancel after 5 minutes",
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

export const queuedPlayers = (players: Player[]) => {
    const queueEmbed = new EmbedBuilder()
        .setTitle(`Currently in Queue`)
        .setDescription(`This players are looking for a match`)
        .setColor("#0099ff")
        .setFooter({
            text: "When the required number of players is reached, a new lobby will be created in #lobbies",
            iconURL: ICON_URL,
        });
    players.sort((a, b) => (a.role > b.role) ? 1 : -1);

    players.forEach((player) => {
        const roleIcon = ICON_ROLES[player.role];

        queueEmbed.addFields(
            {
                name: roleIcon,
                value: `${player.name}`,
                inline: false,
            })
    });

    return queueEmbed;
}

export const renderMatch = (players: Player[], id) => {
    const matchEmbed = new EmbedBuilder()
        .setTitle(`MATCH ${id}`)
        .setDescription(`A new match has been confirm`)
        .setColor("#0099ff")
        .addFields(
            {
                name: '🟦',
                value: `BLUE TEAM`,
                inline: true,
            },
            {
                name: "\u200B",
                value: "\u200B",
                inline: true},
            {
                name: '🟥',
                value: `RED TEAM`,
                inline: true,
            }
        )
        .setFooter({
            text: "When match ends use /result with match id for inform match result",
            iconURL: ICON_URL,
        });

    ROLES.forEach((role) => {
        const roleIcon = ICON_ROLES[role];
        const [player, otherPlayer] = players.filter(p => p.role === role).sort();

        matchEmbed.addFields(
            {
                name: roleIcon,
                value: `${player.name}`,
                inline: true,
            },
            {
                name: "\u200B",
                value: "\u200B",
                inline: true
            },
            {
                name: roleIcon,
                value: `${otherPlayer.name}`,
                inline: true,
            }
        );
    });

    return matchEmbed;
}

export const onLobbyExpired = (entry: string, key: Player[]) => {
    console.log(`Deleted lobby ${entry}`);
}