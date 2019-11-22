const Logger = require('../logger');

module.exports = function () {
    const FileSystem = require("fs");
    const Discord = require("discord.js");

    const Client = new Discord.Client();
    Client.config = require("./config");
    Client.commands = new Discord.Collection();
    Client.aliases = new Discord.Collection();

    const modules = Client.config.system.modules;
    modules.forEach(c => {
        FileSystem.readdir(`${__dirname}/commands/${c}/`, (err, files) => {
            if (err) console.warn(`${err}`.red);
            console.log(`[Command Logs] Loaded ${files.length} commands of module ${c}.`.debug);
            Logger.log(`[Command Logs] Loaded ${files.length} command of module ${c}.`);
            files.forEach(f => {
                const props = require(`${__dirname}/commands/${c}/${f}`);
                Client.commands.set(props.config.name, props);
                props.config.aliases.forEach(alias => {
                    Client.aliases.set(alias, props.config.name);
                });
            });
        });
    });

    FileSystem.readdir(`${__dirname}/events/`, (err, files) => {
        if (err) throw err;
        files.forEach(f => {
            const event = require(`${__dirname}/events/${f}`);
            let eventName = f.split(".")[0];
            Client.on(eventName, event.bind(null, Client));
        });
    });

    Client.login(Client.config.token);

    return Client;
}