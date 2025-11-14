const AppError = require("../utils/upgradedError");

// Handles requests to routes that do not exist
module.exports = (req, res, next) => {
  // Ignore routine browser/system requests
  if (
    req.originalUrl.startsWith("/favicon.ico") ||
    req.originalUrl.startsWith("/.well-known")
  ) {
    return res.status(204).end();
  }

  // Forward a custom 404 error for all other undefined routes
  next(
    new AppError(
      `The Route You Have Entered (${req.originalUrl}) Is Invalid`,
      404
    )
  );
};
