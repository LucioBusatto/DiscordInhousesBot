import { CommandInteraction } from "discord.js";

export type CommandOptions = {
  name: string;
  description: string;
  type: any;
  required?: boolean;
  choices?: {
    name: string;
    value: string;
  }[];
};

export type CommandDefinition = {
  name: string;
  description: string;
  action: (interaction: CommandInteraction) => void;
  options?: CommandOptions[];
  alias?: string[];
};

export class Command {
  name: string;
  alias: string[];
  description: string;
  options?: CommandOptions[];
  private action: (interaction: CommandInteraction) => void;

  constructor({
    name,
    alias,
    description,
    action,
    options,
  }: CommandDefinition) {
    this.name = name;
    this.alias = alias;
    this.description = description;
    this.action = action;
    this.options = options;
  }

  public execute(interaction: CommandInteraction) {
    try {
      this.action(interaction);
    } catch (err) {
      console.log(err);
      interaction.reply("Something went wrong!");
    }
  }
}