import { CommandDefinition } from "../models/Command";
import {databaseService} from "../services/database.service";

const register: CommandDefinition = {
    name: "register",
    alias: [],
    description: "This commands registers a new player",
    action: async (interaction) => {
            const saved = await databaseService.createPlayer(interaction.user);
            if(saved){
                return await interaction.reply(`Player ${saved.name} registered correctly`)
            }

                return await interaction.reply("A player can't register two times")
    },
};

export default register;