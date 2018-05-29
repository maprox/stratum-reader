module.exports = {
    ws: {
        url: process.env.WS_URL
    },
    web: {
        login: process.env.WEB_LOGIN
    },
    log: {
        level: process.env.LOG_LEVEL || 'debug',
        format: process.env.LOG_FORMAT || '[%t] %l:'
    },
    /**
     * AMQP connection string
     * Currently tested and supported only RabbitMQ server
     *
     * @type {*|string}
     */
    amqp: {
        exchange: process.env.AMQP_EXCHANGE || 'stratum',
        connection: process.env.AMQP_CONNECTION ||
            'amqp://guest:guest@127.0.0.1//'
    }
};