const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const credentialsPath = path.join(__dirname, '..', 'oauth-credentials.json');
const tokenPath = path.join(__dirname, '..', 'oauth-token.json');

let auth = null;
let drive = null;

// Initialize Google Drive API using OAuth
const initializeDrive = () => {
  try {
    // Check if both OAuth credentials and token exist
    if (!fs.existsSync(credentialsPath)) {
      console.error('OAuth credentials not found at:', credentialsPath);
      return null;
    }

    if (!fs.existsSync(tokenPath)) {
      console.error('OAuth token not found at:', tokenPath);
      return null;
    }

    const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));
    const token = JSON.parse(fs.readFileSync(tokenPath, 'utf8'));

    const { client_id, client_secret, redirect_uris } = credentials.web;

    // Create OAuth2 client
    auth = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );

    // Set credentials with stored token
    auth.setCredentials({
      access_token: token.access_token,
      refresh_token: token.refresh_token,
      expiry_date: token.expiry_date,
      scope: token.scope,
      token_type: token.token_type
    });

    // Listen for token changes and save them
    auth.on('tokens', (newTokens) => {
      console.log('[Google Drive] Tokens refreshed, saving new tokens...');
      try {
        fs.writeFileSync(tokenPath, JSON.stringify(newTokens, null, 2));
        console.log('[Google Drive] Token saved successfully');
      } catch (error) {
        console.error('[Google Drive] Error saving token:', error);
      }
    });

    drive = google.drive({ version: 'v3', auth });
    console.log('[Google Drive] API initialized successfully with OAuth');
    return drive;
  } catch (error) {
    console.error('[Google Drive] Error initializing Drive:', error);
    return null;
  }
};

// Upload file to Google Drive
const uploadToDrive = async (filePath, fileName, folderId, mimeType = null) => {
  try {
    if (!drive) {
      drive = initializeDrive();
    }

    if (!drive) {
      throw new Error('Google Drive not initialized - missing OAuth credentials or token');
    }

    const fileMetadata = {
      name: fileName,
      parents: folderId ? [folderId] : undefined
    };

    const media = {
      mimeType: mimeType || 'application/octet-stream',
      body: fs.createReadStream(filePath)
    };

    console.log(`[Google Drive] Uploading file: ${fileName} to folder: ${folderId}`);

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id, webViewLink, webContentLink'
    });

    // Make file public
    await drive.permissions.create({
      fileId: response.data.id,
      requestBody: {
        role: 'reader',
        type: 'anyone'
      }
    });

    console.log(`[Google Drive] File uploaded successfully: ${response.data.webViewLink}`);

    return {
      fileId: response.data.id,
      webViewLink: response.data.webViewLink,
      webContentLink: response.data.webContentLink
    };
  } catch (error) {
    console.error('[Google Drive] Error uploading to Drive:', error.message);
    throw error;
  }
};

// Extract folder ID from Drive URL
const extractFolderId = (driveUrl) => {
  if (!driveUrl) return null;
  
  // Handle different Drive URL formats
  const patterns = [
    /\/folders\/([a-zA-Z0-9_-]+)/,
    /id=([a-zA-Z0-9_-]+)/,
    /\/d\/([a-zA-Z0-9_-]+)/
  ];
  
  for (const pattern of patterns) {
    const match = driveUrl.match(pattern);
    if (match) return match[1];
  }
  
  return null;
};

module.exports = {
  initializeDrive,
  uploadToDrive,
  extractFolderId
};
