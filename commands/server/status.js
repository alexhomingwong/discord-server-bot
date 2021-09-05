const { getServerStatus } = require("../../services/ec2");
const axios = require("axios");

module.exports.handler = async (event) => {
  try {
    const { InstanceStatuses } = await getServerStatus();

    const server = InstanceStatuses.find(
      (instance) => instance.InstanceId === process.env.EC2_ID
    );

    if (server) {
      await axios.post(process.env.DC_INCOMING_WEBHOOK, {
        content: `Server status: ${server.InstanceStatus.Status.toUpperCase()}`,
      });
    } else {
      await axios.post(process.env.DC_INCOMING_WEBHOOK, {
        content: "Server status: OFFLINE",
      });
    }
  } catch (error) {
    console.log(error.message);
    await axios.post(process.env.DC_INCOMING_WEBHOOK, {
      content: "Server status: ERROR",
    });
  }
};
