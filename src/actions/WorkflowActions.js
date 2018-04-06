import {
  SELECT_BOARD,
  FETCH_BOARDS,
  FETCH_BOARDS_SUCCESS,
  FETCH_LISTS,
  FETCH_TASKS,
  CREATE_BOARD,
  CREATE_LIST,
  CHANGE_COLUMN_ORDER,
  UPDATE_LIST,
  UNSUBSCRIBE_BOARD_DATA,
  UNSUBSCRIBE_BOARDS
} from "./types";
import firebase from "firebase";

require("firebase/firestore");

//fetch my profileID on default
export function createBoard(boardName) {
  return (dispatch, getState) => {
    dispatch({ type: CREATE_BOARD });
    let { uid } = getState().auth.user;
    let selectedTeamID = getState().team.selectedTeam;
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();

    let board = {
      dateCreated: timestamp,
      createdBy: uid,
      teamID: selectedTeamID,
      boardName: boardName,
      type: "public",
      listOrder: []
    };

    let boardRef = firebase.firestore().collection("workflow");
    boardRef.add(board).then(function(docRef) {
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
    let listOrder = getState().workflow.boards[boardID].listOrder;
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();

    let listRef = firebase
      .firestore()
      .collection("workflow")
      .doc(boardID)
      .collection("lists");

    let boardRef = firebase
      .firestore()
      .collection("workflow")
      .doc(boardID);

    let list = {
      dateCreated: timestamp,
      createdBy: uid,
      boardID: boardID,
      name: listName,
      taskOrder: []
    };

    listRef.add(list).then(function(docRef) {
      listOrder.push(docRef.id);
      boardRef.update({ listOrder: listOrder });
    });
  };
}

export function updateList(list, listID) {
  return (dispatch, getState) => {
    let listRef = firebase
      .firestore()
      .collection("workflow")
      .doc(list.boardID)
      .collection("lists")
      .doc(listID);

    listRef.update(list).then(function() {
      dispatch({ type: UPDATE_LIST });
    });
  };
}

export function fetchBoards(selectedTeamID) {
  return (dispatch, getState) => {
    dispatch(unsubscribeFromBoards()); // unsubscribe from previous listener;
    dispatch({ type: FETCH_BOARDS });

    let workflowRef = firebase.firestore().collection("workflow");
    const boardsListener = workflowRef
      .where(`teamID`, "==", selectedTeamID)
      .onSnapshot(function(querySnapshot) {
        var boards = {};
        querySnapshot.forEach(function(doc) {
          boards[doc.id] = doc.data();
        });
        dispatch({
          type: FETCH_BOARDS_SUCCESS,
          boards: boards,
          boardsListener: boardsListener
        });
      });
  };
}

export function unsubscribeFromBoardData() {
  return (dispatch, getState) => {
    const { listsListener, tasksListener } = getState().workflow;
    if (listsListener == null || tasksListener == null) return;

    listsListener();
    tasksListener();
    dispatch({ type: UNSUBSCRIBE_BOARD_DATA });
  };
}

export function unsubscribeFromBoards() {
  return (dispatch, getState) => {
    const { boardsListener } = getState().workflow;
    if (boardsListener == null) return;

    boardsListener();
    dispatch({ type: UNSUBSCRIBE_BOARDS });
  };
}

export function fetchBoardData(boardID) {
  return (dispatch, getState) => {
    dispatch(unsubscribeFromBoardData()); // unsubscribe from previous listener;

    //TODO: rearchitect so this hacky fix isn't needed.
    if (boardID === null) {
      return;
    }

    let listsRef = firebase
      .firestore()
      .collection("workflow")
      .doc(boardID)
      .collection("lists");

    let tasksRef = firebase
      .firestore()
      .collection("workflow")
      .doc(boardID)
      .collection("tasks");

    const listsListener = listsRef.onSnapshot(function(querySnapshot) {
      var listData = {};
      querySnapshot.forEach(function(doc) {
        listData[doc.id] = doc.data();
      });
      dispatch({
        type: FETCH_LISTS,
        listData: listData,
        listsListener: listsListener
      });
    });

    const tasksListener = tasksRef.onSnapshot(function(querySnapshot) {
      var taskData = {};
      querySnapshot.forEach(function(doc) {
        taskData[doc.id] = doc.data();
      });
      dispatch({
        type: FETCH_TASKS,
        taskData: taskData,
        tasksListener: tasksListener
      });
    });
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
  };
}

export function changeColumnOrder(startIndex, endIndex) {
  return (dispatch, getState) => {
    const { selectedBoard, boards } = getState().workflow;
    const boardData = boards[selectedBoard];

    let listOrder = [...boardData.listOrder];
    const [removed] = listOrder.splice(startIndex, 1);
    listOrder.splice(endIndex, 0, removed);

    let boardRef = firebase
      .firestore()
      .collection("workflow")
      .doc(selectedBoard);

    boardRef.update({ listOrder: listOrder }).then(function() {
      dispatch({ type: CHANGE_COLUMN_ORDER });
    });
  };
}
