import {
  CREATE_TASK,
  CHANGE_TASK_ORDER,
  MOVE_TASK_TO_COLUMN,
  TOGGLE_TASK_DETAIL,
  SELECT_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  CREATE_COMMENT,
  FETCH_COMMENTS,
  FETCH_COMMENTS_SUCCESS,
  UNSUBSCRIBE_TASK_COMMENTS
} from "./types";
import firebase from "firebase/app";

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
      tags: {},
      subtasks: [],
      assigned: {},
      numberOfComments: 0
    };

    taskRef.add(task).then(function(docRef) {
      taskOrder.push(docRef.id);
      listRef.update({ taskOrder: taskOrder });
    });
  };
}

export function changeTaskOrder(startIndex, endIndex, listID) {
  return (dispatch, getState) => {
    const { selectedBoard, listData } = getState().workflow;

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

export function toggleTaskDetail(taskID = null) {
  return (dispatch, getState) => {
    const { selectedTask, showTaskDetail, selectedBoard } = getState().workflow;

    //No board is selected
    if (selectedBoard === null) {
      dispatch({ type: SELECT_TASK, selectedTask: null });
    }

    // detail is open, just switch task we are looking at
    if (taskID !== null && taskID !== selectedTask) {
      dispatch(fetchTask(taskID));
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

export function fetchTask(taskID) {
  return (dispatch, getState) => {
    dispatch(unsubscribeFromTaskComments()); // unsubscribe from previous comments

    const { selectedBoard } = getState().workflow;
    dispatch({ type: SELECT_TASK, selectedTask: taskID });

    dispatch({ type: FETCH_COMMENTS });
    let commentRef = firebase
      .firestore()
      .collection(`workflow/${selectedBoard}/tasks/${taskID}/comments`);

    const taskCommentsListener = commentRef
      .orderBy("dateCreated")
      .onSnapshot(function(querySnapshot) {
        var comments = {};
        querySnapshot.forEach(function(doc) {
          comments[doc.id] = doc.data();
        });
        dispatch({
          type: FETCH_COMMENTS_SUCCESS,
          comments: comments,
          taskCommentsListener: taskCommentsListener
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
    //javascript voodoo here man
    //it has to be done this way lol.
    const selectedBoard = getState()["workflow"]["selectedBoard"];
    const selectedTask = getState()["workflow"]["selectedTask"];
    dispatch({ type: UPDATE_TASK });

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
  };
}

export function updateTask(updatedTask, taskID = null) {
  return (dispatch, getState) => {
    const { selectedTask, selectedBoard } = getState().workflow;
    dispatch({ type: UPDATE_TASK });

    let taskIDToUpdate;
    if (taskID === null) {
      taskIDToUpdate = selectedTask;
    } else {
      taskIDToUpdate = taskID;
    }

    let taskRef = firebase
      .firestore()
      .collection("workflow")
      .doc(selectedBoard)
      .collection("tasks")
      .doc(taskIDToUpdate);

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
    dispatch({ type: DELETE_TASK });

    let taskRef = firebase
      .firestore()
      .collection("workflow")
      .doc(selectedBoard)
      .collection("tasks")
      .doc(selectedTask);

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

export function createComment(commentText, numberOfComments) {
  return (dispatch, getState) => {
    const { uid } = getState().auth.user;
    const { myUserProfile } = getState().profile;

    const { selectedTask, selectedBoard } = getState().workflow;

    const timestamp = firebase.firestore.FieldValue.serverTimestamp();

    let newComment = {
      sentBy: uid,
      dateCreated: timestamp,
      content: commentText,
      sentByDisplayName: myUserProfile.displayName,
      edited: "false",
      photoURL: myUserProfile.photoURL
    };

    let commentRef = firebase
      .firestore()
      .collection(`workflow/${selectedBoard}/tasks/${selectedTask}/comments`);

    //update task with number of comments
    let taskRef = firebase
      .firestore()
      .doc(`workflow/${selectedBoard}/tasks/${selectedTask}`);

    taskRef.set(
      {
        numberOfComments: numberOfComments + 1
      },
      { merge: true }
    );

    commentRef.add(newComment).then(function(docRef) {
      dispatch({ type: CREATE_COMMENT });
    });
  };
}
