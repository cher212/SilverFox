// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const environment = {
  production: false,


// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
 firebaseConfig : {
  apiKey: "AIzaSyC0eL1AtdgHESjH8QhweLtfYgLZZcONSRs",
  authDomain: "silverfox-c7491.firebaseapp.com",
  databaseURL: "https://silverfox-c7491-default-rtdb.firebaseio.com",
  projectId: "silverfox-c7491",
  storageBucket: "silverfox-c7491.appspot.com",
  messagingSenderId: "205889353966",
  appId: "1:205889353966:web:286ff946cf9381fdc69bff",
  measurementId: "G-47RHWRMR0P"
}
};

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);