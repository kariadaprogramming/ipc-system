const fs = require('fs');
const path = require('path');

// Helper function to sanitize file paths
const sanitizePath = (inputPath) => {
    if (!inputPath) return null;
    
    // Remove any null bytes
    const sanitized = inputPath.replace(/\0/g, '');
    
    // Remove directory traversal attempts
    const withoutTraversal = sanitized.replace(/\.\./g, '').replace(/\\/g, '/');
    
    // Remove URL-encoded traversal attempts
    const decoded = decodeURIComponent(withoutTraversal);
    const finalSanitized = decoded.replace(/\.\./g, '');
    
    return finalSanitized;
};

// Helper function to validate path is within allowed directory
const validatePath = (requestedPath, allowedBase) => {
    if (!requestedPath || !allowedBase) return false;
    
    const resolvedRequested = path.resolve(requestedPath);
    const resolvedAllowed = path.resolve(allowedBase);
    
    // Ensure the resolved path starts with the allowed base directory
    if (!resolvedRequested.startsWith(resolvedAllowed)) {
        return false;
    }
    
    // Additional check: ensure no symbolic links escape the allowed directory
    try {
        const realRequested = fs.realpathSync(resolvedRequested);
        const realAllowed = fs.realpathSync(resolvedAllowed);
        return realRequested.startsWith(realAllowed);
    } catch (error) {
        // If realpath fails (file doesn't exist), use the resolved path check
        return true;
    }
};

/**
 * Move photo to organized folder structure when record is approved
 * Creates directory structure: uploads/approved/[type]/[year]/[filename]
 * @param {string} currentFilePath - Current file path (e.g., 'uploads/prestasi/filename.jpg')
 * @param {string} recordType - Type of record (prestasi, pelanggaran, etc.)
 * @returns {string} New file path relative to project root, or null if no photo
 */
const movePhotoToApprovedFolder = (currentFilePath, recordType) => {
    if (!currentFilePath) {
        return null;
    }

    try {
        // Sanitize the current file path
        const sanitizedPath = sanitizePath(currentFilePath);
        if (!sanitizedPath) {
            console.warn('Invalid file path provided');
            return null;
        }

        // Whitelist of allowed record types
        const allowedTypes = ['prestasi', 'pelanggaran', 'organisasi', 'kepanitiaan', 'event', 'perilaku'];
        if (!allowedTypes.includes(recordType)) {
            console.warn(`Invalid record type: ${recordType}`);
            return null;
        }

        // Create organized folder path: uploads/approved/[type]/
        const approvedDir = path.join('uploads', 'approved', recordType);
        const uploadsBase = path.join('uploads');
        
        // Ensure directory exists
        if (!fs.existsSync(approvedDir)) {
            fs.mkdirSync(approvedDir, { recursive: true });
        }

        // Get filename from current path
        const filename = path.basename(sanitizedPath);
        
        // Full paths
        const oldFullPath = path.resolve(sanitizedPath);
        const newFullPath = path.resolve(approvedDir, filename);

        // Validate source path is within uploads directory
        if (!validatePath(oldFullPath, uploadsBase)) {
            console.warn(`Source file path is outside allowed directory: ${oldFullPath}`);
            return null;
        }

        // Validate destination path is within uploads directory
        if (!validatePath(newFullPath, uploadsBase)) {
            console.warn(`Destination file path is outside allowed directory: ${newFullPath}`);
            return null;
        }

        // Check if source file exists
        if (!fs.existsSync(oldFullPath)) {
            console.warn(`Source file not found: ${oldFullPath}`);
            return null;
        }

        // Move file (rename from old location to new location)
        fs.renameSync(oldFullPath, newFullPath);

        // Return relative path for database storage
        return path.join('approved', recordType, filename).replace(/\\/g, '/');
    } catch (error) {
        console.error('Error moving photo to approved folder:', error);
        return null;
    }
};

/**
 * Delete photo file from disk
 * @param {string} filePath - File path relative to project root
 * @returns {boolean} True if deleted successfully
 */
const deletePhotoFile = (filePath) => {
    if (!filePath) {
        return false;
    }

    try {
        const sanitizedPath = sanitizePath(filePath);
        if (!sanitizedPath) {
            console.warn('Invalid file path provided');
            return false;
        }

        const fullPath = path.resolve(sanitizedPath);
        const uploadsBase = path.join('uploads');
        
        // Validate path is within uploads directory
        if (!validatePath(fullPath, uploadsBase)) {
            console.warn(`File path is outside allowed directory: ${fullPath}`);
            return false;
        }
        
        if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error deleting photo file:', error);
        return false;
    }
};

module.exports = {
    movePhotoToApprovedFolder,
    deletePhotoFile,
    sanitizePath,
    validatePath
};
