import { CommandDefinition } from "../models/Command";
import {mongooseService} from "../services/mongoose-service";

const register: CommandDefinition = {
    name: "register",
    alias: [],
    description: "This commands registers a new player",
    action: async (interaction) => {
            const saved = await mongooseService.createPlayer(interaction.user);
            if(saved){
                await interaction.reply(`Player ${interaction.user.username} registered correctly`)
            }else {
                await interaction.reply("A player can't register two times")
            }
    },
};

export default register;