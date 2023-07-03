const jwt = require('jsonwebtoken');
require('dotenv').config();

const setupAuth = (app, routes) => {
  routes.forEach(r => {
    if (r.auth) {
      app.use(r.url, checkAuth(r.permissions), function (req, res, next) {
        next();
      });
    }
  });
};

const checkAuth = (permissions) => {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, message: 'Authorization header not found', data: null });
    }

    const token = authHeader.split(' ')[1];

    // Check if the token is in the blacklist
    if (tokenBlacklist.includes(token)) {
      return res.status(401).json({ success: false, message: 'Token has been invalidated', data: null });
    }

    let decodedToken;
    try {
      decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ success: false, message: err.message, data: err.expiredAt, error: err });
    }

    if (!permissions.includes(decodedToken.role)) {
      return res.status(403).json({ success: false, message: 'Unauthorized Access', data: null });
    }

    console.log(permissions.includes(decodedToken.role));
    // req.user = { userId: decodedToken.userId };
    next();
  };
};

exports.setupAuth = setupAuth;