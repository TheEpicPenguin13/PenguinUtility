const FileSystem = require("fs");

module.exports = {
    log: function(logMessage) {
        const dateString = new Date().toISOString().substring(0, 10);
        const currentDate = new Date();
        const currentMinutes = new Date().getMinutes() < 10 ? `0${new Date().getMinutes().toString()}` : new Date().getMinutes(); 
        const st = `${currentDate.getHours()}:${currentMinutes}`;
        FileSystem.appendFile(`./src/discord-bot/logging/${dateString}.txt`, `${logMessage} [${st}]\n`, (err) => {
            if (err) throw err;
        });
    }
};