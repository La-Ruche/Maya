import * as app from './app.js'

import "dotenv/config"

const client = new app.discord.Client({
    intents: [
        app.discord.Intents.FLAGS.GUILDS, 
        app.discord.Intents.FLAGS.GUILD_MESSAGES
    ]
})

app.Handler.load('listeners/', (files) => {
    files.map(async filepath => {
        if (!filepath.endsWith('.js')) return

        const file = await import("./listeners/" + filepath)

        const listener = file.default as app.Listener<any>

        if (listener.once) {
            client.once(listener.event, listener.run)
        } else {
            client.on(listener.event, listener.run)
        }
    })
})

client.login(
    process.env.BOT_TOKEN
)