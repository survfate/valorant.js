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
    });
    
    await client.login();
    console.log(client.user);
    
    const balance = await client.storeApi.getWallet(client.user.Subject);
    console.log(balance);

    const { featured, bonus, skins } = await client.storeApi.getStorefront(
      client.user.Subject,
      true,
      "MY_LOCALE" // Available locales: ar-AE / de-DE / en-US / es-ES / es-MX / fr-FR / id-ID / it-IT / ja-JP / ko-KR / pl-PL / pt-BR / ru-RU / th-TH / tr-TR / vi-VN / zh-CN / zh-TW
    );
    console.log(skins);
  } catch(err) {
    console.error(err);
  }
})();
```

## Support
* Read [Documentation](https://valorant-js.stoplight.io/docs/valorant-js/docs/Home.md) (OUTDATED, soon)

## Installation
```npm install @survfate/valorant.js --save```

## Credits
* [survfate](https://twitter.com/survfate) `@suRvFate#RyZ3N`
* [Sprayxe](https://twitter.com/Sprayxe_) `@MarcelWRLD#0999`
* [Speeedyyyy](https://twitter.com/Speeedyyyytv) `@Pilica#8525`
* [RumbleMike](https://twitter.com/RumbleMikee) `@RumbleMike#5406` (API Documentation)

## Dependencies
* [Axios](https://www.npmjs.com/package/axios)
* [TypeScript](https://www.npmjs.com/package/typescript)
* [QueryString](https://www.npmjs.com/package/querystring)