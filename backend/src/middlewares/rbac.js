const User = require('../models/User');

const rbac = {
  admin: ['create', 'read', 'update', 'delete', 'move'],
  standard: ['create', 'read', 'update', 'delete'],
  guest: ['read']
};

exports.checkPermission = (action) => {
  return async (req, res, next) => {
    const user = await User.findById(req.user._id);
    
    if (!rbac[user.role].includes(action)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  };
};