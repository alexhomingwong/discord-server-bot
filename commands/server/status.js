module.exports.handler = async (event) => {
  try {
    console.log(event);
    return "";
  } catch (error) {
    console.log(error.message);
  }
};
