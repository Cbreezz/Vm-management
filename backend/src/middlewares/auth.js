const passport = require('passport');
const User = require('../models/User');

exports.authenticate = passport.authenticate('jwt', { session: false });

exports.authorize = (role) => {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await User.findById(req.user._id);

    if (user.role !== role) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  };
};