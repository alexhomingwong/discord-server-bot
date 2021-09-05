const { stopServer } = require("../../services/ec2");
const axios = require("axios");

module.exports.handler = async (event) => {
  try {
    await stopServer();
    await axios.post(process.env.DC_INCOMING_WEBHOOK, {
      content: "Thank you for playing. Server is shutting down.",
    });
  } catch (error) {
    console.log("Error:", error.message);
    await axios.post(process.env.DC_INCOMING_WEBHOOK, {
      content: "Failed to stop minecraft server.",
    });
  }
};
