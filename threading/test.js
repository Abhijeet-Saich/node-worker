import {Worker} from "worker_threads";

const worker = new Worker("./worker.js");

worker.on("message", (result) => {
    console.log("Result:", result);
});

worker.postMessage({ limit: 100 });

setTimeout(() => {
    worker.postMessage({ limit: 200 });
}, 2000);

setTimeout(() => {
    worker.postMessage({ limit: 300 });
}, 4000);