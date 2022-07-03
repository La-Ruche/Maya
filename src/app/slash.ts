import * as app from "../app.js"

import { REST } from "@discordjs/rest"

const rest = new REST({ version: "9" }).setToken(
  process.env.BOT_TOKEN as string
)

export class SlashCommandBuilder {
  private static builder: any = []
  private static cmdName: string

  public static create(name: string): SlashCommandBuilder
  {
    this.cmdName = name
    this.builder[this.cmdName]['name'] = name;
    return this;
  }

  public static setType(type: number): SlashCommandBuilder
  {
    this.builder[this.cmdName]['type'] = type;
    return this;
  }
}

export function createSlash(
  client: app.Client<true>,
  command: app.ApplicationCommandDataResolvable,
  guildsID?: string[]
) {
  if (!guildsID) {
    client.application.commands.set([command])
    return
  }

  guildsID.forEach(async (guildID) => {
    client.application.commands.set([command], guildID)
  })
}
