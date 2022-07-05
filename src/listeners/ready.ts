import * as app from '../app.js'

import figlet from 'figlet'
import chalk from 'chalk'
import boxen from 'boxen'

const listener: app.Listener<"ready"> = {
    event: 'ready',
    description: "ready event",
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
}

export default listener