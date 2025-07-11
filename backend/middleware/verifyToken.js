const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access Denied. Token missing.' });

  jwt.verify(token, process.env.JWT_SECRET || 'defaultsecretkey', (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid Token.' });

    req.user = user;
    next();
  });
}

module.exports = verifyToken;
