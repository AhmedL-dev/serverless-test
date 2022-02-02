const Responses = require("../common/API_Responses");
const axios = require("axios");

const baseURL = "http://localhost:3000";
const instance = axios.create({
  baseURL,
});

exports.handler = async event => {
  const queryString =
    event.queryStringParameters &&
    Object.keys(event.queryStringParameters)
      .map(key => `${key}=${event.queryStringParameters[key]}`)
      .join("&");
  const url = `${event.path}${queryString ? "&" + queryString : ""}`;
  try {
    const config = {
      url,
      method: event.httpMethod,
      data: event.body,
      headers: {
        ...event.headers,
        "Content-Type": "",
      },
    };
    const response = await instance(config);
    return Responses._DefineResponse(response.status, response.data, response.headers);
  } catch (error) {
    console.log(error);
    return Responses._200({ url });
  }
};
