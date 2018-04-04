import {
  AUTH_ERROR,
  AUTH_USER,
  SIGN_OUT_USER,
  AUTH_SUCCESS,
  INITIALIZE_USER
} from "./types";
import firebase from "firebase";
import * as localforage from "localforage";

require("firebase/firestore");

export function signUpUser(email, password) {
  return function(dispatch) {
    dispatch({ type: AUTH_USER });

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

export function authWithProvider(providerType) {
  return function(dispatch) {
    dispatch({ type: AUTH_USER });
    let provider;

    if (providerType === "Google") {
      provider = new firebase.auth.GoogleAuthProvider();
    } else if (providerType === "Twitter") {
      provider = new firebase.auth.TwitterAuthProvider();
    }

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        var user = result.user;

        //check if user has been initialized in Ludere
        //if they have your done, if not initialize them
        var userRef = firebase
          .firestore()
          .collection("users")
          .doc(user.uid);
        userRef.get().then(function(doc) {
          if (!doc.exists) {
            dispatch(initializeUser(user));
          }
          authSuccess(dispatch, user);
        });
      })
      .catch(function(error) {
        authError(error);
      });
  };
}

function initializeUser(user) {
  //data only owner of account can see/change
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();

  let privateData = {
    uid: user.uid,
    emailVerified: user.emailVerified,
    createdAt: timestamp,
    email: user.email
  };

  let ourUserObject = {
    privateData: privateData,
    workspaces: {},
    displayName: user.email, //till we get the user to set their own displayname? Probs should be part of the sign up?
    photoURL: user.photoURL,
    lastLoginAt: timestamp,
    conversations: {} //conversationID:boolean , if a converstion is true it is an active one, if not it is inactive
  };
  let uid = user.uid;

  let userRef = firebase
    .firestore()
    .collection("users")
    .doc(uid);
  return dispatch => {
    userRef
      .set(ourUserObject)
      .then(function() {
        dispatch({ type: INITIALIZE_USER });
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  };
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

    localforage
      .clear()
      .then(function() {
        // Run this code once the database has been entirely deleted.
      })
      .catch(function(err) {
        // This code runs if there were any errors
        console.log(err);
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
