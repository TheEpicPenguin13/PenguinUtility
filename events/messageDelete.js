const { RichEmbed } = require("discord.js")

module.exports = (client, message) => {
    const embed = new RichEmbed()
        .setColor("#cc3300")
        .setFooter(`${message.author.username}`, message.author.displayAvatarURL)
        .setTitle("Message Deleted")
        .addField("Contents:", message.content)
        .setTimestamp();
    client.channels.get(client.config.loggingChannels["deleted-messages"]).send(embed);
};
