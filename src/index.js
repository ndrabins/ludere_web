import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/App";
import * as serviceWorker from "./serviceWorker";

import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";

import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; //this is synchronous which is too slow.
import * as storage from "localforage";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "common/Loading";

import ReduxThunk from "redux-thunk";
import rootReducer from "./reducers";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/messaging";
import "firebase/auth";
import "firebase/messaging";
import "firebase/functions";

const url = window.location.href;
let config;
// if (url.includes("app")) {
//   // prod
//   config = {
//     apiKey: "AIzaSyCTXUH-KwzEqiWKXOlJus7ridhcaik1834",
//     authDomain: "production-ludere.firebaseapp.com",
//     databaseURL: "https://production-ludere.firebaseio.com",
//     projectId: "production-ludere",
//     storageBucket: "production-ludere.appspot.com",
//     messagingSenderId: "468372447431"
//   };
// } else

if (url.includes("staging")) {
  // staging
  config = {
    apiKey: "AIzaSyBN3GDDJkYMChPbB6sxZuwIEI1noSvQ0FE",
    authDomain: "staging-ludere.firebaseapp.com",
    databaseURL: "https://staging-ludere.firebaseio.com",
    projectId: "staging-ludere",
    storageBucket: "staging-ludere.appspot.com",
    messagingSenderId: "674177146337",
  };
} else if (url.includes("beta")) {
  config = {
    apiKey: "AIzaSyBGaxF7Gkwl0dAkEeOMStGgqDhdJdKXnWY",
    authDomain: "beta-ludere.firebaseapp.com",
    databaseURL: "https://beta-ludere.firebaseio.com",
    projectId: "beta-ludere",
    storageBucket: "beta-ludere.appspot.com",
    messagingSenderId: "824616822639",
  };
} else {
  //dev
  config = {
    apiKey: "AIzaSyB-ZZE-ROAr-JOOmDQIa-v4YBwLzbXGklE",
    authDomain: "dev-ludere.firebaseapp.com",
    databaseURL: "https://dev-ludere.firebaseio.com",
    projectId: "dev-ludere",
    storageBucket: "dev-ludere.appspot.com",
    messagingSenderId: "826975908697",
  };
}

firebase.initializeApp(config);
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

const persistConfig = {
  key: "ludereRoot",
  storage,
  stateReconciler: hardSet,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(ReduxThunk));

let store = createStore(persistedReducer, enhancer);
let persistor = persistStore(store);

// <App />
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
