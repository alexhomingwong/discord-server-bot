const { verifyDiscordRequest } = require("../../services/discord");
const { sendResponse } = require("../../services/lambda");
const { handleServerActions } = require("./actions");

module.exports.handler = async (event) => {
  try {
    const { body, headers } = event;

    verifyDiscordRequest(headers, body);

    if (body.type && body.type === 1) {
      return sendResponse({ type: 1 }, 200);
    }

    const { data } = JSON.parse(body);

    let response = "Action was not performed";
    switch (data.name) {
      case "server":
        response = await handleServerActions(data.options);
        break;
      default:
        throw new Error("Invalid slash command.");
    }

    return sendResponse(
      {
        type: 4,
        data: {
          content: response,
        },
      },
      200
    );
  } catch (error) {
    console.log(error);
    return sendResponse(
      {
        type: 4,
        data: {
          content: `Error: ${error.message}`,
        },
      },
      200
    );
  }
};
