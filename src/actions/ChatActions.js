import {
  SELECT_CHANNEL,
  CREATE_CHANNEL,
  CREATE_CHANNEL_SUCCESS,
  CREATE_CHANNEL_ERROR,
  FETCH_CHANNELS,
  FETCH_CHANNELS_SUCCESS,
  FETCH_CHANNELS_ERROR,
  FETCH_MESSAGES,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_ERROR,
  SEND_MESSAGE,
} from "./types";

import firebase from "firebase";
require("firebase/firestore");

export function fetchChannels(selectedTeam) {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_CHANNELS });

    let chatRef = firebase.firestore().collection("chat");
    chatRef
      .where(`team`, "==", selectedTeam)
      .onSnapshot(function(querySnapshot) {
        var channels = {};
        querySnapshot.forEach(function(doc) {
          channels[doc.id] = doc.data();
        });
        dispatch({ type: FETCH_CHANNELS_SUCCESS, channels: channels });
      });
  };
}

export function createChannel(channelName) {
  return (dispatch, getState) => {
    let { uid } = getState().auth.user;
    let { selectedTeam } = getState().team;

    let channel = {
      createdBy: uid,
      name: channelName,
      dateCreated: Date.now(),
      type: "public",
      team: selectedTeam
    };

    dispatch({ type: CREATE_CHANNEL });

    firebase
      .firestore()
      .collection("chat")
      .add(channel)
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        dispatch({ type: CREATE_CHANNEL_SUCCESS });
      })
      .catch(function(error) {
        dispatch({ type: CREATE_CHANNEL_ERROR });
        console.error("Error adding document: ", error);
      });
  };
}

export function selectChannel(channelID) {
  console.log("selected", channelID);
  return dispatch => {
    dispatch({ type: SELECT_CHANNEL, selectedChannel: channelID});

    dispatch({ type: FETCH_MESSAGES});
    let messageRef = firebase.firestore().collection(`chat/${channelID}/messages`);
    messageRef.orderBy("dateCreated")
      .onSnapshot(function(querySnapshot) {
        var messages = {};
        querySnapshot.forEach(function(doc) {
          messages[doc.id] = doc.data();
        });
        dispatch({ type: FETCH_MESSAGES_SUCCESS, messages: messages });
    });
  };
}

export function sendMessage(messageText){
  return (dispatch, getState) => {
    let { uid } = getState().auth.user;
    let { selectedChannel } = getState().chat;
    let message = {
      sentBy : uid,
      dateCreated: Date.now(),
      messageText: messageText,
      sentByDisplayName:"bob",
    }

    let messageRef = firebase.firestore().collection(`chat/${selectedChannel}/messages`);

    messageRef.add(message)
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      console.log("sending message", message);
      dispatch({ type: SEND_MESSAGE});
    })
  }
}
