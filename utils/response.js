const successResponse = (message, data = null) => ({
  status: 0,
  message,
  data,
});

const errorResponse = (statusCode, message, data = null) => ({
  statusCode,
  message,
  data,
});

module.exports = {successResponse, errorResponse}
