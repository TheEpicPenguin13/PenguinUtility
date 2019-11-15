module.exports = function () {
    const FileSystem = require("fs");
    const Discord = require("discord.js");

    const Client = new Discord.Client();
    Client.config = require("./config");
    
    FileSystem.readdir(`${__dirname}/events/`, (err, files) => {
        if (err) return console.error(err);
        files.forEach(file => {
            if (!file.endsWith(".js")) return;
            const event = require(`${__dirname}/events/${file}`);
            let eventName = file.split(".")[0];
            Client.on(eventName, event.bind(null, Client));
            delete require.cache[require.resolve(`${__dirname}/events/${file}`)];
        });
    });

    Client.commands = new Discord.Collection();

    FileSystem.readdir(`${__dirname}/commands/`, (err, files) => {
        if (err) return console.error(err);
        files.forEach(file => {
            if (!file.endsWith(".js")) return;
            let props = require(`${__dirname}/commands/${file}`);
            let commandName = file.split(".")[0];
            console.log(`Attemping to load command ${commandName}`);
            Client.commands.set(commandName, props);
        });
    });

    Client.login(Client.config.token);

    return Client;
}