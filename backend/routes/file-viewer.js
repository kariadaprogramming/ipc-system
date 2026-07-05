const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { auth, superAdminOnly } = require('../middleware/auth');

// Get all folders in uploads directory
router.get('/folders', auth, superAdminOnly, async (req, res) => {
    try {
        const uploadsDir = path.join(__dirname, '..', 'uploads');
        
        if (!fs.existsSync(uploadsDir)) {
            return res.json([]);
        }

        const items = fs.readdirSync(uploadsDir, { withFileTypes: true });
        const folders = items
            .filter(item => item.isDirectory())
            .map(folder => ({
                name: folder.name,
                path: `/uploads/${folder.name}`,
                type: 'folder'
            }));

        res.json(folders);
    } catch (error) {
        console.error('Error listing folders:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get files in a specific folder
router.get('/files/:folderName', auth, superAdminOnly, async (req, res) => {
    try {
        const { folderName } = req.params;
        const folderPath = path.join(__dirname, '..', 'uploads', folderName);

        // Security check: ensure the folder is within uploads directory
        const uploadsDir = path.join(__dirname, '..', 'uploads');
        const resolvedFolder = path.resolve(folderPath);
        const resolvedUploads = path.resolve(uploadsDir);

        if (!resolvedFolder.startsWith(resolvedUploads)) {
            return res.status(403).json({ message: 'Access denied' });
        }

        if (!fs.existsSync(folderPath)) {
            return res.status(404).json({ message: 'Folder not found' });
        }

        const items = fs.readdirSync(folderPath, { withFileTypes: true });
        const files = items
            .filter(item => item.isFile())
            .map(file => {
                const filePath = path.join(folderPath, file.name);
                const stats = fs.statSync(filePath);
                return {
                    name: file.name,
                    path: `/uploads/${folderName}/${file.name}`,
                    size: stats.size,
                    created: stats.birthtime,
                    type: 'file'
                };
            });

        res.json(files);
    } catch (error) {
        console.error('Error listing files:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a file
router.delete('/file/:folderName/:fileName', auth, superAdminOnly, async (req, res) => {
    try {
        const { folderName, fileName } = req.params;
        const filePath = path.join(__dirname, '..', 'uploads', folderName, fileName);

        // Security check
        const uploadsDir = path.join(__dirname, '..', 'uploads');
        const resolvedFile = path.resolve(filePath);
        const resolvedUploads = path.resolve(uploadsDir);

        if (!resolvedFile.startsWith(resolvedUploads)) {
            return res.status(403).json({ message: 'Access denied' });
        }

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: 'File not found' });
        }

        fs.unlinkSync(filePath);
        res.json({ message: 'File deleted successfully' });
    } catch (error) {
        console.error('Error deleting file:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
