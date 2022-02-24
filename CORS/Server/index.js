const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}));

// app.options('*',cors({
//     origin: 'http://localhost:3000',
//     optionsSuccessStatus: 200
// }));

app.get('/data', (req, res) => {
    res.json({
        name: 'Gopi Savaliya',
        profession: 'Software Consultant'
    });
});

app.listen(5000);