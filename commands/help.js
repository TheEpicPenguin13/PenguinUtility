/*
 * @author John McAllister (TheEpicPenguin13)
 * @file help.js
 * @description Help command file. The help command gives you info about a specifc command.
 */

const { RichEmbed } = require("discord.js")
const FileSystem = require("fs");

/*
 * Run Event
 * @description Runs when the command is called.
 * @param bot - This gives you access to config file stuff
 * @param message - This gives you the message that was sent.
 * @param args - The arguments of the command.
 */
module.exports.run = (bot, message, args) => {
    const embed = new RichEmbed()
        .setColor("#a3d45b")
        .setAuthor(`${bot.user.username} Help`, bot.user.displayAvatarURL)
        .setFooter(`Requested by ${message.author.tag} at`, message.author.displayAvatarURL)
        .setTimestamp();
    if (args[0]) {
        let command = args[0];
        let cmd;
        if (bot.commands.has(command)) {
            cmd = bot.commands.get(command);
        } else {
            return message.channel.send(`The parameter was invalid, use ${bot.config.prefix}commands to find valid commands.`);
        }
        
        if (!cmd) return message.channel.send(embed.setTitle("Invalid Command").setDescription(`Do \`${bot.config.prefix}help\` for the list of commands.`));
        command = cmd.help;
        embed.setTitle(`${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)} command help`);
        embed.setDescription([
            `> **Command:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}`,
            `> **Description:** ${command.description || "No Description Provided."}`,
            `> **Usage:** ${command.usage ? `\`${bot.config.prefix}${command.usage}\`` : "No Usage."}`,
            `> **Category:** ${command.category ? command.category : "General" || "Misc"}`
        ].join("\n"));

        return message.channel.send(embed);
    }
    const categories = FileSystem.readdirSync("./commands/");
    embed.setDescription([
        `Available commands for ${bot.user.username}.`,
        `The bot prefix is **${bot.config.prefix}**`,
        "`<>` means needed and () it is optional but don't include those."
    ].join("\n"));
    categories.forEach(category => {
        const dir = bot.commands.filter(c => c.help.category.toLowerCase() === category.toLowerCase());
        const capitalize = category.slice(0, 1).toUpperCase() + category.slice(1);

        try {
            if (dir.size === 0) return;
            if (bot.config.owners.includes(message.author.id)) embed.addField(`> ${capitalize}`, dir.map(c => `\`${c.help.name}\``).join(", "));
            else if (category !== "Developer") embed.addField(`> ${capitalize}`, dir.map(c => `\`${c.help.name}\``).join(", "));
        } catch (e) {
            console.error(e);
        }
    });
    return message.channel.send(embed);
}

// Command Help
module.exports.help = {
    name: "help",
    description: "Help command to show what a specific command does",
    usage: "help (command name)",
    category: "Misc"
}