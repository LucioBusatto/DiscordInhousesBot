import {config} from "dotenv";
import {Client, GatewayIntentBits, Partials} from "discord.js";
import {nonUniqueEvents, uniqueEvents} from "./events";
import {registerCommands} from "./services/commands.service";
import {Queue} from "./models/Queue";

export let env;
export const queue = new Queue();
export let client;

try {
    config();
    env = process.env;

    client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildMessageReactions,
            GatewayIntentBits.MessageContent,
        ],
        partials: [Partials.Channel, Partials.Message, Partials.Reaction],
    });

    registerCommands(env.TOKEN, env.CLIENT_ID)

    uniqueEvents.forEach(event => client.once(event.name, (...args) => event.execute(...args)));
    nonUniqueEvents.forEach(event => client.on(event.name, (...args) => event.execute(...args)));

    client.login(env.TOKEN);

} catch (err) {
    console.log(err);
}
