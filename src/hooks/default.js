/**
 * This file is here as an example of message hooks.
 * Feel free to use it as a starting point for your hook.
 * @type {Hook}
 */

const Hook = require('../model/hook');
const hookManager = require('../hook-manager');
const log = require('../logger');

class DefaultHook extends Hook {
    handle(message) {
        // do nothing yet
        return super.handle(message);
    }
}

module.exports = hookManager.addHook(new DefaultHook());