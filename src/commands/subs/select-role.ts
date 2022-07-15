import * as app from "../../app.js"

type SelectRoleConfig = {
  customId: string
  placeholder: string
  roles: {
    label: string
    description: string
    value: string
  }[]
}

export default new app.Command({
  name: "select-role",
  only: "SLASH",
  description: "Make react role function in this server",
  userPermissions: ["ADMINISTRATOR"],
  async run(message) {
    const config: SelectRoleConfig = await app.config('select-role')

    const row = new app.MessageActionRow().addComponents(
      new app.MessageSelectMenu()
        .setCustomId(config.customId)
        .setMaxValues(config.roles.length)
        .setMinValues(1)
        .setPlaceholder(config.placeholder)
        .setOptions(config.roles)
    )

    let member = message.member as app.GuildMember
    let channel = await member.guild.channels.fetch(message.channelId)

    if (channel?.isText()) channel.send({ content: "test", components: [row] })
  },
})
