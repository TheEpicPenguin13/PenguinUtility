module.exports.run = (client, message, args) => {
    if (message.author.id != "344666620419112963") return;
    for (let i = 0; i < 15; i++)
    {
        message.channel.send("This is spam!");
    }
}