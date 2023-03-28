import { CommandDefinition } from "../models/Command";
import {queue} from "../app";

const queued: CommandDefinition = {
    name: "queued",
    alias: [],
    description: "This commands show players in queue",
    action: async (interaction) => {
        const names = queue.players.map(player => player.name);
        const joinedNames = names.join(', ');
        await interaction.reply(`This are the players in queue: ${joinedNames}`)
    },
};

export default queued;