const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return next({
      status: 400,
      message: error.message,
      name: "Bad request",
    });
  }
  next()
};

module.exports = validate
