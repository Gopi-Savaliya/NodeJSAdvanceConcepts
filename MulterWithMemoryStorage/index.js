const express = require('express');
const multer = require('multer');
const app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('uploaded_file'), (req, res) => {
    res.send(req.file.originalname);
});

app.post('/uploadfiles', upload.array('uploaded_files'), (req, res) => {
    res.send(req.files.map((file) => file.originalname));
})

app.listen(5000);
