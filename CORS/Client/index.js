const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();

app.get('/',  (req, res) => {
    // let con = await fetch('http://localhost:5000/data');
    // if(con.status === 200){
    //     let data = await con.json(); 
    //     res.send(data);
    // }
    fetch('http://localhost:5000/data')
    .then(resp => resp.json())
    .then(data => res.send(data));
});

app.listen(3000);