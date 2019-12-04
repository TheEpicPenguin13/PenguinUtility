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
    },

    clearLogs: function() {
        FileSystem.readdirSync(`./src/discord-bot/loggging/`, (err, files) => {
            if (err) {
                console.warn(`${err}`.warn);
            }
            let i = 0
            files.forEach(file => {
                let path = `./src/discord-bot/logging/${file}.txt`;
                FileSystem.unlink(path, (err) => {
                    if (err) return;
                });
                i = i + 1
            });
            return i;
        });
    }
};