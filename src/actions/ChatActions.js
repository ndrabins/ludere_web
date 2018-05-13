import {
  SELECT_CHANNEL,
  CREATE_CHANNEL,
  CREATE_CHANNEL_SUCCESS,
  CREATE_CHANNEL_ERROR,
  FETCH_CHANNELS,
  FETCH_CHANNELS_SUCCESS,
  FETCH_MESSAGES,
  FETCH_MESSAGES_SUCCESS,
  SEND_MESSAGE,
  UNSUBSCRIBE_CHANNELS,
  UNSUBSCRIBE_MESSAGES,
  FETCH_MORE_MESSAGES,
  FETCH_MORE_MESSAGES_SUCCESS,
  UPDATE_CHANNEL
} from "./types";

import firebase from "firebase";
require("firebase/firestore");

export function fetchChannels(selectedTeam) {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_CHANNELS });

    var chatRef = firebase.firestore().collection("chat");
    var channelListener = chatRef
      .where(`team`, "==", selectedTeam)
      .onSnapshot(function(querySnapshot) {
        var channels = {};
        querySnapshot.forEach(function(doc) {
          channels[doc.id] = doc.data();
        });
        dispatch({
          type: FETCH_CHANNELS_SUCCESS,
          channels: channels,
          channelListener: channelListener
        });
      });
  };
}

export function unsubscribeFromChannels() {
  return (dispatch, getState) => {
    const channelListener = getState().chat.channelListener;
    if (channelListener == null) return; // do nothing if no listener

    channelListener();
    dispatch({ type: UNSUBSCRIBE_CHANNELS });
  };
}

export function unsubscribeFromMessages(channelID) {
  return (dispatch, getState) => {
    const messageListener = getState().chat.messagesListener;
    if (messageListener == null) return; // do nothing if no listener

    messageListener();
    dispatch({ type: UNSUBSCRIBE_MESSAGES });
  };
}

export function createChannel(channelName) {
  return (dispatch, getState) => {
    let { uid } = getState().auth.user;
    let { selectedTeam } = getState().team;
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();

    let channel = {
      createdBy: uid,
      name: channelName,
      dateCreated: timestamp,
      type: "public",
      team: selectedTeam
    };

    dispatch({ type: CREATE_CHANNEL });

    firebase
      .firestore()
      .collection("chat")
      .add(channel)
      .then(function(docRef) {
        dispatch({ type: CREATE_CHANNEL_SUCCESS });
      })
      .catch(function(error) {
        dispatch({ type: CREATE_CHANNEL_ERROR });
        console.error("Error adding document: ", error);
      });
  };
}

export function updateChannel(updates, channelID) {
  return (dispatch, getState) => {
    let channelRef = firebase
      .firestore()
      .collection("chat")
      .doc(channelID);

    channelRef.update(updates).then(function() {
      dispatch({ type: UPDATE_CHANNEL });
    });
  };
}

export function selectChannel(channelID) {
  return (dispatch, getState) => {
    const oldChannelID = getState().chat.selectedChannel;
    dispatch(unsubscribeFromMessages(oldChannelID)); //unsubscribe from previous channels

    dispatch({ type: SELECT_CHANNEL, selectedChannel: channelID });

    let messageRef = firebase
      .firestore()
      .collection(`chat/${channelID}/messages`);

    dispatch({ type: FETCH_MESSAGES });

    var messageListener = messageRef
      .orderBy("dateCreated", "desc")
      .limit(50)
      .onSnapshot(function(querySnapshot) {
        var messages = {};
        querySnapshot.forEach(function(doc) {
          messages[doc.id] = doc.data();
        });

        // var lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        // console.log("last", lastVisible);

        dispatch({
          type: FETCH_MESSAGES_SUCCESS,
          messages: messages,
          messagesListener: messageListener
        });
      });
  };
}

export function getMoreMessages(numberOfMessages) {
  return (dispatch, getState) => {
    const selectedChannelID = getState().chat.selectedChannel;
    let oldMessageListener = getState().chat.messagesListener;
    oldMessageListener();

    dispatch({ type: FETCH_MORE_MESSAGES });

    let messageRef = firebase
      .firestore()
      .collection(`chat/${selectedChannelID}/messages`);

    var messageListener = messageRef
      .orderBy("dateCreated", "desc")
      .limit(numberOfMessages)
      .onSnapshot(function(querySnapshot) {
        var messages = {};
        querySnapshot.forEach(function(doc) {
          messages[doc.id] = doc.data();
        });

        dispatch({
          type: FETCH_MORE_MESSAGES_SUCCESS,
          messages: messages,
          messagesListener: messageListener
        });
      });
  };
}

export function sendMessage({ messageText, type = "message", fileURL = "" }) {
  return (dispatch, getState) => {
    let { uid } = getState().auth.user;
    let { photoURL } = getState().profile.myUserProfile;
    let { selectedChannel } = getState().chat;
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();

    //need to refactor this lol..
    let myName = getState().workspace.workspaceUsers[uid].displayName;

    let message = {
      sentBy: uid,
      dateCreated: timestamp,
      dateUpdated: timestamp,
      messageText: messageText,
      sentByDisplayName: myName,
      edited: "false",
      avatarURL: photoURL,
      emojis: [],
      fileURL: fileURL,
      type: type // VS. type file later...
    };

    let messageRef = firebase
      .firestore()
      .collection(`chat/${selectedChannel}/messages`);

    messageRef.add(message).then(function(docRef) {
      dispatch({ type: SEND_MESSAGE });
    });
  };
}
