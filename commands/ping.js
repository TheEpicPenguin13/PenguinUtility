module.exports.run = (bot, message, args) => {
    message.channel.send("Pinging...").then(m => {
        let ping = m.createdTimestamp - message.createdTimestamp;
        let choices = ["Is it high? I can't see.", "How bad is it?", "Oh god, it's bad isn't it?"];
        let response = choices[Math.floor(Math.random() * choices.length)];

        m.edit(`${response}\nBot Latency: **${ping}ms**, API Latency: **${Math.round(bot.ping)}ms**`);
    });
}

module.exports.help = {
    name: "ping",
    description: "gets client and server side ping",
    usage: "ping",
    category: "Developer"
}