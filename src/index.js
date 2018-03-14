import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/App";
import registerServiceWorker from "./registerServiceWorker";

import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";

import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; //this is synchronous which is too slow.
import * as storage from "localforage";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import { PersistGate } from "redux-persist/integration/react";

import ReduxThunk from "redux-thunk";
import rootReducer from "./reducers";

import firebase from "firebase";

// Development
// var config = {
//   apiKey: "AIzaSyB-ZZE-ROAr-JOOmDQIa-v4YBwLzbXGklE",
//   authDomain: "dev-ludere.firebaseapp.com",
//   databaseURL: "https://dev-ludere.firebaseio.com",
//   projectId: "dev-ludere",
//   storageBucket: "",
//   messagingSenderId: "826975908697"
// };

// Staging
var config = {
  apiKey: "AIzaSyBN3GDDJkYMChPbB6sxZuwIEI1noSvQ0FE",
  authDomain: "staging-ludere.firebaseapp.com",
  databaseURL: "https://staging-ludere.firebaseio.com",
  projectId: "staging-ludere",
  storageBucket: "staging-ludere.appspot.com",
  messagingSenderId: "674177146337"
};

// Production

// var config = {
//   apiKey: "AIzaSyCTXUH-KwzEqiWKXOlJus7ridhcaik1834",
//   authDomain: "production-ludere.firebaseapp.com",
//   databaseURL: "https://production-ludere.firebaseio.com",
//   projectId: "production-ludere",
//   storageBucket: "production-ludere.appspot.com",
//   messagingSenderId: "468372447431"
// };

firebase.initializeApp(config);

const persistConfig = {
  key: "ludereRoot",
  storage,
  stateReconciler: hardSet
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
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
