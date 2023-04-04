import {CommandDefinition} from "../models/Command";
import {playersMock} from "../mock";
import {discordService} from "../services/discord.service";

const players = playersMock;

const prueba: CommandDefinition = {
    name: "prueba",
    alias: [],
    description: "This commands is for testing",
    action: async (interaction) => {
        discordService.sendNewLobbyMessage(players)
    },
};

export default prueba;