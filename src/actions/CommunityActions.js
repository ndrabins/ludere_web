import {
  FETCH_DIRECT_MESSAGE,
  CREATE_CONVERSATION,
  CREATE_CONVERSATION_SUCCESS,
  CREATE_CONVERSATION_ERROR,
  FETCH_CONVERSATION_MESSAGES,
  FETCH_CONVERSATION_MESSAGES_SUCCESS,
  FETCH_CONVERSATION_MESSAGES_ERROR,
  SEND_DIRECT_MESSAGE,
} from "./types";
import firebase from "firebase";

require("firebase/firestore");

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
      .where("type", "==", "direct").onSnapshot(function (querySnapshot) {

        //If direct message exists, listen to it.
        //If direct message does not exist, create it
        if (querySnapshot.size > 0) {
          //Only do stuff with the first direct message returned
          let conversationID = querySnapshot.docs[0].id
          dispatch(fetchConversationMessages(conversationID));
        } else {
          dispatch(createConversation(uid, recieverUID));
        }
      });
  }
}

export function sendDirectMessage(messageText){
  return (dispatch, getState) => {
    let { uid } = getState().auth.user;
    let { selectedConversation } = getState().community;

    let message = {
      sentBy : uid,
      dateCreated: Date.now(),
      messageText: messageText,
      sentByDisplayName: "bob",
      edited: 'false',
    }

    let messageRef = firebase.firestore().collection(`community/${selectedConversation}/messages`);
    messageRef.add(message)
    .then(function(docRef) {
      dispatch({ type: SEND_DIRECT_MESSAGE});
    })
  }
}

function fetchConversationMessages(conversationID){
  return dispatch => {
    dispatch({ type: FETCH_CONVERSATION_MESSAGES, selectedConversation: conversationID });

    let messageRef = firebase.firestore().collection(`community/${conversationID}/messages`);
    messageRef.orderBy("dateCreated")
      .onSnapshot(function(querySnapshot) {
        var messages = {};
        querySnapshot.forEach(function(doc) {
          messages[doc.id] = doc.data();
        });
        dispatch({ type: FETCH_CONVERSATION_MESSAGES_SUCCESS, messages: messages });
    });

    // dispatch({ type: FETCH_CONVERSATION_MESSAGES_ERROR });
  }
}

function createConversation(myUID, recieverUID) {
  return dispatch => {
    dispatch({ type: CREATE_CONVERSATION });

    let directMessage = {
      dateCreated: Date.now(),
      type: "direct",
      members: {}
    };

    console.log("myUID", myUID);
    console.log("reciverUID", recieverUID);
    directMessage.members[myUID] = true;
    directMessage.members[recieverUID] = true;

    firebase
      .firestore()
      .collection("community")
      .add(directMessage)
      .then(function(docRef) {
        dispatch({ type: CREATE_CONVERSATION_SUCCESS });
      })
      .catch(function(error) {
        dispatch({ type: CREATE_CONVERSATION_SUCCESS });
        console.error("Error adding document: ", error);
      });
  }
}
