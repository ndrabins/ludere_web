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

var config = {
  apiKey: "AIzaSyDBODwiyli_Rn3WcEBWRc8TMXTEAqatgHQ",
  authDomain: "newapp-6c93a.firebaseapp.com",
  databaseURL: "https://newapp-6c93a.firebaseio.com",
  projectId: "newapp-6c93a",
  storageBucket: "newapp-6c93a.appspot.com",
  messagingSenderId: "253006161914"
};

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
