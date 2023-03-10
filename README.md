# JavaScriptAPI

Simple API sender for [**NodeJS**](https://npmjs.com/package/lixqajsapi), which was created for the [Lixqa API](https://api.lixqa.de/v2) but also works with other endpoints.

_Using chalk & axios_

```
> npm i lixqajsapi
```

## Example

```js
const { sendApi, ApiRequestMethod } = require("lixqajsapi");

let apiData = await sendApi(
    {
        url: "https://google.com/",             /*## 1 ##*/
        method: ApiRequestMethod.POST,          /*## 2 ##*/
        headers: {                              /*## 3 ##*/
            "Authorization": "value",
            "key2": "value2"
        },
        body: {                                 /*## 4 ##*/
            "user": "admin",
            "password": "passwd"
        }
    },
    {                                           /*## 5 ##*/
        showOutput: true,
        showError: true,
        showDetailedError: true
    }
);

console.log(apiData)                            /*## 6 ##*/
```
- 1 **URL**: Set the target URL
    - Required: _✔️_

<br />

- 2 **Method**: Use the ApiRequestMehod Object to select a Request Method
    - Required: _❌_
    - Default: _GET_
    - Options: _GET, POST, PUT, DELETE_

<br />

- 3 **Headers**: Send headers to target (key-value)
    - Required: _❌_
    - Default: _null_

<br />

- 4 **Body**: Send body to target (object)
    - Required: _❌_
    - Default: _null_

<br />

- 5 **Options**: Set options (object)
    - Required: _❌_

    - **showLog**: Send log if request was successful **(Default: true)**
    - **showError**: Send error log if request failed **(Default: true)**
    - **showDetailedError**: Send Axios error object if request failed **(Default: false)**

    (Script options -> Script don't track if the API returned a internal error or something)

<br />

- 6 **Output**: Object with response data
