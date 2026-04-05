import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    // Remove Bearer if present
    if (token.startsWith("Bearer ")) {
      token = token.replace("Bearer ", "");
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.id;

    next();

  } catch (error) {
    res.status(401).json({
      message: "Invalid token",
    });
  }
};

export default authMiddleware;