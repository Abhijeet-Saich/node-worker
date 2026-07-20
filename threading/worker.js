import { parentPort, workerData } from "worker_threads";

// This below worker implementation dies after completion of work 

// let sum = 0;
// console.log(workerData)
// for (let i = 0; i < workerData.limit; i++) {
//     sum += i;
// }

// parentPort.postMessage(sum);



// ----------------------------


// This worker forever lives
parentPort.on("message", (job) => {

    let sum = 0;

    for (let i = 0; i < job.limit; i++) {
        sum += i;
    }

    parentPort.postMessage(sum);

});
