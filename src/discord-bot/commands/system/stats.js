const Discord = require("discord.js");

module.exports.run = (client, message, args) => {
    //-- MEMORY USAGE CALCULATIONS --\\
    let type = client.config.system.memoryDisplayType;
    let memUsage;
    if (type == "B") memUsage = process.memoryUsage().heapUsed;
    if (type == "KB") memUsage = process.memoryUsage().heapUsed / 1024;
    if (type == "MB") memUsage = process.memoryUsage().heapUsed / 1024 / 1024;
    if (type == "GB") memUsage = process.memoryUsage().heapUsed / 1024 / 1024 / 1024;
    if (type == "TB") memUsage = process.memoryUsage().heapUsed / 1024 / 1024 / 1024 / 1024;

    //-- TIME CALCULATIONS --\\
    let seconds = Math.floor(client.uptime / 1000);
    let days = Math.floor(seconds / 86400);
    let hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;

    let stringTime = "";
    if (days > 0) stringTime += `${days} Days, `;
    if (hours > 0) stringTime += `${hours} Hours, `;
    if (minutes > 0) stringTime += `${minutes} Minutes, `;
    if (seconds > 0) stringTime += `${seconds} Seconds`;

    //-- EMBED --\\
    const embed = new Discord.RichEmbed()
    .setTitle("--= Settings =--")
    .addField("Memory Usage", `${Math.round(memUsage * 100) / 100} ${type}`)
    .addField("Uptime", stringTime)
    .addField("Current Prefix", client.config.prefix)
    .addField("Node Version", process.version)
    .addField("Bot Version", client.config.system.botVersion);
    message.channel.send({embed});
}

module.exports.config = {
    name: "stats",
    description: "Gives you statistics about the bot.",
    aliases: ["statistics"],
    permissionLevel: 6,
    category: "System"
}