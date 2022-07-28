import * as app from "../app.js"

export default new app.SlashCommand({
    builder: {
        type: "USER",
        name: "profile",
    },
    run (i) {
        const option = i.options.data[0]

        const embed = new app.MessageEmbed({
            title: `Profile de ${option.user?.username}`,
            description: 
            `
            > Test
            `,
        })

        i.reply({
            embeds: [embed]
        })
    }
})