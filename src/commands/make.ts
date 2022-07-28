import * as app from "../app.js"

export default new app.Command({
    name: "make",
    description: "Make plugin",
    userPermissions: ["ADMINISTRATOR"],
    subs: [
        new app.Command({
            name: "react-roles",
            aliases: ["react-role", "roles", "role"],
            description: "Create react roles interface",
            userPermissions: ["ADMINISTRATOR"],
            run(message) {
                const row = new app.MessageActionRow()
                    .addComponents(
                        new app.MessageSelectMenu()
                            .setCustomId('react-roles')
                            .setPlaceholder('Choises t\'es role !')
                            .setMinValues(1)
                            .setMaxValues(2)
                            .addOptions([
                                {
                                    label: "t1",
                                    description: "role",
                                    value: "id1"
                                },
                                {
                                    label: "t2",
                                    description: "role",
                                    value: "id2"
                                },
                            ])
                )

                message.delete()
                message.send({ content: "Tout les roles sont ici !", components: [row] })
            }
        })
    ],
    run(message) {
        let reply = message
        reply.content = `${process.env['BOT_PREFIX']}make --help`
        
        message.client.emit('messageCreate', reply)
    }
})