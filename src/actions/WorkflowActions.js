import {
  SELECT_BOARD,
  FETCH_BOARDS,
  FETCH_BOARDS_SUCCESS,
  FETCH_LISTS,
  FETCH_TASKS,
  CREATE_BOARD,
  CREATE_LIST,
  CREATE_TASK,
  CHANGE_COLUMN_ORDER,
  CHANGE_TASK_ORDER,
  MOVE_TASK_TO_COLUMN,
  UPDATE_LIST,
  TOGGLE_TASK_DETAIL,
  SELECT_TASK,
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
      type: "public",
      listOrder: []
    };

    let boardRef = firebase.firestore().collection("workflow");
    boardRef.add(board).then(function(docRef) {
      dispatch(createList(docRef.id, "Backlog"));
      dispatch(createList(docRef.id, "In Progress"));
      dispatch(createList(docRef.id, "Done"));
      dispatch(createList(docRef.id, "Archived"));
    });
  };
}

export function createList(boardID, listName) {
  return (dispatch, getState) => {
    dispatch({ type: CREATE_LIST });
    let { uid } = getState().auth.user;
    // const { selectedBoard } = getState().workflow;
    let listOrder = getState().workflow.boards[boardID].listOrder;

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
      dateCreated: Date.now(),
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

export function createTask(listID, taskTitle) {
  return (dispatch, getState) => {
    dispatch({ type: CREATE_TASK });
    let { uid } = getState().auth.user;
    const { selectedBoard } = getState().workflow;
    let taskOrder = getState().workflow.listData[listID].taskOrder;

    let taskRef = firebase
      .firestore()
      .collection("workflow")
      .doc(selectedBoard)
      .collection("tasks");

    let listRef = firebase
      .firestore()
      .collection("workflow")
      .doc(selectedBoard)
      .collection("lists")
      .doc(listID);

    let task = {
      dateCreated: Date.now(),
      dateUpdated: Date.now(),
      lastUpdatedBy: uid,
      description: "",
      dueDate: null,
      createdBy: uid,
      boardID: selectedBoard,
      title: taskTitle,
      tags: [],
      checklist: [],
      assigned: [],
      comments: [],
    };

    taskRef.add(task).then(function(docRef) {
      taskOrder.push(docRef.id);
      listRef.update({ taskOrder: taskOrder });
    });
  };
}

export function updateList(list, listID) {
  return (dispatch, getState) => {
    console.log(list);

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
      .collection("lists");

    let tasksRef = firebase
      .firestore()
      .collection("workflow")
      .doc(boardID)
      .collection("tasks");

    listsRef.onSnapshot(function(querySnapshot) {
      var listData = {};
      querySnapshot.forEach(function(doc) {
        listData[doc.id] = doc.data();
      });
      dispatch({ type: FETCH_LISTS, listData: listData });
    });

    tasksRef.onSnapshot(function(querySnapshot) {
      var taskData = {};
      querySnapshot.forEach(function(doc) {
        taskData[doc.id] = doc.data();
      });
      dispatch({ type: FETCH_TASKS, taskData: taskData });
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

export function changeTaskOrder(startIndex, endIndex, listID) {
  return (dispatch, getState) => {
    const { selectedBoard, listData, boards } = getState().workflow;

    let taskOrder = listData[listID].taskOrder;

    const [removed] = taskOrder.splice(startIndex, 1);
    taskOrder.splice(endIndex, 0, removed);

    let listRef = firebase
      .firestore()
      .collection("workflow")
      .doc(selectedBoard)
      .collection("lists")
      .doc(listID); 

    listRef.update({ taskOrder: taskOrder }).then(function() {
      dispatch({ type: CHANGE_TASK_ORDER });
    });
  };
}

export function moveTaskToColumn(startIndex, endIndex, startListID, endListID) {
  return (dispatch, getState) => {
    const { selectedBoard, listData } = getState().workflow;

    let startListTaskOrder = listData[startListID].taskOrder;
    let endListTaskOrder = listData[endListID].taskOrder;

    //remove item from task order in first list
    const [removed] = startListTaskOrder.splice(startIndex, 1);
    //add it to destination list
    endListTaskOrder.splice(endIndex, 0, removed);

    const startListRef = firebase
      .firestore()
      .collection("workflow")
      .doc(selectedBoard)
      .collection("lists")
      .doc(startListID);

    const endListRef = firebase
      .firestore()
      .collection("workflow")
      .doc(selectedBoard)
      .collection("lists")
      .doc(endListID);

    var batch = firebase.firestore().batch();

    // This code may get re-run multiple times if there are conflicts.
    batch.update(startListRef, { taskOrder: startListTaskOrder });
    batch.update(endListRef, { taskOrder: endListTaskOrder });

    batch
      .commit()
      .then(function() {
        dispatch({ type: MOVE_TASK_TO_COLUMN });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
}

export function toggleTaskDetail(taskID=null) {
  // console.log("toggling: ", taskID);
  return (dispatch, getState) => {
    const { selectedTask, showTaskDetail } = getState().workflow;

    if(taskID !== null && taskID !== selectedTask){
      dispatch({ type: SELECT_TASK, selectedTask: taskID});
    }

    if(taskID !== null && !showTaskDetail){
      dispatch({ type: SELECT_TASK, selectedTask: taskID});
      dispatch({ type: TOGGLE_TASK_DETAIL});
    }

    if(taskID === null || taskID === selectedTask && showTaskDetail){
      dispatch({ type: TOGGLE_TASK_DETAIL});
    }
  }
}
