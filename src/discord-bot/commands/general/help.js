const Discord = require("discord.js");

module.exports.run = (client, message, args) => {
    const commandName = args[0];
    switch(args.length) {
        case 0:
            break;
        case 1:
            const cmd = client.commands.get(commandName);
            if (!cmd) return;
            const embed = new Discord.RichEmbed()
            .setTitle(`Help For The Command ${cmd.config.name || "No Name Given"}`)
            .setDescription(`${cmd.config.description || "No Description Given"}`)
            .addField("Aliases", `${cmd.config.aliases.length > 0 ? cmd.config.aliases : "No Aliases Given"}`)
            .addField("Permission Level", `${cmd.config.permissionLevel || "No Permission Level Specified"}`)
            .addField("Category", `${cmd.config.category || "No Category Specified"}`);
            message.channel.send({embed});
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