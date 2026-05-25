const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// OAuth2 Configuration for Personal Google Drive
// You need to create OAuth2 credentials from Google Cloud Console

const credentialsPath = path.join(__dirname, '..', 'oauth-credentials.json');
const tokenPath = path.join(__dirname, '..', 'oauth-token.json');

let oauth2Client = null;
let drive = null;

// Initialize OAuth2 Client
const initializeOAuth = () => {
  try {
    if (!fs.existsSync(credentialsPath)) {
      console.error('OAuth credentials not found at:', credentialsPath);
      return null;
    }

    const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));
    const { client_id, client_secret, redirect_uris } = credentials.web || credentials.installed || credentials;
    
    oauth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0] || 'http://localhost:5000/api/drive-auth/callback'
    );

    // Load saved token if exists
    if (fs.existsSync(tokenPath)) {
      const token = JSON.parse(fs.readFileSync(tokenPath, 'utf8'));
      oauth2Client.setCredentials(token);
      console.log('OAuth2 token loaded successfully');
    } else {
      console.log('No OAuth2 token found. Authorization required.');
    }

    drive = google.drive({ version: 'v3', auth: oauth2Client });
    return oauth2Client;
  } catch (error) {
    console.error('Error initializing OAuth2:', error);
    return null;
  }
};

// Get authorization URL
const getAuthUrl = () => {
  if (!oauth2Client) {
    oauth2Client = initializeOAuth();
  }
  
  if (!oauth2Client) {
    throw new Error('OAuth2 client not initialized');
  }

  const scopes = [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.file'
  ];

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent' // Force to get refresh token
  });

  return authUrl;
};

// Save token from authorization code
const saveToken = async (code) => {
  if (!oauth2Client) {
    oauth2Client = initializeOAuth();
  }

  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  
  // Save token to file
  fs.writeFileSync(tokenPath, JSON.stringify(tokens, null, 2));
  console.log('Token saved to', tokenPath);
  
  drive = google.drive({ version: 'v3', auth: oauth2Client });
  return tokens;
};

// Check if authenticated
const isAuthenticated = () => {
  return fs.existsSync(tokenPath) && oauth2Client && oauth2Client.credentials;
};

// Upload file to personal Google Drive
const uploadToPersonalDrive = async (filePath, fileName, folderId = null, mimeType = null) => {
  try {
    if (!oauth2Client) {
      oauth2Client = initializeOAuth();
    }

    if (!oauth2Client || !isAuthenticated()) {
      throw new Error('Google Drive not authenticated. Please authorize first.');
    }

    const fileMetadata = {
      name: fileName
    };

    // If folderId provided, upload to specific folder
    if (folderId) {
      fileMetadata.parents = [folderId];
    }

    const media = {
      mimeType: mimeType || 'application/octet-stream',
      body: fs.createReadStream(filePath)
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id, webViewLink, webContentLink'
    });

    // Make file public (optional - comment out if you want private files)
    try {
      await drive.permissions.create({
        fileId: response.data.id,
        requestBody: {
          role: 'reader',
          type: 'anyone'
        }
      });
    } catch (permError) {
      console.log('Could not make file public, keeping private:', permError.message);
    }

    return {
      fileId: response.data.id,
      webViewLink: response.data.webViewLink,
      webContentLink: response.data.webContentLink
    };
  } catch (error) {
    console.error('Error uploading to Drive:', error);
    throw error;
  }
};

// Create folder in Drive
const createFolder = async (folderName, parentId = null) => {
  try {
    if (!oauth2Client) {
      oauth2Client = initializeOAuth();
    }

    const fileMetadata = {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder'
    };

    if (parentId) {
      fileMetadata.parents = [parentId];
    }

    const folder = await drive.files.create({
      requestBody: fileMetadata,
      fields: 'id, webViewLink'
    });

    return folder.data;
  } catch (error) {
    console.error('Error creating folder:', error);
    throw error;
  }
};

// List folders in Drive
const listFolders = async () => {
  try {
    if (!oauth2Client) {
      oauth2Client = initializeOAuth();
    }

    const response = await drive.files.list({
      q: "mimeType='application/vnd.google-apps.folder'",
      fields: 'files(id, name, webViewLink)'
    });

    return response.data.files;
  } catch (error) {
    console.error('Error listing folders:', error);
    throw error;
  }
};

module.exports = {
  initializeOAuth,
  getAuthUrl,
  saveToken,
  isAuthenticated,
  uploadToPersonalDrive,
  createFolder,
  listFolders
};
