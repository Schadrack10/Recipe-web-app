import React from 'react';
// import ReactDOM from 'react-dom/client'; //original import
import ReactDOM from 'react-dom/client'; //added import

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Layout from './components/Layout';
import { AuthContextProvider } from './components/store/auth-context';
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { initializeApp } from "firebase/app";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
// import {createRoot} from 'react-dom/client';


// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCigE9wB5fEJvwqNL--tCJAfWTSSrnsuTE",
  authDomain: "recipe-web-app-949d9.firebaseapp.com",
  projectId: "recipe-web-app-949d9",
  storageBucket: "recipe-web-app-949d9.appspot.com",
  messagingSenderId: "862374333889",
  appId: "1:862374333889:web:80d4ee2e3295e08165b340"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)





const root = ReactDOM.createRoot(document.getElementById('root'));

// const rootElement = document.getElementById('root');
// const root = createRoot(rootElement);


root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AuthContextProvider>
  </BrowserRouter>
);



// ReactDOM.createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
//   <AuthContextProvider>
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   </AuthContextProvider>
//   </BrowserRouter>
// );
// ReactDOM.render(
//    <BrowserRouter>
//  <AuthContextProvider>
//    <React.StrictMode>
//      <App />
//    </React.StrictMode>
//  </AuthContextProvider>
//  </BrowserRouter>
//  , document.getElementById('root'))




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();




// ReactDOM.render(<App />, document.getElementById('root')); //render method