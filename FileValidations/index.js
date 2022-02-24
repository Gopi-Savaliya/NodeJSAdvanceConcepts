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

const upload = multer({
    storage: storage,
    limits: { fileSize: 0.2 * 1024 * 1024 },
    fileFilter: (req, file, callback) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            callback(null, true);
        } else {
            callback(null, false);
            return callback(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

app.post("/upload", upload.single("uploaded_file"), (req, res) => {
    res.send(req.file);
});

app.post('/uploadfiles', upload.array('files'), (req, res) => {
    res.send(req.files);
});

app.listen(3000);