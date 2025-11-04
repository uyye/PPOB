const errorHandler = (err, req, res, next) => {
  let status = 500;
  let message = "Internal server error";
  let data

  switch (err.name) {
    case "Bad request":
        status = err.status
        message = err.message
        data = err.data
        break;
    case "Unauthorized":
        status = err.status
        message = err.message
        data = err.data
        break;
    case "Not found":
        status = err.status
        message = err.message
        data = err.data
        break;
    default:
        break;
  }

  res.status(status).json({
    status,
    message,
    data:data || null
  })
};

module.exports = errorHandler
