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
  DELETE_LIST,
  UNSUBSCRIBE_BOARD_DATA,
  UNSUBSCRIBE_BOARDS,
  FETCH_BOARD_DATA,
  UPDATE_BOARD,
  FETCH_TAGS,
  CREATE_TAG,
  DELETE_TAG,
  DELETE_BOARD
} from "./types";
import firebase from "firebase/app";

//fetch my profileID on default
export function createBoard(boardName) {
  return (dispatch, getState) => {
    dispatch({ type: CREATE_BOARD });
    let { uid } = getState().auth.user;
    let { selectedWorkspace } = getState().workspace;
    let { selectedTeam } = getState().team;
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();

    let board = {
      dateCreated: timestamp,
      createdBy: uid,
      boardName: boardName,
      type: "public",
      listOrder: [],
      teamID: selectedTeam,
      workspaceID: selectedWorkspace
    };

    let boardRef = firebase
      .firestore()
      .collection(
        `workspaces/${selectedWorkspace}/teams/${selectedTeam}/workflow`
      );

    boardRef.add(board).then(function(docRef) {
      dispatch(createList(docRef.id, "Backlog"));
      dispatch(createList(docRef.id, "In Progress"));
      dispatch(createList(docRef.id, "Done"));
      dispatch(createTag(docRef.id, { tagName: "Relax", tagColor: "#A770EF" }));
      dispatch(
        createTag(docRef.id, { tagName: "Priority", tagColor: "#0693E3" })
      );
      dispatch(
        createTag(docRef.id, { tagName: "Urgent", tagColor: "#d50000" })
      );
    });
  };
}

export function updateBoard(updates, boardID) {
  return (dispatch, getState) => {
    let { selectedWorkspace } = getState().workspace;
    let { selectedTeam } = getState().team;

    let boardRef = firebase
      .firestore()
      .collection(
        `workspaces/${selectedWorkspace}/teams/${selectedTeam}/workflow`
      )
      .doc(boardID);

    boardRef.update(updates).then(function() {
      dispatch({ type: UPDATE_BOARD });
    });
  };
}

export function createList(boardID, listName) {
  return (dispatch, getState) => {
    dispatch({ type: CREATE_LIST });

    let { selectedWorkspace } = getState().workspace;
    let { selectedTeam } = getState().team;
    let { uid } = getState().auth.user;
    let listOrder = getState().workflow.boards[boardID].listOrder;
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();

    let listRef = firebase
      .firestore()
      .collection(
        `workspaces/${selectedWorkspace}/teams/${selectedTeam}/workflow/${boardID}/lists`
      );

    let boardRef = firebase
      .firestore()
      .doc(
        `workspaces/${selectedWorkspace}/teams/${selectedTeam}/workflow/${boardID}`
      );

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
    let { selectedWorkspace } = getState().workspace;
    let { selectedTeam } = getState().team;

    let listRef = firebase
      .firestore()
      .doc(
        `workspaces/${selectedWorkspace}/teams/${selectedTeam}/workflow/${
          list.boardID
        }/lists/${listID}`
      );

    listRef.update(list).then(function() {
      dispatch({ type: UPDATE_LIST });
    });
  };
}

