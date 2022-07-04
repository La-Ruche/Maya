import * as app from './app.js'

import "dotenv/config"

const client = new app.discord.Client({
    intents: [app.discord.Intents.FLAGS.GUILDS, app.discord.Intents.FLAGS.GUILD_MESSAGES]
})

client.on('messageCreate', (message) => {
    console.log(message.content)
})

client.login(
    process.env.BOT_TOKEN
)