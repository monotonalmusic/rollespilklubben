const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// Set the storage engine for Multer
const storage = multer.diskStorage({
    destination: './uploads/', // Directory to save uploaded files
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize the upload using Multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 } // 10MB file size limit
}).single('image');

// Serve static files from the "public" directory (this is where your HTML file is)
app.use(express.static('public'));

// POST route to handle image uploads
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(400).send('Error uploading file.');
        } else {
            if (!req.file) {
                res.status(400).send('No file uploaded.');
            } else {
                res.send('File uploaded successfully!');
            }
        }
    });
});

// Start the server
const PORT = process.env.PORT || 3001; // Change to 3001 or any other available port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
