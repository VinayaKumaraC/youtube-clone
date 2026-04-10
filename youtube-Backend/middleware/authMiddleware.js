import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    let token = req.headers.authorization;

    // No token → 401
    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    // Remove Bearer
    if (token.startsWith("Bearer ")) {
      token = token.replace("Bearer ", "");
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.id;

    next();
  } catch (error) {
    // Invalid token → 401
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleware;