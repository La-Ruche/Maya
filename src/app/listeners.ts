import { discord } from "../app.native"
import apiTypes from "discord-api-types/v8.js"

interface MoreClientEvents {
    raw: [packet: apiTypes.GatewayDispatchPayload]
  }
  
type AllClientEvents = discord.ClientEvents & MoreClientEvents

export type Listener<EventName extends keyof AllClientEvents> = {
  event: EventName
  description: string
  run: (
    this: discord.Client<true>,
    ...args: AllClientEvents[EventName]
  ) => any
  once?: boolean
}