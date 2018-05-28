const log = require('../logger');

/**
 * Message class
 *
 * @constructor
 */
class Message {
    /**
     * @param {string} [data]
     */
    constructor(data) {
        this.parse(data);
    }

    /**
     * @param {string} data
     */
    parse(data) {
        if (!data) {
            return;
        }

        const parts = data.match(/^(\d+)(.*)/);
        if (parts.length !== 3) {
            log.warn('Unknown data format', data);
            return;
        }

        const type = parts[1];
        this.setType(type);

        let payload;
        try {
            payload = parts[2] && JSON.parse(parts[2]);
        } catch (e) {
            log.warn('Unknown payload format', parts[2]);
            payload = [];
        }
        if (payload.length !== 2) {
            return;
        }

        const command = payload[0];
        const value = payload[1];

        this.setCommand(command);
        this.setValue(value);
        return this;
    }

    setType(type) {
        this.type = type;
        return this;
    }

    getType() {
        return this.type || 0;
    }

    setCommand(value) {
        this.command = value;
        return this;
    }

    getCommand() {
        return this.command;
    }

    setValue(value) {
        this.value = value;
        return this;
    }

    getValue() {
        return this.value;
    }

    /**
     *
     * @param {string} command
     * @param {object} value
     * @param {number} [type]
     */
    setContent(command, value, type) {
        this.setCommand(command);
        this.setValue(value);
        this.setType(type || 42);
        return this;
    }

    toString() {
        return this.getType() + JSON.stringify([
            this.getCommand(),
            this.getValue()
        ]);
    }
}

module.exports = Message;