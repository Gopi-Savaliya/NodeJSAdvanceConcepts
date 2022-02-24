const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();

//static Middleware
// console.log(app.use(express.static(path.join(__dirname,'public'))));


//express.json()
app.use(express.json());

//express.urlencoded()
// app.use(express.urlencoded({extended: false}));

//express.compress
app.use(compression({
    level: 6,
    threshold: 10*1000,
    filter: (req, res) => {
        if(req.headers['x-no-compression']){
            return false;
        }
        return compression.filter(req, res);
    }
}));

app.get('/', (req, res) => {
    res.send('Hello world!!!HOW ARE YOU?????'.repeat(10000));
})

app.post('/', (req, res) => {
    res.send("name: "+req.body.firstName+" "+req.body.lastName);
});

app.listen(5000, (err) => {
    err?console.log(err):console.log('Server listening on PORT: 5000');
});
