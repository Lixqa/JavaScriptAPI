const axios = require("axios");
const logger = require("lixqajslogger");
const chalk = require("chalk");

async function sendApi(parameters, options = {}) {
    let url = parameters.url;
    let method = parameters.method || ApiRequestMethod.GET;
    let headers = parameters.headers || {};
    let body = (parameters.body) ? JSON.stringify(parameters.body) : null;

    let showError = options.showError || false;

    if(url == null) {
      logger.logByOptions({
        message: "No url, use url: \"YOUR URL\"",
        name: "API",
        outerSpace: true,
        baseColor: chalk.red,
        borderChar: "-",
        borderCharLength: -1
      });
      return;
    }
    let responseStartDate = new Date().getTime();
    let result;

    await axios({
      url: url,
      method: method,
      headers: headers,
      data: body
    })
    .then(response => {
      result = response.data;
      let bodyStr = (body) ? chalk.underline.bold.green("true") : chalk.underline.bold.red("false");

      if(parameters.url.includes("api.lixqa.de")) {
        logger.logByOptions({ //only compatible with lixqa api
          message: "Message: " + chalk.underline.bold(result?.message) +
          "\nName: " + chalk.underline.bold(result?.endpoint?.name) +
          "\nRequest duration: " + chalk.underline.bold((new Date().getTime() - responseStartDate)) + "ms" +
          "\nIntern handle duration: " + chalk.underline.bold(result?.duration) + "ms" +
          "\nMethod: " + chalk.underline.bold(result?.method) +
          "\nHeaders: " + chalk.underline.bold(Object.entries(headers).length) +
          "\nBody: " + bodyStr,
          name: "API",
          outerSpace: true,
          baseColor: (result.error) ? chalk.red : chalk.green,
          borderChar: "-",
          borderCharLength: -1
        });
      } else {
        logger.logByOptions({ //others
          message: "URL: " + chalk.underline.bold(url) +
          "\nMethod: " + chalk.underline.bold(method) +
          "\nRequest duration: " + chalk.underline.bold((new Date().getTime() - responseStartDate)) + "ms" +
          "\nHeaders: " + chalk.underline.bold(headers.size) +
          "\nBody: " + bodyStr,
          name: "API",
          outerSpace: true,
          baseColor: (result.error) ? chalk.red : chalk.green,
          borderChar: "-",
          borderCharLength: -1
        });
      }
    })
    .catch(error => {
      if(showError) console.log(error);
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