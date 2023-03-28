import { CommandDefinition } from "../models/Command";
import {mongooseService} from "../services/mongoose-service";
import {queue} from "../app";

const play: CommandDefinition = {
    name: "play",
    alias: [],
    description: "This commands joins player into queue",
    action: async (interaction) => {
        const player = await mongooseService.findPlayer(interaction.user);
        if(player){
            const added = queue.addPlayer(player);
            if (added){
                await interaction.reply(`Player ${interaction.user.username} added to Queue`)
            }else {
                await interaction.reply(`Player ${interaction.user.username} is already in Queue`)
            }
        }else {
            await interaction.reply("Players have to register before play")
        }
    },
};

export default play;