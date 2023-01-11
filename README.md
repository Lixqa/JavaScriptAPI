# JavaScriptAPI
Example

```js
const { sendApi, ApiRequestMethod } = require("lixqajsapi");

let apiData = await sendApi(
    {
        url: "https://google.com/", //## required ##
        method: ApiRequestMethod.POST, //not required -> Default: GET (all: GET, POST, DELETE, PUT)
        headers: {                  //not required -> Default: null
            "Authorization": "value",
            "key2": "value2"
        },
        body: {                     //not required -> Default: null
            "user": "admin",
            "password": "passwd"
        }
    },
);

console.log(apiData) //returns Object
```