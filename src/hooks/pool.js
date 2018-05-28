const Hook = require('../model/hook');
const hookManager = require('../hook-manager');
const log = require('../logger');
const pool = require('../pool');

class PoolHook extends Hook {
    handle(message) {
        const command = message.getCommand();
        if (command !== 'workers') {
            return;
        }
        pool.setWorkers(message.getValue());
        log.info('Workers count:', pool.getWorkers().length);

        return super.handle(message);
    }
}

module.exports = hookManager.addHook(new PoolHook());