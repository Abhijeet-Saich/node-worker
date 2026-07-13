import { parentPort, workerData } from "worker_threads";

let sum = 0;
console.log(workerData)
for (let i = 0; i < workerData.limit; i++) {
    sum += i;
}

parentPort.postMessage(sum);