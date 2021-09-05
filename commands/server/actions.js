const { invokeLambda } = require("../../services/lambda");

module.exports.handleServerActions = async (actions) => {
  switch (actions[0].name) {
    case "start":
      return await startServer();
    case "stop":
      return "stopping server";
    case "status":
      return await getServerStatus();

    default:
      throw new Error("Invalid slash command.");
      break;
  }
};

const getServerStatus = async () => {
  await invokeLambda("status");
  return "Fetching server status...";
};

const startServer = async () => {
  await invokeLambda("start");
  return "Starting minecraft server...";
};
