import {
  AUTH_ERROR,
  AUTH_USER,
  SIGN_OUT_USER,
  AUTH_SUCCESS,
  LOAD_APP_DATA,
  LOAD_APP_DATA_SUCCESS,
  LOAD_APP_DATA_ERROR,
  INITIALIZE_USER,
} from "./types";
import firebase from "firebase";
import { INITIALIZE } from "redux-form/lib/actionTypes";

require("firebase/firestore");

export function signUpUser(email, password) {
  return function(dispatch) {
    dispatch({ type: AUTH_USER });
    console.log("signing up with ", email, password);

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        authSuccess(dispatch, user);

        //initialize the user to our user storage in firestore
        //This is where we will store all the users profile information instead of firebases user object
        //This is because you can't add fields to firebases user object
        dispatch(initializeUser(user));

        user
          .sendEmailVerification()
          .then(function() {
            // Email sent.
            console.log("sent email");
          })
          .catch(function(error) {
            // An error happened.
            console.log("could not send verification email");
          });
      })
      .catch(error => {
        dispatch(authError(error));
      });
  };
}

function initializeUser(user) {
  //data only owner of account can see/change
  let privateData = {
    uid : user.uid,
    emailVerified: user.emailVerified,
    createdAt : Date.now(),
    email: user.email,
  }

  let ourUserObject = {
    privateData: privateData,
    workspaces: {},
    displayName: user.displayName,
    photoURL: user.photoURL,
    lastLoginAt : Date.now(),
  };
  let uid = user.uid;

  let userRef = firebase.firestore().collection("users").doc(uid);
  return dispatch => {
    userRef.set(ourUserObject).then(function() {
      dispatch({ type: INITIALIZE_USER });
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
  }
}

export function signInUser(email, password) {
  return dispatch => {
    dispatch({ type: AUTH_USER });

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => authSuccess(dispatch, user))
      .catch(error => {
        dispatch(authError(error));
      });
  };
}

export function signOutUser() {
  return function(dispatch) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({
          type: SIGN_OUT_USER
        });
      });
  };
}

export function verifyAuth() {
  return function(dispatch) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        authSuccess(dispatch, user);
      } else {
        dispatch(signOutUser());
      }
    });
  };
}

export function authUser() {
  return {
    type: AUTH_USER
  };
}

export function authError(error) {
  console.log("auth error");
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

const authSuccess = (dispatch, user) => {
  console.log("auth success!");
  dispatch({
    type: AUTH_SUCCESS,
    payload: user
  });
};

//this is where we will want to make all initial data calls for app.
export function loadAppData() {
  return dispatch => {
    dispatch({ type: LOAD_APP_DATA });
  };
}
