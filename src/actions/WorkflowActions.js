import {
  SELECT_BOARD,
  FETCH_BOARDS,
  FETCH_BOARDS_SUCCESS,
  FETCH_BOARD_DATA,
  CREATE_BOARD,
  CREATE_LIST
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
      boardName: boardName,
      type: "public"
    };

    let boardRef = firebase.firestore().collection("workflow");
    boardRef.add(board).then(function(docRef) {
      console.log("Board created with ref ", docRef.id);

      dispatch(createList(docRef.id, "Backlog"));
      dispatch(createList(docRef.id, "In Progress"));
      dispatch(createList(docRef.id, "Done"));
    });
  };
}

export function createList(boardID, listName) {
  return (dispatch, getState) => {
    dispatch({ type: CREATE_LIST });
    let { uid } = getState().auth.user;
    let listRef = firebase
      .firestore()
      .collection("workflow")
      .doc(boardID)
      .collection("list");

    let list = {
      dateCreated: Date.now(),
      createdBy: uid,
      boardID: boardID,
      name: listName,
      index: 1
    };

    listRef.add(list).then(function(docRef) {
      console.log("List created with ref ", docRef.id);
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

export function fetchBoardData(boardID) {
  return (dispatch, getState) => {
    // let documents = await collectionRef.get();
    let listsRef = firebase
      .firestore()
      .collection("workflow")
      .doc(boardID)
      .collection("list");

    listsRef.onSnapshot(function(querySnapshot) {
      var boardData = {};
      querySnapshot.forEach(function(doc) {
        boardData[doc.id] = doc.data();
      });
      dispatch({ type: FETCH_BOARD_DATA, boardData: boardData });
    });

    // documents.forEach(async doc => {
    //   console.log("Parent Document ID: ", doc.id);
    //   let subCollectionDocs = await collectionRef.doc(doc.id).collection("subCollection").get()
    //   subCollectionDocs.forEach(subCollectionDoc => {
    //     subCollectionDoc.forEach(doc => {
    //       console.log("Sub Document ID: ", doc.id);
    //     })
    // });
  };
}

export function selectBoard(boardID) {
  return dispatch => {
    if (boardID === null) {
      dispatch({ type: SELECT_BOARD, selectedBoard: null });
      return;
    }
    dispatch({ type: SELECT_BOARD, selectedBoard: boardID });
    dispatch(fetchBoardData(boardID));

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
