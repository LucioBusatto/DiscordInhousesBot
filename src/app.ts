import {config} from "dotenv";
import {Client, GatewayIntentBits, Partials} from "discord.js";
import {events} from "./events";
import {registerCommands} from "./services/commands-service";
import * as mongoose from "mongoose";
import {Queue} from "./models/Queue";

export let env;
export const queue = new Queue();

try {
    config();
    env = process.env;
    mongoose.connect(env.MONGODB).then();

    const client = new Client({
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

    for (const event of events) {
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }

    client.login(env.TOKEN);

} catch (err) {
    console.log(err);
}
