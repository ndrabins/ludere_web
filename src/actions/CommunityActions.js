import {
  FETCH_DIRECT_MESSAGE,
  CREATE_CONVERSATION,
  CREATE_CONVERSATION_SUCCESS,
  FETCH_CONVERSATION_MESSAGES,
  FETCH_CONVERSATION_MESSAGES_SUCCESS,
  SEND_DIRECT_MESSAGE,
  ADD_ACTIVE_CONVERSATION_SUCCESS,
  ADD_ACTIVE_CONVERSATION_ERROR,
  FETCH_CONVERSATIONS,
  FETCH_CONVERSATIONS_SUCCESS,
  SET_CONVERSATION_INACTIVE,
  UNSUBSCRIBE_CONVERSATION_MESSAGES,
  UNSUBSCRIBE_CONVERSATIONS
} from "./types";
import firebase from "firebase/app";

export function startDirectMessage(recieverUID, recieverInfo) {
  /*
    1. Check if conversation exists
      -where myUid is a member
      -where recieverUID is a member
      -type: direct
      a. If conversation exists, load it
      b. If conversation does not exist, create new chat with:
        members: {myUID, recieverUID}
        type: "direct"
        createdOn: Date.now()

    2. TODO group chatps
  */
  return (dispatch, getState) => {
    dispatch({ type: FETCH_DIRECT_MESSAGE });
    let { uid } = getState().auth.user;

    var directMessageRef = firebase.firestore().collection("community");

    directMessageRef
      .where(`members.${uid}`, "==", true)
      .where(`members.${recieverUID}`, "==", true)
      .where("type", "==", "direct")
      .onSnapshot(function(querySnapshot) {
        //If direct message exists, listen to it.
        //If direct message does not exist, create it
        if (querySnapshot.size > 0) {
          //Only do stuff with the first direct message returned
          let conversationID = querySnapshot.docs[0].id;
          dispatch(fetchConversationMessages(conversationID));
        } else {
          dispatch(createConversation(uid, recieverUID));
        }
      });
  };
}

export function sendDirectMessage(messageText) {
  return (dispatch, getState) => {
    let { uid } = getState().auth.user;
    let { selectedConversation } = getState().community;
    let { photoURL } = getState().profile.myUserProfile;

    //refactor this here AND in chat actions
    let myName = getState().workspace.workspaceUsers[uid].displayName;
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();

    let message = {
      sentBy: uid,
      dateCreated: timestamp,
      dateUpdated: timestamp,
      messageText: messageText,
      sentByDisplayName: myName,
      edited: "false",
      avatarURL: photoURL,
      type: "message" // VS. type file later...
    };

    let messageRef = firebase
      .firestore()
      .collection(`community/${selectedConversation}/messages`);
    messageRef.add(message).then(function(docRef) {
      dispatch({ type: SEND_DIRECT_MESSAGE });
    });
  };
}

export function fetchConversations() {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_CONVERSATIONS });
    let { uid } = getState().auth.user;
    var conversationsRef = firebase.firestore().collection("community");

    var conversationsListener = conversationsRef
      .where(`members.${uid}`, "==", true)
      .onSnapshot(function(querySnapshot) {
        var conversations = {};
        querySnapshot.forEach(function(doc) {
          conversations[doc.id] = doc.data();
        });
        dispatch({
          type: FETCH_CONVERSATIONS_SUCCESS,
          conversations: conversations,
          conversationsListener: conversationsListener
        });
      });
  };
}

export function fetchConversationMessages(conversationID) {
  return dispatch => {
    dispatch({
      type: FETCH_CONVERSATION_MESSAGES,
      selectedConversation: conversationID
    });

    let messageRef = firebase
      .firestore()
      .collection(`community/${conversationID}/messages`);

    var messagesListener = messageRef
      .orderBy("dateCreated")
      .onSnapshot(function(querySnapshot) {
        var messages = {};
        querySnapshot.forEach(function(doc) {
          messages[doc.id] = doc.data();
        });
        dispatch({
          type: FETCH_CONVERSATION_MESSAGES_SUCCESS,
          messages: messages,
          messagesListener: messagesListener
        });
      });

    dispatch(addToActiveConversations(conversationID)); //add to active conversations for user
  };
}

export function unsubscribeFromMessages() {
  return (dispatch, getState) => {
    const messagesListener = getState().community.messagesListener;
    if (messagesListener == null) return; // do nothing if no listener

    messagesListener();
    dispatch({ type: UNSUBSCRIBE_CONVERSATION_MESSAGES });
  };
}

export function unsubscribeFromConversations() {
  return (dispatch, getState) => {
    const conversationsListener = getState().community.conversationsListener;
    if (conversationsListener == null) return; // do nothing if no listener

    conversationsListener();
    dispatch({ type: UNSUBSCRIBE_CONVERSATIONS });
  };
}

export function setConversationInactive(conversationID) {
  return (dispatch, getState) => {
    let { uid } = getState().auth.user;
    let conversationRef = firebase
      .firestore()
      .collection("users")
      .doc(uid);
    dispatch({ type: SET_CONVERSATION_INACTIVE });

    let updateConversation = {};
    updateConversation = {
      conversations: {}
    };

    updateConversation.conversations[conversationID] = false;

    conversationRef.set(updateConversation, { merge: true });
  };
}

function createConversation(myUID, recieverUID) {
  return dispatch => {
    dispatch({ type: CREATE_CONVERSATION });
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();

    let directMessage = {
      dateCreated: timestamp,
      type: "direct",
      members: {}
    };

    directMessage.members[myUID] = true;
    directMessage.members[recieverUID] = true;

    firebase
      .firestore()
      .collection("community")
      .add(directMessage)
      .then(function(docRef) {
        dispatch({ type: CREATE_CONVERSATION_SUCCESS });
        dispatch(addToActiveConversations(docRef.id)); //add new conversation to active conversation
      })
      .catch(function(error) {
        dispatch({ type: CREATE_CONVERSATION_SUCCESS });
        console.error("Error adding document: ", error);
      });
  };
}

function addToActiveConversations(conversationID) {
  return (dispatch, getState) => {
    let { uid } = getState().auth.user;

    let conversationUpdate = {};
    conversationUpdate[`conversations.${conversationID}`] = true;

    let activeConversationRef = firebase
      .firestore()
      .collection("users")
      .doc(uid);
    activeConversationRef
      .update(conversationUpdate)
      .then(function() {
        dispatch({ type: ADD_ACTIVE_CONVERSATION_SUCCESS });
      })
      .catch(function(error) {
        dispatch({ type: ADD_ACTIVE_CONVERSATION_ERROR });
        console.error("Error writing document: ", error);
      });
  };
}
