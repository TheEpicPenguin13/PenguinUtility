module.exports = function () {
    const FileSystem = require("fs");
    const Discord = require("discord.js");

    const Client = new Discord.Client();
    
    FileSystem.readdir("./src/events/", (err, files) => {
        if (err) return console.error(err);
        files.forEach(file => {
            if (!file.endsWith(".js")) return;
            const event = require(`./events/${file}`);
            let eventName = file.split(".")[0];
            Client.on(eventName, event.bind(null, Client));
            delete require.cache[require.resolve(`./events/${file}`)];
        });
    });

    Client.commands = new Discord.Collection();

    FileSystem.readdir("./src/commands/", (err, files) => {
        if (err) return console.error(err);
        files.forEach(file => {
            if (!file.endsWith(".js")) return;
            let props = require(`./commands/${file}`);
            let commandName = file.split(".")[0];
            console.log(`Attemping to load command ${commandName}`);
            Client.commands.set(commandName, props);
        });
    });

    Client.login("NjMzNTc1NTYyMjcwNDc0MjQw.Xc4EoQ.KxfJkYYOfGXUrsDohYcdgSthjS4");
}