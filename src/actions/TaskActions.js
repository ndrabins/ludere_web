import {
  CREATE_TASK,
  CHANGE_TASK_ORDER,
  MOVE_TASK_TO_COLUMN,
  TOGGLE_TASK_DETAIL,
  SELECT_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  FETCH_COMMENTS,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_CHANNEL_SUCCESS,
  UNSUBSCRIBE_TASK_COMMENTS,
} from "./types";
import firebase from "firebase/app";

import * as chatActions from "./ChatActions";

export function createTask(listID, taskTitle) {
  return (dispatch, getState) => {
    let { uid } = getState().auth.user;
    const { selectedBoard } = getState().workflow;
    let { selectedWorkspace } = getState().workspace;
    let { selectedTeam } = getState().team;
    let taskOrder = getState().workflow.listData[listID].taskOrder;

    dispatch({ type: CREATE_TASK });
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();

    let taskRef = firebase
      .firestore()
      .collection(
        `workspaces/${selectedWorkspace}/teams/${selectedTeam}/workflow/${selectedBoard}/tasks`
      );

    let listRef = firebase
      .firestore()
      .doc(
        `workspaces/${selectedWorkspace}/teams/${selectedTeam}/workflow/${selectedBoard}/lists/${listID}`
      );

    let task = {
      dateCreated: timestamp,
      dateUpdated: timestamp,
      lastUpdatedBy: uid,
      description: "",
      dueDate: null,
      createdBy: uid,
      boardID: selectedBoard,
      title: taskTitle,
      tags: {},
      subtasks: [],
      assigned: {},
      numberOfComments: 0,
    };

    taskRef.add(task).then(function(docRef) {
      taskOrder.unshift(docRef.id); // unshift adds to beginning of array, instead of push that would add to end of array
      listRef.update({ taskOrder: taskOrder });

      // create a chat channel with same ID as task.
      dispatch(chatActions.createChannel("general", docRef.id));
    });
  };
}

export function changeTaskOrder(startIndex, endIndex, listID) {
  return (dispatch, getState) => {
    const { selectedBoard, listData } = getState().workflow;
    let { selectedWorkspace } = getState().workspace;
    let { selectedTeam } = getState().team;

    let taskOrder = listData[listID].taskOrder;

    const [removed] = taskOrder.splice(startIndex, 1);
    taskOrder.splice(endIndex, 0, removed);

    let listRef = firebase
      .firestore()
      .doc(
        `workspaces/${selectedWorkspace}/teams/${selectedTeam}/workflow/${selectedBoard}/lists/${listID}`
      );

    listRef.update({ taskOrder: taskOrder }).then(function() {
      dispatch({ type: CHANGE_TASK_ORDER });
    });
  };
}

export function moveTaskToColumn(startIndex, endIndex, startListID, endListID) {
  return (dispatch, getState) => {
    const { selectedBoard, listData } = getState().workflow;
    let { selectedWorkspace } = getState().workspace;
    let { selectedTeam } = getState().team;

    let startListTaskOrder = listData[startListID].taskOrder;
    let endListTaskOrder = listData[endListID].taskOrder;

    //remove item from task order in first list
    const [removed] = startListTaskOrder.splice(startIndex, 1);
    //add it to destination list
    endListTaskOrder.splice(endIndex, 0, removed);

    const startListRef = firebase
      .firestore()
      .doc(
        `workspaces/${selectedWorkspace}/teams/${selectedTeam}/workflow/${selectedBoard}/lists/${startListID}`
      );

    const endListRef = firebase
      .firestore()
      .doc(
        `workspaces/${selectedWorkspace}/teams/${selectedTeam}/workflow/${selectedBoard}/lists/${endListID}`
      );

    startListRef.update({ taskOrder: startListTaskOrder });
    endListRef.update({ taskOrder: endListTaskOrder });
    dispatch({ type: MOVE_TASK_TO_COLUMN });
    // firebase
    //   .firestore()
    //   .runTransaction(function(transaction) {
    //     return transaction.get(startListRef).then(function(sfDoc) {
    //       transaction.update(startListRef, { taskOrder: startListTaskOrder });
    //       transaction.update(endListRef, { taskOrder: endListTaskOrder });
    //     });
    //   })
    //   .then(function() {
    //     dispatch({ type: MOVE_TASK_TO_COLUMN });
    //   })
    //   .catch(function(err) {
    //     console.error(err);
    //   });
  };
}

