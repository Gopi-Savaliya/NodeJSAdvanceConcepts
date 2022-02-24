const express = require('express');
const multer = require('multer');
const app = express();

const storage = multer.diskStorage({
    destination: (req, file, callback) => { 
        callback(null, "uploads")
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + file.originalname)
    }
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("uploaded_file"), (req, res) => {
    res.send(req.file);
});

app.post('/uploadfiles', upload.array('files'), (req, res) => {
    res.send(req.files);
});

app.listen(4500);
