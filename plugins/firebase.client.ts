// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export default defineNuxtPlugin(() => {
  const firebaseConfig = {
    apiKey: 'AIzaSyAPS_uv-SX6EJ6sxRGzAHXzI9PvKXqeDuk',
    authDomain: 'nu-shinkan.firebaseapp.com',
    projectId: 'nu-shinkan',
    storageBucket: 'nu-shinkan.appspot.com',
    messagingSenderId: '1094048142661',
    appId: '1:1094048142661:web:edf5b73e0df2936e08da2c',
    measurementId: 'G-XLT2GPGG4J',
  }

  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  const analytics = getAnalytics(app)
})
