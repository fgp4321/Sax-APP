const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1] || req.body.token;

  if (!token) return res.status(401).json({ message: "Acceso no autorizado" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};


module.exports = authMiddleware;
