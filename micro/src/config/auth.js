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

// 'authorization' : `Bearer ${token}`

const checkAuth = (permissions) => {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, message: 'Authorization header not found', data: null });
    }

    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
      decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ success: false, message: err.message, data: err.expiredAt, error: err });
    }
    console.log('====================================');
    console.log(decodedToken.role);
    console.log('====================================');

    // if (!permissions.includes(decodedToken.role)) {
    //   return res.status(403).json({ success: false, message: 'Unauthorized Access', data: null });
    // }

    // console.log(" checking permissions");
    // req.user = { userId: decodedToken.userId };
    next();
  };
};

exports.setupAuth = setupAuth;