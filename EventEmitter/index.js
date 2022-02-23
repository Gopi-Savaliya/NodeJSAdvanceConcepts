const express = require('express');
const EventEmitter = require('events');
const app = express();
const event = new EventEmitter();

let cnt = 0;

event.on("countAPI", () => {
    console.log("Count: ",++cnt);
})

app.get('/', (req, res) => {
    res.send("API called");
    event.emit("countAPI");
});

app.get('/search', (req, res) => {
    res.send("Search API called");
    event.emit("countAPI");
});

app.get('/find', (req, res) => {
    res.send("Find API called");
    event.emit("countAPI");
});

app.listen(4500);
