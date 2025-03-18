const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const query = event.queryStringParameters.q;
    if (!query) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Query parameter 'q' is required" }),
      };
    }

    const response = await fetch(`https://api.deezer.com/search?q=${query}`);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error", details: error.message }),
    };
  }
};
