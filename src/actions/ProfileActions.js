import {
  FETCH_USER_PROFILE,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_MY_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE
} from "./types";
import firebase from "firebase";

require("firebase/firestore");

//fetch my profileID on default
export function fetchUserProfile(userID = "fetchMyProfile") {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_USER_PROFILE });
    let { uid } = getState().auth.user;
    let profileID;
    let type;

    //If no userID given, then fetch current users profile.
    if (userID === "fetchMyProfile") {
      profileID = uid;
      type = FETCH_MY_USER_PROFILE_SUCCESS;
    } else {
      profileID = userID;
      type = FETCH_USER_PROFILE_SUCCESS;
    }

    let profileRef = firebase
      .firestore()
      .collection(`users`)
      .doc(`${profileID}`);

    profileRef.onSnapshot(function(doc) {
      // TODO:  find out how this is returning undefined.
      dispatch({ type: type, profile: doc.data() });
    });
  };
}

export function updateUserProfile(userProfile) {
  return (dispatch, getState) => {
    let { uid } = getState().auth.user;
    dispatch({ type: UPDATE_USER_PROFILE });

    let profileRef = firebase
      .firestore()
      .collection(`users`)
      .doc(`${uid}`);

    profileRef.update(userProfile);
  };
}
