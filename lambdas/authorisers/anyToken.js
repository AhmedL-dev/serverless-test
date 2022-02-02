const { DynamoDB } = require("aws-sdk");

exports.handler = async event => {
  // console.log("event", event);
  console.log(event);
  console.log("I am the authorizer");
  return generatePolicy({ allow: true });
};

const generatePolicy = ({ allow, Resource }) => {
  return {
    principalId: "my-username",
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: allow ? "Allow" : "Deny",
          Resource: Resource || "*",
        },
      ],
    },
    context: {
      field: "value",
      claims: {
        id: "123",
        email: "abc@gmail.com",
      },
    },
  };
};
