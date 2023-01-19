# JavaScriptAPI

Simple API sender, which was created for the Lixqa API (https://api.lixqa.de/v2)

Using chalk & axios

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
);

console.log(apiData)                            /*## 5 ##*/
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

- 5 **Output**: Object with response data
