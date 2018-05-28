const log = require('loglevel');
const prefix = require('loglevel-plugin-prefix');

const config = require('./config');

prefix.reg(log);
prefix.apply(log, {
    template: '[%t] %l:',
    levelFormatter(level) {
        return level.toUpperCase();
    },
    timestampFormatter(date) {
        return date.toISOString();
    },
});

log.setLevel(config.log.level);

module.exports = log;