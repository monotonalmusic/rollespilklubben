const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();

let uploadedItems = []; // Array to store uploaded items metadata

// Set storage for Multer
const storage = multer.diskStorage({
    destination: './uploads/', // Folder to store the uploaded files
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    } 
});

// Initialize Multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 } // 10MB file size limit
}).single('image');

// Middleware to parse form fields
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files
app.use(express.static('public'));

// POST route to handle image and event data
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log('Upload Error:', err);
            return res.status(400).send('Error uploading file.');
        }

        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        // Get additional form data (title, event date, description)
        const { title, eventDate, description } = req.body;

        // Check if the additional fields are received
        if (!title || !eventDate || !description) {
            return res.status(400).send('Missing event details.');
        }

        // Save the uploaded data (in memory for now)
        const newItem = {
            filePath: `/uploads/${req.file.filename}`,
            title,
            eventDate,
            description,
        };

        uploadedItems.push(newItem);

        // Respond with the file path and other form data
        res.json(newItem);
    });
});

// DELETE route to delete an uploaded item
app.delete('/delete', (req, res) => {
    const { filePath } = req.query;

    // Find the index of the item to delete
    const index = uploadedItems.findIndex(item => item.filePath === filePath);
    if (index === -1) {
        return res.status(404).send('Item not found.');
    }

    // Remove the file from the file system
    const fileName = path.join(__dirname, filePath);
    fs.unlink(fileName, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
            return res.status(500).send('Error deleting file.');
        }

        // Remove the item from the uploadedItems array
        uploadedItems.splice(index, 1);

        res.sendStatus(200);
    });
});

// Serve the uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// GET route to retrieve all uploaded items
app.get('/uploads-data', (req, res) => {
    res.json(uploadedItems);
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
