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
  UPDATE_CHANNEL,
  DELETE_CHANNEL,
  DELETE_MESSAGE,
  UPDATE_MESSAGE
} from "./types";

import firebase from "firebase/app";
import { readNotification } from "./NotificationActions";

export function fetchChannels(selectedTeam) {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_CHANNELS });
    let { selectedWorkspace } = getState().workspace;
    let { selectedTeam } = getState().team;

    var chatRef = firebase
      .firestore()
      .collection(`workspaces/${selectedWorkspace}/teams/${selectedTeam}/chat`);
    var channelListener = chatRef
      .where(`teamID`, "==", selectedTeam)
      .where("workspaceID", "==", selectedWorkspace)
      .where("type", "==", "public")
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

export function createChannel(channelName, channelID = null) {
  return (dispatch, getState) => {
    let { uid } = getState().auth.user;
    let { selectedTeam } = getState().team;
    let { selectedWorkspace } = getState().workspace;
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();

    let channel = {
      createdBy: uid,
      name: channelName,
      dateCreated: timestamp,
      type: "public",
      teamID: selectedTeam,
      workspaceID: selectedWorkspace,
      usersTyping: {}
    };

    dispatch({ type: CREATE_CHANNEL });

    // if channelID does not equal null or undefined, set the object with the task ID
    if (!!channelID) {
      channel.type = "taskComments";
      channel.name = "task comments";

      firebase
        .firestore()
        .doc(
          `workspaces/${selectedWorkspace}/teams/${selectedTeam}/chat/${channelID}`
        )
        .set(channel)
        .then(function(docRef) {
          dispatch({ type: CREATE_CHANNEL_SUCCESS });
        })
        .catch(function(error) {
          dispatch({ type: CREATE_CHANNEL_ERROR });
          console.error("Error adding document: ", error);
        });
    } else {
      firebase
        .firestore()
        .collection(
          `workspaces/${selectedWorkspace}/teams/${selectedTeam}/chat`
        )
        .add(channel)
        .then(function(docRef) {
          dispatch({ type: CREATE_CHANNEL_SUCCESS });
        })
        .catch(function(error) {
          dispatch({ type: CREATE_CHANNEL_ERROR });
          console.error("Error adding document: ", error);
        });
    }
  };
}

export function updateChannel(updates, channelID) {
  return (dispatch, getState) => {
    let { selectedTeam } = getState().team;
    let { selectedWorkspace } = getState().workspace;

    let channelRef = firebase
      .firestore()
      .collection(`workspaces/${selectedWorkspace}/teams/${selectedTeam}/chat`)
      .doc(channelID);

    channelRef.set(updates, { merge: true }).then(function() {
      dispatch({ type: UPDATE_CHANNEL });
    });
  };
}

export function selectChannel(channelID) {
  return (dispatch, getState) => {
    let { selectedTeam } = getState().team;
    let { selectedWorkspace } = getState().workspace;

    const oldChannelID = getState().chat.selectedChannel;
    dispatch(unsubscribeFromMessages(oldChannelID)); //unsubscribe from previous channels

    if (channelID === null) {
      dispatch({ type: SELECT_CHANNEL, selectedChannel: null });
      return;
    }

    dispatch(readNotification(channelID));
    dispatch({ type: SELECT_CHANNEL, selectedChannel: channelID });

    let messageRef = firebase
      .firestore()
      .collection(
        `workspaces/${selectedWorkspace}/teams/${selectedTeam}/chat/${channelID}/messages`
      );

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
    let { selectedTeam } = getState().team;
    let { selectedWorkspace } = getState().workspace;

    const selectedChannelID = getState().chat.selectedChannel;

    let oldMessageListener = getState().chat.messagesListener;
    oldMessageListener();

    dispatch({ type: FETCH_MORE_MESSAGES });

    let messageRef = firebase
      .firestore()
      .collection(
        `workspaces/${selectedWorkspace}/teams/${selectedTeam}/chat/${selectedChannelID}/messages`
      );

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

export function sendMessage({
  messageText,
  type = "message",
  fileURL = "",
  channelID = null
}) {
  return (dispatch, getState) => {
    let { uid } = getState().auth.user;
    let { photoURL } = getState().profile.myUserProfile;
    let { selectedChannel } = getState().chat;
    let { selectedWorkspace } = getState().workspace;
    let { selectedTeam } = getState().team;

    const timestamp = firebase.firestore.FieldValue.serverTimestamp();

    // if we pass in a channelID use that, if not use selected channel
    let targetChannelID = !!channelID ? channelID : selectedChannel;

    //need to refactor this lol..
    let myName = getState().workspace.workspaceUsers[uid].displayName;

    let message = {
      sentBy: uid,
      dateCreated: timestamp,
      dateUpdated: timestamp,
      messageText: messageText,
      sentByDisplayName: myName,
      edited: false,
      avatarURL: photoURL,
      fileURL: fileURL,
      type: type // VS. type file later...
    };

    let messageRef = firebase
      .firestore()
      .collection(
        `workspaces/${selectedWorkspace}/teams/${selectedTeam}/chat/${targetChannelID}/messages`
      );

    messageRef.add(message).then(function(docRef) {
      dispatch({ type: SEND_MESSAGE });
    });
  };
}

export function updateMessage(messageID, updatedMessage, channelID) {
  return (dispatch, getState) => {
    let { selectedWorkspace } = getState().workspace;
    let { selectedTeam } = getState().team;

    let messageRef = firebase
      .firestore()
      .doc(
        `workspaces/${selectedWorkspace}/teams/${selectedTeam}/chat/${channelID}/messages/${messageID}`
      );

    messageRef.update(updatedMessage).then(function() {
      dispatch({ type: UPDATE_MESSAGE });
    });
  };
}

export function deleteMessage(messageID, channelID) {
  return (dispatch, getState) => {
    let { selectedWorkspace } = getState().workspace;
    let { selectedTeam } = getState().team;

    let messageRef = firebase
      .firestore()
      .doc(
        `workspaces/${selectedWorkspace}/teams/${selectedTeam}/chat/${channelID}/messages/${messageID}`
      );

    messageRef.delete().then(function() {
      dispatch({ type: DELETE_MESSAGE });
    });
  };
}

export function deleteChannel(channelID) {
  return (dispatch, getState) => {
    let { selectedWorkspace } = getState().workspace;
    let { selectedTeam } = getState().team;

    const chatRef = firebase
      .firestore()
      .collection(`workspaces/${selectedWorkspace}/teams/${selectedTeam}/chat`)
      .doc(channelID);

    dispatch(selectChannel(null));

    chatRef.delete().then(function(docRef) {
      dispatch({ type: DELETE_CHANNEL });
    });
  };
}
