// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    api_url: 'http://localhost:3600/api',
    file_api_url: 'http://localhost:3600/api/Fileservice',
    SecretKey: "TTRAINING001224GGWTT",  //it should be 32 char long, use only for client side encrypt/decrypt, do not NEVER use the SAME key in server side. 
    SecretSalt: "VITRAINING001222987",  //it should be 16 char long, use only for client side encrypt/decrypt, do not NEVER use the SAME key in server side.
    localstorage_prefix : "training2023",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
