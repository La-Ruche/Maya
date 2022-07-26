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
  if (filepath.endsWith(".native.js")) item.native = true
  item.filepath = filepath
  return slashCommands.push(item)
})

export const slashCommands: SlashCommand<any>[] = []

export const rest = new REST({ version: "9" }).setToken(
  process.env.BOT_TOKEN as string
)

/**
 * todo: Build context from builder arguments typings
 */
export type SlashCommandArguments<Base extends SlashCommandBuilder> = {}

export type SlashCommandContext<
  Base extends SlashCommandBuilder,
  Interaction extends discord.CommandInteraction
> = Interaction & {
  args: SlashCommandArguments<Base>
}

export type SlashCommandOptions<Base extends SlashCommandBuilder> = Base & {
  run: (
    this: SlashCommand<Base>,
    context: SlashCommandContext<Base, any>
  ) => unknown
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

  constructor(public readonly options: SlashCommandOptions<Base>) {}

  run(context: SlashCommandContext<Base, any>) {
    this.options.run.bind(this)(context)
  }
}
