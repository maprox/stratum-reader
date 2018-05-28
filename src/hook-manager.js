const Hook = require('./model/hook');
const Message = require('./model/message');

class HookManager {
    constructor() {
        this.hooks = [];
    }

    /**
     * @param {Hook} hook
     * @return {Hook}
     */
    addHook(hook) {
        this.hooks.push(hook);
        return hook;
    }

    /**
     * @param {Message} message
     */
    handle(message) {
        this.hooks.forEach((hook) => {
            hook.handle(message);
        });
    }
}

module.exports = new HookManager();