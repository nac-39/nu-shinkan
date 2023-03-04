// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export default defineNuxtPlugin(() => {
  const firebaseConfig = {
    apiKey: 'AIzaSyAoitYXZqjPCfYR727c5osOrxhBQ2CQlQI',
    authDomain: 'nu-shinkan-92c7b.firebaseapp.com',
    projectId: 'nu-shinkan-92c7b',
    storageBucket: 'nu-shinkan-92c7b.appspot.com',
    messagingSenderId: '955850920562',
    appId: '1:955850920562:web:f12fc6863f2279545028eb',
    measurementId: 'G-W1171W9FFT',
  }

  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  const analytics = getAnalytics(app)
})
