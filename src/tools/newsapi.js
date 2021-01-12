const request = require("request");
const newsapi = (callback) => {
  const newsUrl =
    "http://newsapi.org/v2/top-headlines?country=eg&apiKey=a9111688ca3a4bb181be03268f61ddb5";

  request({ url: newsUrl, json: true }, function (error, response, body) {
    if (error) {
      callback("Unable to connect to the news api service", undefined);
    } else {
      if (response.statusCode === 200) {
        callback(undefined, body.articles);
      } else {
        switch (response.statusCode) {
          case 400:
            callback(
              "Bad Request. The request was unacceptable, often due to a missing or misconfigured parameter.",
              undefined
            );
            break;
          case 401:
            callback(
              "Unauthorized. Your API key was missing from the request, or wasn't correct.",
              undefined
            );
            break;
          case 429:
            callback(
              "Too Many Requests. You made too many requests within a window of time and have been rate limited. Back off for a while.",
              undefined
            );
            break;
          case 500:
            callback(
              "Server Error. Something went wrong on our side",
              undefined
            );
            break;
        }
      }
    }
  });
};

module.exports = newsapi;
