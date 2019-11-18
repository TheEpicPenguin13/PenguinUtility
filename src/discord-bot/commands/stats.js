const Discord = require("discord.js");

module.exports.run = (client, message, args) => {
    const memUsed = (process.memoryUsage().heapUsed);
    const mbUsed = (memUsed / 1024 / 2024).toFixed(2);
    const embed = new Discord.RichEmbed()
    .setTitle("-- Statistics --")
    .setDescription("The statisics for the bot.")
    .addField("Memory Usage", `${mbUsed} MB\n${memUsed} B`)
    .addField("Up Time", );
    return message.channel.send({embed});
}

module.exports.settings = {
    name: "stats",
    description: "Gets the statistics of the bot.",
    category: "System",
    permissionLevel: 5
}