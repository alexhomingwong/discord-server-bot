const nacl = require("tweetnacl");

module.exports.verifyDiscordRequest = (headers, body) => {
  const signature = headers["x-signature-ed25519"];
  const timestamp = headers["x-signature-timestamp"];

  const isVerified = nacl.sign.detached.verify(
    Buffer.from(timestamp + body),
    Buffer.from(signature, "hex"),
    Buffer.from(process.env.DC_PUBLIC_KEY, "hex")
  );

  // Verify the users
  if (!isVerified) {
    throw new Error("Failed to verify user.");
  }
};
