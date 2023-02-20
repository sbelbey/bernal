const log4js = require('log4js');
const path = require('path');

module.exports = {
  config() {
    log4js.configure({
      appenders: {
        console: { type: 'console' },
        documentErrors: {
          type: 'file',
          filename: path.resolve(__dirname, '../logs', 'errors.log'),
        },
        documentDebug: { type: 'file', filename: path.resolve(__dirname, '../logs', 'logDebug.log') },
        loggerConsole: {
          type: 'logLevelFilter',
          appender: 'console',
          level: 'info',
        },
        loggerErrors: {
          type: 'logLevelFilter',
          appender: 'documentErrors',
          level: 'warn',
        },
        loggerDebug: {
          type: 'logLevelFilter',
          appender: 'documentDebug',
          level: 'debug',
        },
      },
      categories: {
        default: {
          appenders: ['loggerConsole'],
          level: 'all',
        },
        production: {
          appenders: ['loggerErrors', 'loggerDebug'],
          level: 'all',
        },
      },
    });
  },
};
