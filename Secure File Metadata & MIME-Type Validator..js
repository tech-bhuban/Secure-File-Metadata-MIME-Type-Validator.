

const express = require('express');
const multer = require('multer'); // Run: npm install multer
const fs = require('fs');
const app = express();

const upload = multer({ dest: 'uploads/' });
const PORT = 3000;

// Helper: Checking 'Magic Numbers' to verify true file type (Advanced)
const getRealFileType = (buffer) => {
    const header = buffer.toString('hex', 0, 4).toUpperCase();
    switch (header) {
        case '89504E47': return 'image/png';
        case 'FFD8FFDB':
        case 'FFD8FFE0': return 'image/jpeg';
        case '25504446': return 'application/pdf';
        default: return 'unknown/raw';
    }
};

app.post('/analyze', upload.single('file'), (req, res) => {
    if (!req.file) return res.status(400).send('No file uploaded.');

    const filePath = req.file.path;
    
    // Read the first few bytes of the file
    const buffer = fs.readFileSync(filePath);
    const realType = getRealFileType(buffer);

    const stats = {
        originalName: req.file.originalname,
        extensionType: req.file.mimetype,
        actualMimeType: realType,
        sizeInBytes: req.file.size,
        isSafe: req.file.mimetype === realType, // Verification logic
        analyzedAt: new Date().toISOString()
    };

    // Clean up: Delete the file after analysis (Human touch: don't fill the disk)
    fs.unlinkSync(filePath);

    res.json(stats);
});

app.get('/', (req, res) => {
    res.send(`
        <div style="font-family:sans-serif; padding:40px;">
            <h2>🕵️ File Security Analyzer</h2>
            <form action="/analyze" method="post" enctype="multipart/form-data">
                <input type="file" name="file">
                <button type="submit">Verify File Integrity</button>
            </form>
            <p><small>Upload a file to check if its extension matches its binary signature.</small></p>
        </div>
    `);
});

app.listen(PORT, () => console.log(`Analyzer running at http://localhost:${PORT}`));

