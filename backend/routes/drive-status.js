const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { auth, superAdminOnly } = require('../middleware/auth');
const db = require('../config/database');
const { extractFolderId, initializeDrive } = require('../config/google-drive');

// Check Drive configuration status
router.get('/config', auth, superAdminOnly, async (req, res) => {
    try {
        const status = {
            serviceAccount: false,
            driveLinks: {},
            overall: false
        };

        // Check service account
        const credentialsPath = path.join(__dirname, '..', 'service-account.json');
        status.serviceAccount = fs.existsSync(credentialsPath);

        // Check Drive API initialization
        if (status.serviceAccount) {
            try {
                const drive = initializeDrive();
                status.driveApiReady = drive !== null;
            } catch (error) {
                status.driveApiReady = false;
                status.driveApiError = error.message;
            }
        }

        // Check drive links
        const types = ['prestasi', 'event', 'organisasi', 'pelanggaran', 'perilaku'];
        for (const type of types) {
            const [config] = await db.query('SELECT drive_url FROM drive_links WHERE type = ?', [type]);
            if (config.length > 0 && config[0].drive_url) {
                const folderId = extractFolderId(config[0].drive_url);
                status.driveLinks[type] = {
                    configured: true,
                    url: config[0].drive_url,
                    folderId: folderId,
                    valid: folderId !== null
                };
            } else {
                status.driveLinks[type] = {
                    configured: false,
                    url: null,
                    folderId: null,
                    valid: false
                };
            }
        }

        // Overall status
        status.overall = status.serviceAccount && 
                        Object.values(status.driveLinks).every(link => link.valid);

        res.json(status);
    } catch (error) {
        console.error('Error checking Drive status:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
