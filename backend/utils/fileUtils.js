const fs = require('fs');
const path = require('path');

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
        // Get current year for folder organization
        const year = new Date().getFullYear().toString();
        
        // Create organized folder path: uploads/approved/[type]/[year]/
        const approvedDir = path.join('uploads', 'approved', recordType, year);
        
        // Ensure directory exists
        if (!fs.existsSync(approvedDir)) {
            fs.mkdirSync(approvedDir, { recursive: true });
        }

        // Get filename from current path
        const filename = path.basename(currentFilePath);
        
        // Full paths
        const oldFullPath = path.resolve(currentFilePath);
        const newFullPath = path.resolve(approvedDir, filename);

        // Check if source file exists
        if (!fs.existsSync(oldFullPath)) {
            console.warn(`Source file not found: ${oldFullPath}`);
            return null;
        }

        // Move file (rename from old location to new location)
        fs.renameSync(oldFullPath, newFullPath);

        // Return relative path for database storage
        return path.join('approved', recordType, year, filename).replace(/\\/g, '/');
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
        const fullPath = path.resolve(filePath);
        
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
    deletePhotoFile
};
