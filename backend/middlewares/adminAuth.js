const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;

const adminAuthMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Acceso no autorizado' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    if (decoded.rol !== 'admin') {
      return res.status(403).json({ message: 'Acceso denegado. Solo administradores.' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

module.exports = adminAuthMiddleware;
