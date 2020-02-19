module.exports.run = (client, message, args) => {
    message.channel.send("Pinging...").then((m => {
        let ping = m.createdTimestamp - message.createdTimestamp;
        let responses = [
            "Oh god, is it bad?",
            "Is it that bad?",
            "Just get a better computer already."
        ]
        let response = responses[Math.floor(Math.random() * responses.length)];
        m.edit(`${response}\nBot Latency: **${ping} ms**, API Latency: **${client.ping} ms**`);
    }));
}

module.exports.config = {
    name: "ping",
    description: "Gets client and API Latency"
}