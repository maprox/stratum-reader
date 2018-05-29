const WebSocket = require('ws');

const log = require('./logger');
const config = require('./config');
const Message = require('./model/message');
const hookManager = require('./hook-manager');

// register message hooks
require('fs').readdirSync('src/hooks').forEach((hookFile) => require('./hooks/' + hookFile));

const ws = new WebSocket(config.ws.url);

log.info('Connecting to %s', config.ws.url);

ws.on('open', onOpen);
ws.on('message', onMessage);
ws.on('error', onError);
ws.on('close', onClose);

let keepAliveInterval;

const loginMessage = getLoginMessage();
const keepAliveMessage = getKeepAliveMessage();

function onOpen() {
    log.info('Connected.');


    ws.send(loginMessage);
    log.debug('>', loginMessage);

    keepAliveInterval = setInterval(() => {
        ws.send(keepAliveMessage);
        log.debug('>', keepAliveMessage);
    }, 25000);
}

function onMessage(data) {
    log.debug('<', data);
    hookManager.handle(new Message(data));
}

function onError(error) {
    log.error('%s %s', error.code, error.message);
}

function onClose() {
    log.info('Disconnected.');

    if (keepAliveInterval) {
        clearInterval(keepAliveInterval);
        keepAliveInterval = null;
    }
}

/**
 * @return {string}
 */
function getLoginMessage() {
    const message = new Message();
    message.setContent('web:login', config.web.login);
    return message.toString();
}

/**
 * @return {string}
 */
function getKeepAliveMessage() {
    return '2';
}