const Logger = require('../../logger');

module.exports = () => {
    let numLogs = Logger.clearLogs();
    Logger.log('-------------------------------');
    Logger.log(`Removed ${numLogs} Logs.`);
}