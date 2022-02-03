# @survfate/valorant.js
## An API Wrapper for valorant with oauth support
#### Notice: This fork is just my personal implementation for fixing the outdated Content API & Cloudflare bypass

## Example
```js
(async () => {
  const { RiotApiClient, Region } = require("valorant.js");
  
  try {
    const client = new RiotApiClient({
      username: "MY_USERNAME", // your username
      password: "MY_PASSWORD", // your password
      region: Region.MY_REGION, // Available regions: EU, NA, AP
      locale: Locale.MY_LOCALE // Available locales: AE, DE, US, ES, MX, FR, ID, IT, JP, KR, PL, BR, RU, TH, TR, VN, CN, TW
    });
    
    await client.login();
    console.log(client.user);
    
    const balance = await client.storeApi.getWallet(client.user.Subject);
    console.log(balance);
  } catch(err) {
    console.error(err);
  }
})();
```

## Support
* Report Issues/Bugs [here](https://github.com/Sprayxe/valorant.js/issues)
* Join [Discord](https://discord.gg/q37Dfyn) - Ask in #general
* Read [Documentation](https://valorant-js.stoplight.io/docs/valorant-js/docs/Home.md) (OUTDATED, soon)

## Installation
```npm install valorant.js --save```


## Credits
* [Sprayxe](https://twitter.com/Sprayxe_) `@MarcelWRLD#0999`
* [Speeedyyyy](https://twitter.com/Speeedyyyytv) `@Pilica#8525`
* [RumbleMike](https://twitter.com/RumbleMikee) `@RumbleMike#5406` (API Documentation)
* A small credit in your project would be appreciated (e.g mentioning lib name would be enough)

## Dependencies
* [Axios](https://www.npmjs.com/package/axios)
* [TypeScript](https://www.npmjs.com/package/typescript)
* [QueryString](https://www.npmjs.com/package/querystring)

