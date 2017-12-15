import {
  SELECT_BOARD,
  FETCH_BOARDS,
  FETCH_BOARDS_SUCCESS,
  CREATE_BOARD
} from "./types";
import firebase from "firebase";

require("firebase/firestore");

//fetch my profileID on default
export function createBoard(boardName) {
  return (dispatch, getState) => {
    dispatch({ type: CREATE_BOARD });
    let { uid } = getState().auth.user;
    let selectedTeamID = getState().team.selectedTeam;

    let board = {
      dateCreated: Date.now(),
      createdBy: uid,
      teamID: selectedTeamID,
      boardName: boardName
    };

    let boardRef = firebase.firestore().collection("workflow");
    boardRef.add(board).then(function(docRef) {
      console.log("Board created with ref ", docRef.id);
    });
  };
}

export function fetchBoards(selectedTeamID) {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_BOARDS });

    let workflowRef = firebase.firestore().collection("workflow");
    workflowRef
      .where(`teamID`, "==", selectedTeamID)
      .onSnapshot(function(querySnapshot) {
        var boards = {};
        querySnapshot.forEach(function(doc) {
          boards[doc.id] = doc.data();
        });
        dispatch({ type: FETCH_BOARDS_SUCCESS, boards: boards });
      });
  };
}

export function selectBoard(boardID) {
  return dispatch => {
    dispatch({ type: SELECT_BOARD, selectedBoard: boardID });

    // dispatch({ type: FETCH_MESSAGES});
    // let messageRef = firebase.firestore().collection(`chat/${channelID}/messages`);
    // messageRef.orderBy("dateCreated")
    //   .onSnapshot(function(querySnapshot) {
    //     var messages = {};
    //     querySnapshot.forEach(function(doc) {
    //       messages[doc.id] = doc.data();
    //     });
    //     dispatch({ type: FETCH_MESSAGES_SUCCESS, messages: messages });
    // });
  };
}