export function fetchBoards(selectedTeamID) {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_BOARDS });
    dispatch(unsubscribeFromBoards()); // unsubscribe from previous listener;

    let { selectedWorkspace } = getState().workspace;

    let workflowRef = firebase
      .firestore()
      .collection(
        `workspaces/${selectedWorkspace}/teams/${selectedTeamID}/workflow`
      );
    const boardsListener = workflowRef
      .where(`teamID`, "==", selectedTeamID)
      .where("workspaceID", "==", selectedWorkspace)
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
    const { listsListener, tasksListener, tagsListener } = getState().workflow;
    if (listsListener == null || tasksListener == null || tagsListener == null)
      //using 2 == to also return if the listener is undefined
      return;

    listsListener();
    tasksListener();
    tagsListener();
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

    let { selectedWorkspace } = getState().workspace;
    let { selectedTeam } = getState().team;

    dispatch({ type: FETCH_BOARD_DATA });

    let listsRef = firebase
      .firestore()
      .collection(
        `workspaces/${selectedWorkspace}/teams/${selectedTeam}/workflow/${boardID}/lists`
      );

    let tasksRef = firebase
      .firestore()
      .collection(
        `workspaces/${selectedWorkspace}/teams/${selectedTeam}/workflow/${boardID}/tasks`
      );

    let tagsRef = firebase
      .firestore()
      .collection(
        `workspaces/${selectedWorkspace}/teams/${selectedTeam}/workflow/${boardID}/tags`
      );

    const tagsListener = tagsRef.onSnapshot(function(querySnapshot) {
      var tagData = {};
      querySnapshot.forEach(function(doc) {
        tagData[doc.id] = doc.data();
      });
      dispatch({
        type: FETCH_TAGS,
        tagData: tagData,
        tagsListener: tagsListener
      });
    });

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
    let { selectedWorkspace } = getState().workspace;
    let { selectedTeam } = getState().team;

    const boardData = boards[selectedBoard];

    let listOrder = [...boardData.listOrder];
    const [removed] = listOrder.splice(startIndex, 1);
    listOrder.splice(endIndex, 0, removed);

    let boardRef = firebase
      .firestore()
      .doc(
        `workspaces/${selectedWorkspace}/teams/${selectedTeam}/workflow/${selectedBoard}`
      );

    boardRef.update({ listOrder: listOrder }).then(function() {
      dispatch({ type: CHANGE_COLUMN_ORDER });
    });
  };
}

export function createTag(boardID, { tagName, tagColor }) {
  return (dispatch, getState) => {
    const { uid } = getState().auth.user;
    let { selectedWorkspace } = getState().workspace;
    let { selectedTeam } = getState().team;
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();

    const tagRef = firebase
      .firestore()
      .collection(
        `workspaces/${selectedWorkspace}/teams/${selectedTeam}/workflow/${boardID}/tags`
      );

    const tag = {
      dateCreated: timestamp,
      createdBy: uid,
      boardID: boardID,
      name: tagName,
      color: tagColor
    };

    tagRef.add(tag).then(function(docRef) {
      dispatch({ type: CREATE_TAG });
    });
  };
}

export function deleteTag(boardID, tagID) {
  return (dispatch, getState) => {
    let { selectedWorkspace } = getState().workspace;
    let { selectedTeam } = getState().team;

    const tagRef = firebase
      .firestore()
      .doc(
        `workspaces/${selectedWorkspace}/teams/${selectedTeam}/workflow/${boardID}/tags/${tagID}`
      );

    tagRef.delete().then(function(docRef) {
      dispatch({ type: DELETE_TAG });
    });
  };
}

export function deleteList(listID, boardID) {
  return (dispatch, getState) => {
    let { selectedWorkspace } = getState().workspace;
    let { selectedTeam } = getState().team;

    const listRef = firebase
      .firestore()
      .doc(
        `workspaces/${selectedWorkspace}/teams/${selectedTeam}/workflow/${boardID}/lists/${listID}`
      );

    listRef.delete().then(function(docRef) {
      dispatch({ type: DELETE_LIST });
    });
  };
}

export function deleteBoard(boardID) {
  return (dispatch, getState) => {
    let { selectedWorkspace } = getState().workspace;
    let { selectedTeam } = getState().team;

    const boardRef = firebase
      .firestore()
      .doc(
        `workspaces/${selectedWorkspace}/teams/${selectedTeam}/workflow/${boardID}`
      );

    selectBoard(null);

    boardRef.delete().then(function(docRef) {
      dispatch({ type: DELETE_BOARD });
    });
  };
}
