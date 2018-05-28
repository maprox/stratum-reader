const amqp = require('amqplib');
const when = require('when');
const uuid = require('node-uuid');

const config = require('./config');
const log = require('./logger');

/**
 * Returns exchange name
 *
 * @returns {String}
 */
const getExchangeName = () => {
    return config.amqp.exchange;
};

/**
 * Returns exchange promise
 *
 * @param channel
 * @returns {Object}
 */
const getExchange = (channel) => {
    const exchangeName = getExchangeName();
    return channel.assertExchange(
        exchangeName, 'topic', { durable: true }
    )
};

module.exports = {
    /**
     * Sends data
     *
     * @param {Object} message
     */
    send: (message) => {
        log.debug("Connecting to %s", config.amqp.connection);
        amqp.connect(config.amqp.connection).then((conn) => {
            return when(conn.createChannel().then((channel) => {
                const messageId = message.uuid || uuid();
                log.debug("Connected");
                log.debug('Preparing to send %s', messageId);
                return getExchange(channel).then(() => {
                    const now = new Date();
                    channel.publish(
                        getExchangeName(),
                        message.routingKey,
                        new Buffer(JSON.stringify(message.payload)),
                        {
                            contentType: 'application/json',
                            correlationId: messageId,
                            timestamp: now.getTime(),
                            headers: {
                                "date-iso": now.toISOString()
                            }
                        }
                    );
                    log.info("> Sent %s to %s", messageId, message.routingKey);
                    return channel.close();
                });
            })).ensure(() => conn.close());
        }, (err) => {
            log.error('Connect failed: %s', err);
        }).then(null, (err) => {
            log.error('Connect succeeded, but error thrown: %s', err);
        });
    }
};