export function toggleTaskDetail(taskID = null, commentChannelID = null) {
  return (dispatch, getState) => {
    const { selectedTask, showTaskDetail, selectedBoard } = getState().workflow;

    //No board is selected
    if (selectedBoard === null) {
      dispatch({ type: SELECT_TASK, selectedTask: null });
    }

    // detail is open, just switch task we are looking at
    if (taskID !== null && taskID !== selectedTask) {
      dispatch(fetchTask(taskID, commentChannelID));
    }

    //detail is closed, open it on task
    if (taskID !== null && !showTaskDetail) {
      dispatch(fetchTask(taskID));
      dispatch({ type: TOGGLE_TASK_DETAIL });
    }

    //task detail open and click on same task. Close taskdetail
    if (taskID === null || (taskID === selectedTask && showTaskDetail)) {
      dispatch({ type: TOGGLE_TASK_DETAIL });
    }
  };
}

export function fetchTask(taskID, commentChannelID) {
  return (dispatch, getState) => {
    dispatch(unsubscribeFromTaskComments()); // unsubscribe from previous comments

    let { selectedWorkspace } = getState().workspace;
    let { selectedTeam } = getState().team;

    dispatch({ type: SELECT_TASK, selectedTask: taskID });

    dispatch({ type: FETCH_COMMENTS });
    let commentRef = firebase
      .firestore()
      .collection(
        `workspaces/${selectedWorkspace}/teams/${selectedTeam}/chat/${taskID}/messages`
      );

    let commentChannelRef = firebase
      .firestore()
      .doc(
        `workspaces/${selectedWorkspace}/teams/${selectedTeam}/chat/${taskID}`
      );

    const commentChannelListener = commentChannelRef.onSnapshot(function(doc) {
      dispatch({
        type: FETCH_COMMENTS_CHANNEL_SUCCESS,
        commentChannel: doc.data(),
        commentChannelListener: commentChannelListener,
      });
    });

    const taskCommentsListener = commentRef
      .orderBy("dateCreated", "desc")
      .onSnapshot(function(querySnapshot) {
        var comments = {};
        querySnapshot.forEach(function(doc) {
          comments[doc.id] = doc.data();
        });
        dispatch({
          type: FETCH_COMMENTS_SUCCESS,
          comments: comments,
          taskCommentsListener: taskCommentsListener,
        });
      });
  };
}

export function unsubscribeFromTaskComments() {
  return (dispatch, getState) => {
    const taskCommentsListener = getState().workflow.taskCommentsListener;
    if (taskCommentsListener == null) return; // do nothing if no listener

    taskCommentsListener();
    dispatch({ type: UNSUBSCRIBE_TASK_COMMENTS });
  };
}

export function updateTaskTitle(title) {
  return (dispatch, getState) => {
    let { selectedWorkspace } = getState().workspace;
    let { selectedTeam } = getState().team;
    //javascript voodoo here man
    //it has to be done this way lol.
    const selectedBoard = getState()["workflow"]["selectedBoard"];
    const selectedTask = getState()["workflow"]["selectedTask"];
    dispatch({ type: UPDATE_TASK });

    let taskRef = firebase
      .firestore()
      .doc(
        `workspaces/${selectedWorkspace}/teams/${selectedTeam}/workflow/${selectedBoard}/tasks/${selectedTask}`
      );

    return taskRef
      .update({
        title: title,
      })
      .then(function() {})
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  };
}

export function updateTask(updatedTask, taskID = null) {
  return (dispatch, getState) => {
    const { selectedTask, selectedBoard } = getState().workflow;
    let { selectedWorkspace } = getState().workspace;
    let { selectedTeam } = getState().team;

    dispatch({ type: UPDATE_TASK });

    let taskIDToUpdate;
    if (taskID === null) {
      taskIDToUpdate = selectedTask;
    } else {
      taskIDToUpdate = taskID;
    }

    let taskRef = firebase
      .firestore()
      .doc(
        `workspaces/${selectedWorkspace}/teams/${selectedTeam}/workflow/${selectedBoard}/tasks/${taskIDToUpdate}`
      );

    console.log("updatedTask", updatedTask);

    return taskRef
      .set(updatedTask, { merge: true })
      .then(function() {
        //document updated succesffuly
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  };
}

export function deleteTask() {
  return (dispatch, getState) => {
    const { selectedTask, selectedBoard } = getState().workflow;
    let { selectedWorkspace } = getState().workspace;
    let { selectedTeam } = getState().team;

    dispatch({ type: DELETE_TASK });

    let taskRef = firebase
      .firestore()
      .doc(
        `workspaces/${selectedWorkspace}/teams/${selectedTeam}/workflow/${selectedBoard}/tasks/${selectedTask}`
      );

    return taskRef
      .delete()
      .then(function() {
        //document deleted succesffuly
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  };
}
