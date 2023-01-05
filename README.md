# JavaScriptAPI
Example

```js
sendApi(
    {
        url: "https://google.com/",
        headers: {"key": "value", "key2": "value2"},
        method: ApiRequestMethod.GET //POST, DELETE, PUT
    },
    function(response) {
        console.log(response);
    }
);
```