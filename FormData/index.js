const express = require('express');
const multer = require('multer');
const app = express();

app.set('view engine', 'ejs');

const storage = multer.diskStorage({
    destination: (req, file, callback) => { 
        callback(null, "uploads")
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + file.originalname)
    }
});

const upload = multer({ storage: storage });

//single file upload
app.get('/singleFileUpload',(req, res) => {
    res.render('singleFileForm');
});

app.post('/addSingleData', upload.single("File"), (req, res) => {
    console.log(req.body.Title);
    res.send(req.file.filename);
});

//multiple file upload

app.get('/multipleFileUpload', (req, res) => {
    res.render('multipleFileForm');
});

app.post('/addMultiData', upload.array('Files'), (req, res) => {
    console.log(req.body.Title);
    res.send(req.files.map((file) => file.filename));
});

//without file

app.get('/form',(req, res) => {
    res.render('form');
});

app.post('/addData', upload.single("File"), (req, res) => {
    res.send("Welcome " + req.body.firstName + " " + req.body.lastName);
});
    
app.listen(4500);
