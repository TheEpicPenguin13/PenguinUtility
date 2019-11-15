module.exports = (client, channelName, message) => {
    const channel = client.channels.find(channel => channel.name === channelName);
    if (!channel) return;
    client.channels.get(channel.id).send(message);
    return;
}