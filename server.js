import express from "express";

const app = express();

setInterval(() => {
    console.log("Tick", Date.now());
}, 1000);

app.get("/", (req, res) => {
    console.log("Home request");
    res.send("Hello");
});

app.get("/sum", (req, res) => {
    console.log("Heavy request started");

    let sum = 0;

    for (let i = 0; i < 20_000_000_000; i++) {
        sum += i;
    }

    console.log("Heavy request finished");

    res.send(sum.toString());
});

app.listen(3000);