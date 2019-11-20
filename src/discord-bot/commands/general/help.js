const Discord = require("discord.js");

module.exports.run = (client, message, args) => {
    switch(args.length) {
        case 0:
            break;
        case 1:
            const embed = new Discord.RichEmbed()
            .setTitle(`Help For The Command ${args[0]}`)
            .setDescription(``);
            break;
        default:
            message.reply("You have supplied too many commands.");
            break;
    }
}

module.exports.config = {
    name: "help",
    description: "Tells you the commands, and how the command works.",
    aliases: ["h"],
    permissionLevel: 1,
    category: "General"
}