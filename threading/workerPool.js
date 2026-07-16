import { worker } from "cluster";
import { resolve } from "dns";
import { Worker } from "worker_threads"

class WorkerPool {

    constructor(size) {

        this.queue = [];
        this.workers = [];

        for (let i = 0; i < size; i++) {
            let worker = new Worker('./worker.js')
            this.workers.push({
                worker,
                busy: false
            })
        }
    }

    async execute(job) {
        let workerInfo = this.findIdleWorker();

        if (workerInfo) {
            return this.assignJob(workerInfo, job)
        }

        return new Promise((resolve, reject) => {

            this.queue.push({
                job,
                resolve,
                reject
            });

        });

    }

    assignJob(workerInfo, job) {

        return new Promise((resolve, reject) => {
            workerInfo.busy = true;

            workerInfo.worker.postMessage(job);

            workerInfo.worker.once('message', (result) => {
                workerInfo.busy = false;
                resolve(result)
            })

            workerInfo.worker.once("error", (err) => {
                workerInfo.busy = false;
                reject(err);
            });
        })
    }


    findIdleWorker() {
        return this.queue.find((w) => !w.busy);
    }

    processQueue(){

        if(this.queue.length == 0) return;
        
        let workerInfo = this.findIdleWorker();
        if(!workerInfo) return ;

        const queuedJob = this.queue.shift();   // pick up the job first in queue
        
    }
}


const pool = new WorkerPool(4);

const result = await pool.execute({
    limit: 100
});

console.log(result);