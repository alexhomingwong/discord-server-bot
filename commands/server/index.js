const { verifyDiscordRequest } = require("../../services/discord");
const { sendResponse } = require("../../services/lambda");
const { handleServerActions } = require("../../services/lambda");

module.exports.bot = async (event) => {
  try {
    const { body, headers } = event;

    verifyDiscordRequest(headers, body);

    if (body.type && body.type === 1) {
      return sendResponse({ type: 1 }, 200);
    }

    return sendResponse(
      {
        type: 4,
        data: {
          content: "Roger",
        },
      },
      200
    );
  } catch (error) {
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
