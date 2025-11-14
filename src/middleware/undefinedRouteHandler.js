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

  // Determine if the request is for an API route that should be validated
  const apiPrefixes = ["/users", "/blogs"];
  const isApiRoute = apiPrefixes.some((prefix) =>
    req.originalUrl.startsWith(prefix)
  );

  // Forward a custom 404 error for all other undefined routes (API only)
  if (isApiRoute) {
    return next(
      new AppError(
        `The Route You Have Entered (${req.originalUrl}) Is Invalid`,
        404
      )
    );
  }

  // Non-API routes (e.g. CSS, JS, images) should fall through normally
  next();
};
