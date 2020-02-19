//-- Requires --\\
const DiscordJS = require("discord.js");
const FileSystem = require("fs");
const Enmap = require("enmap");
const Config = require("./config.json");

//-- Create Client \\--
const Client = new DiscordJS.Client();
Client.config = Config;

//-- Event Handler --\\
FileSystem.readdir("./Events/", (err, files) => {
    if (err) return console.log(err); // Error Handling
    //-- Loop Through Files --\\
    files.forEach(file => {
        const Event = require(`./Events/${file}`); // Recieve Event
        let eventName = file.split(".")[0];
        Client.on(eventName, Event.bind(null, Client)); // Supply Event Callback
    });
});

//-- Command List Creation \\--
Client.commands = new Enmap();
Client.config.modules.forEach(mod => {
    FileSystem.readdir(`./Commands/${mod}`, (err, files) => {
        if (err) return console.log(err); // Error Handling
        //-- Loop Through Files --\\
        files.forEach(file => {
            if (!file.endsWith(".js")) return; // Confirm It Is JS File
            const Command = require(`./Commands/${mod}/${file}`); // Get Command
            let commandName = file.split(".")[0];
            Client.commands.set(commandName, Command);
        });
        console.log(`[LOAD EVENT] Loaded ${files.length} Commands From Module ${mod}`);
    });
});

Client.login(Client.config.token);