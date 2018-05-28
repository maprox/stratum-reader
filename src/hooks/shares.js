const Hook = require('../model/hook');
const hookManager = require('../hook-manager');
const log = require('../logger');
const pool = require('../pool');
const broker = require('../broker');

class SharesHook extends Hook {
    handle(message) {
        const command = message.getCommand();
        if (command !== 'shares') {
            return;
        }
        const shares = message.getValue().map((share) => {
            share.worker = pool.getWorkerById(share.worker_id);
            return share;
        });
        log.info('Shares received:', shares.length);
        log.debug('Shares objects:', shares);

        broker.send({
            routingKey: 'stratum.shares',
            payload: shares
        });

        return super.handle(message);
    }
}

module.exports = hookManager.addHook(new SharesHook());