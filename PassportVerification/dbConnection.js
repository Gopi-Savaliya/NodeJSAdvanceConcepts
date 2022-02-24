const mysql = require('mysql');

const dbconnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Gopusav@1234',
    database: 'users'
});

dbconnection.connect((err) => {
    if(err){
        console.warn(err);
    }
});

module.exports = dbconnection;