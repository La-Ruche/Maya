import * as app from '../app.js'

const listener: app.Listener<"interactionCreate"> = {
    event: "interactionCreate",
    description: "For select role or change role",
    async run(interaction) {
        if (!interaction.isSelectMenu() || interaction.customId != 'select-role') return

        interaction.values.map((roleId) => {
            let roles = interaction.member!.roles

            if (roles instanceof app.GuildMemberRoleManager) {
                roles.add(roleId)
            }
        })
    }
}

export default listener