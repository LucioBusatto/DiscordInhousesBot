import { Command } from "../models/Command";
import commands from "../commands";
import { pick } from "lodash";
import { REST, Routes } from "discord.js";

export const getCommand = (commandName: string): Command => {
  const commandDefinition = commands.find(
    (command) =>
      command.name == commandName || command.alias.includes(commandName)
  );

  return new Command(commandDefinition);
};

export async function registerCommands(token: any, clientId) {
  const commandsNameAndDescription = commands.map((command) =>
    pick(command, ["name", "description", "options"])
  );

  const rest = new REST({ version: "10" }).setToken(token);
  await rest.put(Routes.applicationCommands(clientId), {
    body: commandsNameAndDescription,
  });

  console.log(
    `Registered commands successfully: \n${commands
      .map((command) => command.name)
      .join("\n")}`
  );
}
