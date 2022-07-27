import discord from "discord.js"
import path from "path"

import * as handler from "@ghom/handler"

import { REST } from "@discordjs/rest"
import { SlashCommandBuilder } from "@discordjs/builders"

export const slashHandler = new handler.Handler(
  process.env.BOT_COMMANDS_PATH ?? path.join(process.cwd(), "dist", "slash")
)

slashHandler.on("load", async (filepath: string) => {
  const file = await import("file://" + filepath)
  const item: SlashCommand<any> = file.default
  slashCommandsForDeploy.push(item.options.builder)
  return slashCommands.push(item)
})

export const slashCommands: SlashCommand<any>[] = []
const slashCommandsForDeploy: discord.ApplicationCommandData[] = []

export const rest = new REST({ version: "9" }).setToken(
  process.env.BOT_TOKEN as string
)

export const deploySlashCommand = async (client: discord.Client<true>) => {
  client.application.commands.set(slashCommandsForDeploy, process.env.BOT_DEFAULT_GUILD as string)
}

/**
 * todo: Build context from builder arguments typings
 */
export type SlashCommandArguments<Base extends SlashCommandBuilder> = {
  builder: discord.ApplicationCommandData,
  subs?: SlashCommandSubs<Base>[],
  run: (
    this: SlashCommand<Base>,
    context: discord.CommandInteraction
  ) => unknown
}

export type SlashCommandSubs<Base extends SlashCommandBuilder> = {
  name: string,
  run: (
    this: SlashCommand<Base>,
    context: discord.CommandInteraction
  ) => unknown
}

export type SlashCommandContext<
  Base extends SlashCommandBuilder,
  Interaction extends discord.CommandInteraction
> = Interaction & {
  args: SlashCommandArguments<Base>
}

export class SlashCommand<Base extends SlashCommandBuilder> {
  /**
   * @deprecated
   */
  public filepath = ""

  /**
   * @deprecated
   */
  public native = false

  constructor(public readonly options: SlashCommandArguments<Base>) {}

  run(context: SlashCommandContext<Base, any>) {
    this.options.run.bind(this)(context)
  }
}
