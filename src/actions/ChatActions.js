import {
  SELECT_CHANNEL,
  CREATE_CHANNEL,
  CREATE_CHANNEL_SUCCESS,
  CREATE_CHANNEL_ERROR,
  FETCH_CHANNELS,
  FETCH_CHANNELS_SUCCESS,
  FETCH_CHANNELS_ERROR
} from "./types";

import firebase from "firebase";
require("firebase/firestore");

export function fetchChannels(selectedTeam) {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_CHANNELS });
    console.log("loading chat for ", selectedTeam);

    let chatRef = firebase.firestore().collection("chat");
    chatRef
      .where(`team`, "==", selectedTeam)
      .onSnapshot(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          console.log(doc.data());
        });
      });
  };
}
