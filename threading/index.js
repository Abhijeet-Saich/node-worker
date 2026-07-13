import express from "express";
import { Worker } from "worker_threads";

const app = express();

setInterval(() => {
    console.log("Tick", Date.now());
}, 1000);

app.get("/", (req, res) => {
    res.send("Hello");
});

app.get("/sum", (req, res) => {

    console.log("Heavy request started!");

    const worker = new Worker("./worker.js", {
        workerData: {
            limit: 20_000_000_000
        }
    });

    worker.on("message", (result) => {
        res.send(result.toString());
    });

    worker.on("error", (err) => {
        console.error(err);
        res.status(500).send("Worker Error");
    });

    console.log("Heavy request finished!");

});

app.listen(3000,()=>{
    console.log("App is listening in PORT:3000")
});