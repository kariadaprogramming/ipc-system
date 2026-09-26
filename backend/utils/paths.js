const fs = require('fs');
const path = require('path');

// Canonical upload location: <project>/backend/uploads.
//
// Anchored on __dirname (backend/utils) instead of process.cwd(), so it resolves
// identically no matter where the server is started from:
//   - dev:         `node server.js` from backend/        -> backend/uploads
//   - production:  pm2 `backend/server.js` from root    -> backend/uploads
// Override with the UPLOAD_DIR env var when needed (Docker volumes, etc.).
const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(__dirname, '..', 'uploads');

const UPLOAD_SEGMENT = 'uploads/';

// Convert a DB-stored relative path ('uploads/prestasi/x.jpg', optionally with a
// leading slash as avatars/logos are stored), a bare filename, or an absolute
// path into an absolute filesystem path under UPLOAD_DIR.
// The DB format ('uploads/...' strings) is intentionally left unchanged.
const resolveUploadPath = (inputPath) => {
    if (!inputPath) return null;
    const str = String(inputPath).replace(/\\/g, '/');
    // DB values may carry a leading slash ('/uploads/...'); still relative to UPLOAD_DIR.
    const noLead = str.replace(/^\/+/, '');
    if (noLead.toLowerCase().startsWith(UPLOAD_SEGMENT)) {
        return path.join(UPLOAD_DIR, noLead.substring(UPLOAD_SEGMENT.length));
    }
    if (path.isAbsolute(str)) {
        return path.normalize(str);
    }
    return path.join(UPLOAD_DIR, noLead);
};

// Absolute path of a subfolder under UPLOAD_DIR, created on demand.
// Use for ALL multer destinations so uploads never depend on cwd.
const ensureUploadSubdir = (subdir) => {
    const dir = path.join(UPLOAD_DIR, subdir);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    return dir;
};

module.exports = { UPLOAD_DIR, resolveUploadPath, ensureUploadSubdir };
