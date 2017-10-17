import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/App";
import registerServiceWorker from "./registerServiceWorker";

import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import reducers from "./reducers";

import firebase from "firebase";

import Dashboard from './containers/Dashboard';

var config = {
  apiKey: "AIzaSyDBODwiyli_Rn3WcEBWRc8TMXTEAqatgHQ",
  authDomain: "newapp-6c93a.firebaseapp.com",
  databaseURL: "https://newapp-6c93a.firebaseio.com",
  projectId: "newapp-6c93a",
  storageBucket: "newapp-6c93a.appspot.com",
  messagingSenderId: "253006161914"
};

firebase.initializeApp(config);


const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(ReduxThunk));

const store = createStore(reducers, enhancer);

// <App />
ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
