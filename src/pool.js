class Pool {
    constructor() {
        this.workers = [];
        this.setWorkers();
    }

    getWorkers() {
        return this.workers;
    }

    /**
     * @param {object[]} [workers]
     */
    setWorkers(workers) {
        if (this.workers.length) {
            return this.updateWorkers(workers);
        }

        this.workers = workers || [];
        return this.remapWorkers();
    }

    /**
     * @param {object[]} [workers]
     */
    updateWorkers(workers) {
        workers.forEach((newWorker) => {
            this.workers = this.workers.map((oldWorker) => {
                return (oldWorker.id === newWorker.id) ? newWorker : oldWorker;
            });
        });
        return this.remapWorkers();
    }

    remapWorkers() {
        this.workersMap = {};
        this.getWorkers().forEach((worker) => {
            this.workersMap[worker.id] = worker;
        });
        return this;
    }

    /**
     * @param {number} workerId
     * @return {object}
     */
    getWorkerById(workerId) {
        return this.workersMap[workerId];
    }
}

const pool = new Pool();

module.exports = pool;