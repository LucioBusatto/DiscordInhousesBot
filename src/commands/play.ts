import {CommandDefinition} from "../models/Command";
import {databaseService} from "../services/database.service";
import {queue} from "../app";
import {ApplicationCommandOptionType} from "discord.js";

const play: CommandDefinition = {
    name: "play",
    alias: [],
    description: "This commands joins player into queue",
    options: [
        {
            name: 'role',
            description: 'Selected role for Queue',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: 'Top',
                    value: 'TOP'
                },
                {
                    name: 'Jungle',
                    value: 'JG'
                },
                {
                    name: 'Mid',
                    value: 'MID'
                },
                {
                    name: 'Bot',
                    value: 'BOT'
                },
                {
                    name: 'Supp',
                    value: 'SUPP'
                }
            ]
        }
    ],
    action: async (interaction) => {
        const player = await databaseService.findPlayer(interaction.user.id);
        let message = "Players have to register before play";
        if (player) {
            const added = queue.addPlayer(player, interaction.options.get('role').value);
            message = added ? `Player ${interaction.user.username} added to Queue` : `Player ${interaction.user.username} is already in Queue`
        }

        return await interaction.reply(message)
    },
};

export default play;