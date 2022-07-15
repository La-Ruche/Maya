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
        await app.subs('select-role')
    ]
})