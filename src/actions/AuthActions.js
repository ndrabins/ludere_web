import {
  AUTH_ERROR,
  AUTH_USER,
  SIGN_OUT_USER,
  AUTH_SUCCESS,
  INITIALIZE_USER,
  RESET_PASSWORD
} from "./types";
import * as localforage from "localforage";
import firebase from "firebase/app";
import queryString from "query-string";

import * as workspaceActions from "./WorkspaceActions";
import * as profileActions from "./ProfileActions";

export function signUpUser(email, password) {
  return function(dispatch) {
    dispatch({ type: AUTH_USER });
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        authSuccess(dispatch, user.user);
        //initialize the user to our user storage in firestore
        //This is where we will store all the users profile information instead of firebases user object
        //This is because you can't add fields to firebases user object
        dispatch(initializeUser(user.user));
        user.user.sendEmailVerification().then(function() {
          console.log("sending verification email");
          // send email for them to verify their account
        });
      })
      .catch(error => {
        dispatch(authError("signup", error));
      });
  };
}

export function authWithProvider(providerType) {
  return function(dispatch) {
    dispatch({ type: AUTH_USER });
    let provider;

    if (providerType === "Google") {
      provider = new firebase.auth.GoogleAuthProvider();
    } else if (providerType === "Facebook") {
      provider = new firebase.auth.FacebookAuthProvider();
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
          // their first time signing in / up
          if (!doc.exists) {
            dispatch(initializeUser(user));
          }
          authSuccess(dispatch, user);
        });
      })
      .catch(function(error) {
        console.log("provider", error);
        authError(error);
      });
  };
}

function initializeUser(user, workspaceID) {
  //data only owner of account can see/change
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  let uid = user.uid;

  let ourUserObject = {
    uid: uid,
    emailVerified: user.emailVerified,
    createdAt: timestamp,
    email: user.email,
    displayName: user.email, //till we get the user to set their own displayname? Probs should be part of the sign up?
    photoURL:
      user.photoURL || "https://image.flaticon.com/icons/svg/186/186539.svg",
    workspaces: {},
    lastLoginAt: timestamp
  };

  // if valid workspaceID, add it to user object
  if (!!workspaceID) {
    ourUserObject.workspaces[workspaceID] = true;
  }

  let userRef = firebase
    .firestore()
    .collection("users")
    .doc(uid);
  return dispatch => {
    userRef
      .set(ourUserObject, { merge: true })
      .then(function() {
        dispatch({ type: INITIALIZE_USER });

        // //set user info
        //if workspace ID is attached to URL (user was invited) then join that workspace on sign up
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
      .then(user => authSuccess(dispatch, user.user))
      .catch(error => {
        dispatch(authError(error));
      });
  };
}

export function signInUserWithEmailLink(paramString, url) {
  return dispatch => {
    dispatch({ type: AUTH_USER });

    let params = queryString.parse(paramString);
    if (firebase.auth().isSignInWithEmailLink(url)) {
      // The client SDK will parse the code from the link for you.
      // firebase
      firebase
        .auth()
        .signInWithEmailLink(params.email, url)
        .then(user => {
          authSuccess(dispatch, user.user);

          //initialize the user to our user storage in firestore
          //This is where we will store all the users profile information instead of firebases user object
          //This is because you can't add fields to firebases user object

          var userRef = firebase
            .firestore()
            .collection("users")
            .doc(user.user.uid);
          userRef.get().then(function(doc) {
            if (!doc.exists) {
              dispatch(initializeUser(user.user, params.workspaceID));
            }
            authSuccess(dispatch, user);
          });
        })
        .catch(error => {
          console.log(error);
          dispatch(authError(error));
        });
    }
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

export function resetPassword(emailAddress) {
  return function(dispatch) {
    dispatch({
      type: RESET_PASSWORD
    });
    firebase
      .auth()
      .sendPasswordResetEmail(emailAddress)
      .then(function() {
        // Email sent.
      })
      .catch(function(error) {
        // An error happened.
      });
  };
}

export function verifyAuth() {
  return function(dispatch) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        authSuccess(dispatch, user);
        dispatch(profileActions.fetchUserProfile());
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
  dispatch({
    type: AUTH_SUCCESS,
    payload: user
  });
};
