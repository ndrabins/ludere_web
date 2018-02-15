import {
  FETCH_TASKS,
  CREATE_TASK,
  CHANGE_TASK_ORDER,
  MOVE_TASK_TO_COLUMN,
  TOGGLE_TASK_DETAIL,
  SELECT_TASK,
  UPDATE_TASK_DATE,
  ADD_SUBTASK
} from "./types";
import firebase from "firebase";

require("firebase/firestore");

export function createTask(listID, taskTitle) {
  return (dispatch, getState) => {
    dispatch({ type: CREATE_TASK });
    let { uid } = getState().auth.user;
    const { selectedBoard } = getState().workflow;
    let taskOrder = getState().workflow.listData[listID].taskOrder;
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();

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
      dateCreated: timestamp,
      dateUpdated: timestamp,
      lastUpdatedBy: uid,
      description: "",
      dueDate: null,
      createdBy: uid,
      boardID: selectedBoard,
      title: taskTitle,
      tags: [],
      subtasks: [],
      assigned: [],
      comments: []
    };

    taskRef.add(task).then(function(docRef) {
      taskOrder.push(docRef.id);
      listRef.update({ taskOrder: taskOrder });
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

export function toggleTaskDetail(taskID = null) {
  // console.log("toggling: ", taskID);
  return (dispatch, getState) => {
    const { selectedTask, showTaskDetail, selectedBoard } = getState().workflow;

    if (selectedBoard === null) {
      dispatch({ type: SELECT_TASK, selectedTask: null });
    }

    if (taskID !== null && taskID !== selectedTask) {
      dispatch({ type: SELECT_TASK, selectedTask: taskID });
    }

    if (taskID !== null && !showTaskDetail) {
      dispatch({ type: SELECT_TASK, selectedTask: taskID });
      dispatch({ type: TOGGLE_TASK_DETAIL });
    }

    if (taskID === null || (taskID === selectedTask && showTaskDetail)) {
      dispatch({ type: TOGGLE_TASK_DETAIL });
    }
  };
}

export function updateTaskTitle(title) {
  return (dispatch, getState) => {
    //javascript voodoo here man
    //it has to be done this way lol.
    const selectedBoard = getState()["workflow"]["selectedBoard"];
    const selectedTask = getState()["workflow"]["selectedTask"];

    let taskRef = firebase
      .firestore()
      .collection("workflow")
      .doc(selectedBoard)
      .collection("tasks")
      .doc(selectedTask);

    return taskRef
      .update({
        title: title
      })
      .then(function() {
        console.log("Document successfully updated!");
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });

    dispatch({ type: UPDATE_TASK_DATE });
  };
}

export function addSubtask(subtasks) {
  return (dispatch, getState) => {
    const { selectedTask, selectedBoard } = getState().workflow;

    console.log("subtasks", subtasks);
    dispatch({ type: ADD_SUBTASK });

    let taskRef = firebase
      .firestore()
      .collection("workflow")
      .doc(selectedBoard)
      .collection("tasks")
      .doc(selectedTask);

    return taskRef
      .update({
        subtasks: subtasks
      })
      .then(function() {
        console.log("Document successfully updated!");
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  };
}
