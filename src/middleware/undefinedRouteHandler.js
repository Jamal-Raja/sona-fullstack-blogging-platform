const AppError = require("../utils/upgradedError");

module.exports = (req, res, next) => {
  next(
    new AppError(
      `The Route You Have Entered (${req.originalUrl}) Is Invalid`,
      404
    )
  );
};
