const axios = require('axios');
const logger = require('lixqajslogger');
const chalk = require('chalk');

async function sendApi(parameters) {
    let responseStartDate = new Date().getTime();
    let result;

    await axios({
      url: parameters.url,
      method: parameters.method || ApiRequestMethod.GET,
      headers: parameters.headers,
      data: JSON.stringify(parameters.body)
    })
    .then(response => {
      result = response.data;

      if(parameters.url.contains("api.lixqa.de")) {
        logger.logByOptions({ //only compatible with lixqa api
          message: "Message: " + chalk.underline.bold(result.message) +
          "\nName: " + chalk.underline.bold(result.endpoint.name) +
          "\nRequest duration: " + chalk.underline.bold((new Date().getTime() - responseStartDate)) + "ms" +
          "\nIntern handle duration: " + chalk.underline.bold(result.duration) + "ms" +
          "\nMethod: " + chalk.underline.bold(result.method),
          name: "API",
          outerSpace: true,
          baseColor: (result.error) ? chalk.red : chalk.green,
          borderChar: "-",
          borderCharLength: -1
        });
      }
    })
    .catch(error => {
      console.log(error);
    });

    return result;
}

const ApiRequestMethod = {
  GET: "GET",
  POST: "POST",
  DELETE: "DELETE",
  PUT: "PUT"
};

module.exports = {
    sendApi: sendApi,
    ApiRequestMethod: ApiRequestMethod
}