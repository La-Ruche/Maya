import * as app from '../app.js'

export default new app.Command({
    name: 'make',
    only: 'SLASH',
    description: "Make a functionnality",
    slash: {
        deploy: {global: false, guilds: ['844641672662351933']},
        builder: {
            name: 'make',
            description: 'Make command',
            options: [
                {
                    type: 1,
                    name: 'select-role',
                    description: 'Make react role function in this server',
                }
            ]
        }
    },
    async run(message) {
        message.send('reply')
    },
    subs: [
        new app.Command({
            name: 'select-role',
            only: 'SLASH',
            description: 'Make react role function in this server',
            userPermissions: ['ADMINISTRATOR'],
            async run(message) {
                const row = new app.MessageActionRow()
                    .addComponents(
                        new app.MessageSelectMenu()
                            .setCustomId('select-role')
                            .setMaxValues(1)
                            .setMinValues(1)
                            .setPlaceholder("Select your roles !")
                            .setOptions([
                                {
                                    label: "t1",
                                    description: "role t1",
                                    value: "11111"
                                }
                            ])
                    )

                message.send({ content: "test", components: [row] })
            }
        })
    ]
})