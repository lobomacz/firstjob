// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  fbConfig:{
    apiKey: "AIzaSyCiJpdl_HY94DytrkutH70YZtLLi50iVzI",
    authDomain: "firstjobapp-ba90d.firebaseapp.com",
    databaseURL: "https://firstjobapp-ba90d.firebaseio.com",
    projectId: "firstjobapp-ba90d",
    storageBucket: "firstjobapp-ba90d.appspot.com",
    messagingSenderId: "601171084338"
  },
  appUrl:'http://localhost:3000'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
