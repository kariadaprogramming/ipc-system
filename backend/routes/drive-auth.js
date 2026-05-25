const express = require('express');
const router = express.Router();
const { auth, superAdminOnly } = require('../middleware/auth');
const { 
  initializeOAuth, 
  getAuthUrl, 
  saveToken, 
  isAuthenticated,
  listFolders,
  createFolder
} = require('../config/google-drive-oauth');
const db = require('../config/database');

// Check OAuth status
router.get('/status', auth, superAdminOnly, async (req, res) => {
  try {
    const oauthClient = initializeOAuth();
    const authenticated = isAuthenticated();
    
    res.json({
      initialized: oauthClient !== null,
      authenticated: authenticated,
      authUrl: authenticated ? null : (oauthClient ? getAuthUrl() : null)
    });
  } catch (error) {
    console.error('OAuth status error:', error);
    res.status(500).json({ 
      initialized: false,
      authenticated: false,
      error: error.message 
    });
  }
});

// Get authorization URL
router.get('/authorize', auth, superAdminOnly, async (req, res) => {
  try {
    const authUrl = getAuthUrl();
    res.json({ authUrl });
  } catch (error) {
    console.error('Get auth URL error:', error);
    res.status(500).json({ message: error.message });
  }
});

// OAuth callback
router.get('/callback', async (req, res) => {
  const { code, error } = req.query;
  
  if (error) {
    return res.status(400).json({ message: 'Authorization failed: ' + error });
  }

  if (!code) {
    return res.status(400).json({ message: 'No authorization code provided' });
  }

  try {
    await saveToken(code);
    res.send(`
      <html>
        <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
          <h1 style="color: #28a745;">✅ Authorization Successful!</h1>
          <p>Your Google Drive has been connected successfully.</p>
          <p>You can close this window and return to the application.</p>
          <script>
            setTimeout(() => window.close(), 3000);
          </script>
        </body>
      </html>
    `);
  } catch (error) {
    console.error('Save token error:', error);
    res.status(500).send(`
      <html>
        <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
          <h1 style="color: #dc3545;">❌ Authorization Failed</h1>
          <p>Error: ${error.message}</p>
          <p>Please try again.</p>
        </body>
      </html>
    `);
  }
});

// List Drive folders
router.get('/folders', auth, superAdminOnly, async (req, res) => {
  try {
    if (!isAuthenticated()) {
      return res.status(401).json({ message: 'Not authenticated with Google Drive' });
    }

    const folders = await listFolders();
    res.json(folders);
  } catch (error) {
    console.error('List folders error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Create folder and save to database
router.post('/setup-folder', auth, superAdminOnly, async (req, res) => {
  try {
    if (!isAuthenticated()) {
      return res.status(401).json({ message: 'Not authenticated with Google Drive' });
    }

    const { type, folderName } = req.body;
    const validTypes = ['prestasi', 'event', 'organisasi', 'pelanggaran', 'perilaku'];
    
    if (!validTypes.includes(type)) {
      return res.status(400).json({ message: 'Invalid folder type' });
    }

    // Create folder in Drive
    const folder = await createFolder(folderName);
    const folderUrl = `https://drive.google.com/drive/folders/${folder.id}`;

    // Save to database
    await db.query(
      'UPDATE drive_links SET drive_url = ? WHERE type = ?',
      [folderUrl, type]
    );

    res.json({
      message: 'Folder created successfully',
      folderId: folder.id,
      folderUrl: folderUrl
    });
  } catch (error) {
    console.error('Setup folder error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Manual save folder URL
router.put('/folder/:type', auth, superAdminOnly, async (req, res) => {
  try {
    const validTypes = ['prestasi', 'event', 'organisasi', 'pelanggaran', 'perilaku'];
    if (!validTypes.includes(req.params.type)) {
      return res.status(400).json({ message: 'Invalid folder type' });
    }

    const { folderId } = req.body;
    if (!folderId) {
      return res.status(400).json({ message: 'Folder ID is required' });
    }

    const folderUrl = `https://drive.google.com/drive/folders/${folderId}`;
    
    await db.query(
      'UPDATE drive_links SET drive_url = ? WHERE type = ?',
      [folderUrl, req.params.type]
    );

    res.json({
      message: 'Folder URL saved successfully',
      folderUrl: folderUrl
    });
  } catch (error) {
    console.error('Save folder error:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
