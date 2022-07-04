import * as app from '../app'

import figlet from 'figlet'
import chalk from 'chalk'
import boxen from 'boxen'

app.Listener.new({
    name: 'ready',
    once: true,
    run: (client: app.discord.Client) => {
        figlet(client.user!.username, (err, text) => {
            if (err) return console.error(err)
    
            console.log(
                boxen(
                    chalk.yellowBright(text),
                    {
                        float: 'center',
                        borderStyle: {
                            topLeft: " ",
                            topRight: " ",
                            bottomLeft: " ",
                            bottomRight: " ",
                            top: " ",
                            left: " ",
                            right: " ",
                            bottom: " ",
                        },
                    }
                )
            )
        })
    },
})