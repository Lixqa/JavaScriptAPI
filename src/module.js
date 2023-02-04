const axios = require("axios");
const logger = require("lixqajslogger");
const chalk = require("chalk");

async function sendApi(parameters, options = {}) {
    let url = parameters.url;
    let method = parameters.method || ApiRequestMethod.GET;
    let headers = parameters.headers || {};
    let body = (parameters.body) ? JSON.stringify(parameters.body) : null;

    let showOutput = (options.showOutput == null) ? true : options.showOutput;
    let showError = (options.showError == null) ? true : options.showError;
    let showDetailedError = (options.showDetailedError == null) ? false : options.showDetailedError;

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
    let bodyStr = (body) ? chalk.underline.bold.green("true") : chalk.underline.bold.red("false");
    let result;

    await axios({
      url: url,
      method: method,
      headers: headers,
      data: body
    })
    .then(response => {
      result = response.data;
      result.reqDuration = (new Date().getTime() - responseStartDate);

      if(showOutput) {
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
            "\nHeaders: " + chalk.underline.bold(Object.entries(headers).length) +
            "\nBody: " + bodyStr,
            name: "API",
            outerSpace: true,
            baseColor: chalk.green,
            borderChar: "-",
            borderCharLength: -1
          });
        }
      }
    })
    .catch(error => {
      result = error?.response?.data;

      if(showError) {
        logger.logByOptions({ //error
          message: "URL: " + chalk.underline.bold(url) +
          "\nMethod: " + chalk.underline.bold(method) +
          "\nRequest duration: " + chalk.underline.bold((new Date().getTime() - responseStartDate)) + "ms" +
          "\nHeaders: " + chalk.underline.bold(Object.entries(headers).length) +
          "\nBody: " + bodyStr,
          name: "API Error",
          outerSpace: true,
          baseColor: chalk.red,
          borderChar: "-",
          borderCharLength: -1
        });
      }

      if(showDetailedError) {
        console.error(error); //detailed error
      }
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