import * as app from "../../app.js"

export default new app.Command({
  name: "select-role",
  only: "SLASH",
  description: "Make react role function in this server",
  userPermissions: ["ADMINISTRATOR"],
  async run(message) {
    const row = new app.MessageActionRow().addComponents(
      new app.MessageSelectMenu()
        .setCustomId("select-role")
        .setMaxValues(1)
        .setMinValues(1)
        .setPlaceholder("Select your roles !")
        .setOptions([
          {
            label: "t1",
            description: "role t1",
            value: "11111",
          },
        ])
    )

    let member = message.member as app.GuildMember
    let channel = await member.guild.channels.fetch(message.channelId)

    if (channel?.isText()) channel.send({ content: "test", components: [row] })
  },
})
