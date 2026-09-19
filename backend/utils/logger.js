const db = require('../config/database');

/**
 * Log user activity to activity_logs table
 * @param {number} userId - User ID
 * @param {string} action - Action description (e.g., 'UPDATE_BIODATA', 'CHANGE_PASSWORD')
 * @param {string} details - Additional details about the action
 * @param {string} ipAddress - IP address of the user (optional)
 */
async function logActivity(userId, action, details = '', ipAddress = null) {
  try {
    await db.query(
      'INSERT INTO activity_logs (user_id, action, details, ip_address) VALUES (?, ?, ?, ?)',
      [userId, action, details, ipAddress]
    );
  } catch (error) {
    console.error('Error logging activity:', error);
  }
}

module.exports = { logActivity };
