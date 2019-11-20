const Discord = require("discord.js");

module.exports.run = (client, message, args) => {
    const memUsage = process.memoryUsed().heapUsed / 1024 / 1024;
    const embed = new Discord.RichEmbed()
    .setTitle("--/ Settings \\--")
    .addField("Memory Usage", `${Math.round(memUsage * 100) / 100} MB`);
    message.channel.send({embed});
}

module.exports.config = {
    name: "stats",
    aliases: ["botStats", "statistics"],
    permissionLevel: 6,
    category: "System"
}