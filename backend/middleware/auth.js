const jwt = require('jsonwebtoken');
const db = require('../config/database');

const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

const superAdminOnly = (req, res, next) => {
    if (req.user.role !== 'superadmin') {
        return res.status(403).json({ message: 'Access denied. Superadmin only.' });
    }
    next();
};

const teacherOrSuperAdmin = (req, res, next) => {
    if (req.user.role !== 'superadmin' && req.user.role !== 'guru') {
        return res.status(403).json({ message: 'Access denied. Teacher or Superadmin only.' });
    }
    next();
};

const teacherOnly = (req, res, next) => {
    if (req.user.role !== 'guru') {
        return res.status(403).json({ message: 'Access denied. Teachers only.' });
    }
    next();
};

// Middleware to check input access permission
const checkInputAccess = (jenisInput) => {
  return async (req, res, next) => {
    try {
      const userId = req.user.id;
      const userRole = req.user.role;
      
      // Superadmin always has access
      if (userRole === 'superadmin') {
        return next();
      }
      
      // Check global access status
      const [globalControl] = await db.query(
        'SELECT is_enabled FROM input_access_control WHERE control_type = ? AND jenis_input = ?',
        ['global', jenisInput]
      );
      
      // Check role-based access
      const [roleControl] = await db.query(
        'SELECT is_enabled FROM input_access_control WHERE control_type = ? AND role_target = ? AND jenis_input = ?',
        ['role', userRole, jenisInput]
      );
      
      // Check individual permission
      const [individualPerm] = await db.query(
        `SELECT can_input_${jenisInput} as has_permission FROM permissions WHERE user_id = ?`,
        [userId]
      );
      
      // Priority: Individual > Role > Global
      let hasAccess = true;
      let accessSource = 'default';
      
      const permValue = individualPerm.length > 0 ? individualPerm[0].has_permission : null;
      
      // Explicitly check: true/1 = allow, false/0 = deny, null/undefined = fall through
      if (permValue === true || permValue === 1) {
        hasAccess = true;
        accessSource = 'individual';
      } else if (permValue === false || permValue === 0) {
        hasAccess = false;
        accessSource = 'individual';
      } else if (roleControl.length > 0) {
        hasAccess = roleControl[0].is_enabled;
        accessSource = 'role';
      } else if (globalControl.length > 0) {
        hasAccess = globalControl[0].is_enabled;
        accessSource = 'global';
      }
      
      console.log(`[Access Check] User ${userId} (${userRole}) - ${jenisInput}: ${hasAccess} (source: ${accessSource})`);
      console.log(`  - Individual: ${permValue !== null ? permValue : 'null'}`);
      console.log(`  - Role (${userRole}): ${roleControl.length > 0 ? roleControl[0].is_enabled : 'not set'}`);
      console.log(`  - Global: ${globalControl.length > 0 ? globalControl[0].is_enabled : 'not set'}`);
      
      if (!hasAccess) {
        return res.status(403).json({ 
          message: `Anda tidak memiliki izin untuk input data ${jenisInput}. Silakan hubungi SuperAdmin.` 
        });
      }
      
      next();
    } catch (error) {
      console.error('Error checking input access:', error);
      // If there's an error checking, allow access (fail open for better UX)
      next();
    }
  };
};

module.exports = { auth, superAdminOnly, teacherOrSuperAdmin, teacherOnly, checkInputAccess };
