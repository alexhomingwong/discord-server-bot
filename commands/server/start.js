const { startServer } = require("../../services/ec2");
const axios = require("axios");

module.exports.handler = async (event) => {
  try {
    await startServer();
    await axios.post(process.env.DC_INCOMING_WEBHOOK, {
      content: "Please wait around 5 minutes for the server to start.",
    });
  } catch (error) {
    console.log("Error:", error.message);
    await axios.post(process.env.DC_INCOMING_WEBHOOK, {
      content: "Failed to start minecraft server.",
    });
  }
};
