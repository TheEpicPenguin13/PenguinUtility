/*
 * @author John McAllister (TheEpicPenguin13)
 * @file reload.js
 * @description Reload command file. The reload command essentially restarts the bot.
 */

 const FileSystem = require("fs");
 const { join } = require("path");

 /*
 * Run Event
 * @description Runs when the command is called.
 * @param bot - This gives you access to config file stuff
 * @param message - This gives you the message that was sent.
 * @param args - The arguments of the command.
 */
 module.exports.run = (bot, message, args) => {
    console.clear();
    bot.destroy();
    bot.login(bot.config.token);
    message.channel.send("Bot has been reloaded.");
 }

 module.exports.help = {
     name: "reload",
     aliases: [""],
     description: "reloads the bot",
     usage: "reload",
     category: "Developer"
 }