const axios = require('axios');
const logger = require('lixqajslogger');
const chalk = require('chalk');

async function sendApi(parameters) {
    let responseStartDate = new Date().getTime();
    let result;

    await axios({
      method: parameters.method || ApiRequestMethod.GET,
      url: parameters.url,
      headers: parameters.headers,
      data: JSON.stringify(parameters.body)
    })
    .then(response => {
      result = response.data;

      logger.logByOptions({
        message: "Message: " + chalk.underline.bold(result.message) +
        "\nName: " + chalk.underline.bold(result.endpoint.name) +
        "\nRequest duration: " + chalk.underline.bold((new Date().getTime() - responseStartDate)) + "ms" +
        "\nIntern handle duration: " + chalk.underline.bold(result.duration) + "ms" +
        "\nMethod: " + chalk.underline.bold(result.method),
        name: "API",
        outerSpace: true,
        baseColor: (result.error) ? chalk.red : chalk.green,
        borderChar: "-",
        borderCharLength: 20
      });
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