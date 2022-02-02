const Responses = require("../common/API_Responses");
const Dynamo = require("../common/Dynamo");

const tableName = process.env.tableName;

exports.handler = async (event, context) => {
  console.log("I am the lambda function");
  //   console.log("event", event);

  console.log(event.requestContext.authorizer);
  return Responses._200({ test: "Hey", ...event.requestContext });
};
