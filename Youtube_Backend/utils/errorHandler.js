// central error handler middleware
// avoids repeating try-catch everywhere

const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
};

export default errorHandler;