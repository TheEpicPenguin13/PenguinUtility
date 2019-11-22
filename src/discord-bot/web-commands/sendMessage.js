const Logger = require('../../logger');

module.exports = (client, channelName, message) => {
    const channel = client.channels.find(channel => channel.name === channelName);
    if (!channel) return;
    client.channels.get(channel.id).send(message);
    Logger.log(`[Web Command Logs] Sent "${message}" Via ${client.config.system.website} In #${channelName}`)
    return;
}