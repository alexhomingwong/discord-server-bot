module.exports.sendResponse = (body, statusCode) => {
  return {
    statusCode,
    body: JSON.stringify(body, null, 2),
  };
};
