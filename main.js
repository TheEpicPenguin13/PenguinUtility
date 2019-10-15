/*
 * @author John McAllister (TheEpicPenguin13)
 * @file main.js
 * @description The main file which handles all reading and processing of commands
 */

const Discord = require("discord.js");
const Enmap = require("enmap");
const FileSystem = require("fs");

const Client = new Discord.Client();

Client.config = require("./data/config.js");

FileSystem.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        Client.on(eventName, event.bind(null, Client));
    });
});

Client.commands = new Enmap();

FileSystem.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`)
        let commandName = file.split(".")[0];
        console.log(`Attempting to load command ${commandName}`);
        Client.commands.set(commandName, props);
    });
});

// Uses token to use the bot
Client.login(Client.config.token);