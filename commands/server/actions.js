module.exports.handleServerActions = (actions) => {
  switch (actions[0].name) {
    case "start":
      return "starting server";
    case "stop":
      return "stopping server";
    case "status":
      return "server status";
    default:
      throw new Error("Invalid slash command.");
      break;
  }
};
