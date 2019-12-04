const Logger = require('../../logger');

module.exports = () => {
    let numLogs = Logger.deleteLogs();
    Logger.log('-------------------------------');
    Logger.log(`Removed ${numLogs} Logs.`);
}