import { AUTH_ERROR, AUTH_USER, SIGN_OUT_USER, AUTH_SUCCESS } from "./types";
import firebase from "firebase";

export function signUpUser(email, password) {
  return function(dispatch) {
    dispatch({ type: AUTH_USER });
    console.log("signing up with ", email, password);

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        authSuccess(dispatch, user);

        user.sendEmailVerification().then(function() {
          // Email sent.
          console.log("sent email");
        }).catch(function(error) {
          // An error happened.
          console.log("could not send verification email");
        });
        // .updateProfile({displayName: values["displayName"]}
        // firebase.auth().currentUser.updateProfile({displayName: credentials.displayName});
      })
      .catch(error => {
        dispatch(authError(error));
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
