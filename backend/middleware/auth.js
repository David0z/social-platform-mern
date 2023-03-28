const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  
  if (req.method === 'OPTIONS') {
    return next();
  }

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // if (!token) {
      //   res.status(401);
      //   throw new Error("Not authorized");
      // }

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.user = {userId: decodedToken.id}

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized')
  }
};

module.exports = { authMiddleware };
