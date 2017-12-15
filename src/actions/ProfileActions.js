import {
  FETCH_USER_PROFILE,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_ERROR,
  FETCH_MY_USER_PROFILE_SUCCESS
} from "./types";
import firebase from "firebase";

require("firebase/firestore");

//fetch my profileID on default
export function fetchUserProfile(userID = null) {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_USER_PROFILE });
    let { uid } = getState().auth.user;
    let profileID;
    let type;
    if (userID === null) {
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
      dispatch({ type: type, profile: doc.data() });
    });
  };
}
