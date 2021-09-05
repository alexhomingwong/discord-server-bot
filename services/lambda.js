const lambda = require("aws-sdk/clients/lambda");

const client = new lambda({
  region: "eu-west-2",
});

module.exports.invokeLambda = (name) => {
  console.log("Invoking lambda: " + getLambdaName(name));
  return client
    .invoke({
      FunctionName: getLambdaName(name),
      InvocationType: "Event",
      LogType: "Tail",
    })
    .promise();
};

module.exports.sendResponse = (body, statusCode) => {
  return {
    statusCode,
    body: JSON.stringify(body, null, 2),
  };
};

const getLambdaName = (name) => {
  return `${process.env.LAMBDA_NAME}-${name}`;
};
