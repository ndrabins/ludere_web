import {
  SELECT_WORKSPACE,
  CREATE_WORKSPACE,
  CREATE_WORKSPACE_SUCCESS,
  CREATE_WORKSPACE_ERROR,
  FETCH_WORKSPACES,
  FETCH_WORKSPACES_SUCCESS,
  JOIN_WORKSPACE,
  JOIN_WORKSPACE_SUCCESS,
  JOIN_WORKSPACE_ERROR,
  FETCH_WORKSPACE_USERS,
  FETCH_WORKSPACE_USERS_SUCCESS
} from "./types";

import firebase from "firebase/app";

import * as teamActions from "./TeamActions";

export function createWorkspace(workspaceName) {
  return (dispatch, getState) => {
    const { uid } = getState().auth.user;
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();

    let workspace = {
      name: workspaceName,
      dateCreated: timestamp,
      workspaceOwner: uid,
      members: {}
    };

    const initialTeam = true; // set flag that this is the first team for workspace
    const description = "";

    workspace.members[uid] = true;

    dispatch({ type: CREATE_WORKSPACE });

    firebase
      .firestore()
      .collection("workspaces")
      .add(workspace)
      .then(function(docRef) {
        dispatch({ type: CREATE_WORKSPACE_SUCCESS });

        let workspaceID = docRef.id;
        //update user object with the workspace he is in
        let userRef = firebase
          .firestore()
          .collection("users")
          .doc(uid);
        let usersWorkspaceUpdate = {};
        usersWorkspaceUpdate[`workspaces.${workspaceID}`] = true;

        userRef.update(usersWorkspaceUpdate);

        //Create workspace with an initial team that everyone is a part of.
        dispatch(
          teamActions.createTeam(
            workspaceName,
            description,
            initialTeam,
            workspaceID
          )
        );
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
        dispatch({ type: CREATE_WORKSPACE_ERROR });
      });
  };
}

export function joinWorkspace(workspaceID, user) {
  return (dispatch, getState) => {
    dispatch({ type: JOIN_WORKSPACE });

    let membersUpdate = {};
    let usersWorkspaceUpdate = {};
    let userID = user.uid;

    membersUpdate[`members.${userID}`] = true;
    usersWorkspaceUpdate[`workspaces.${workspaceID}`] = true;

    let workspaceRef = firebase
      .firestore()
      .collection("workspaces")
      .doc(workspaceID);
    let userRef = firebase
      .firestore()
      .collection("users")
      .doc(userID);

    var batch = firebase.firestore().batch();

    batch.update(workspaceRef, membersUpdate);
    batch.update(userRef, usersWorkspaceUpdate);

    batch
      .commit()
      .then(function() {
        dispatch({
          type: JOIN_WORKSPACE_SUCCESS
        });
      })
      .catch(function(error) {
        console.log("Transaction failed: ", error);
        dispatch({ type: JOIN_WORKSPACE_ERROR });
      });
  };
}

export function fetchWorkspaces() {
  return (dispatch, getState) => {
    let { uid } = getState().auth.user;
    let selectedWorkspace = null;

    dispatch({ type: FETCH_WORKSPACES });

    let workspaceRef = firebase.firestore().collection("workspaces");
    workspaceRef
      .where(`members.${uid}`, "==", true)
      .onSnapshot(function(querySnapshot) {
        var workspaces = {};
        querySnapshot.forEach(function(doc) {
          if (selectedWorkspace === null) {
            selectedWorkspace = doc.id;
          }
          workspaces[doc.id] = doc.data();
        });

        if (selectedWorkspace !== null) {
          //if a user is in a workspace, load the data for it on app start.
          dispatch(selectWorkspace(selectedWorkspace));
          dispatch(fetchWorkspaceUsers(selectedWorkspace));
        }

        dispatch({ type: FETCH_WORKSPACES_SUCCESS, workspaces: workspaces });
      });
  };
}

export function selectWorkspace(workspaceID) {
  return dispatch => {
    dispatch({ type: SELECT_WORKSPACE, selectedWorkspace: workspaceID });
    dispatch(teamActions.fetchTeams());
  };
}

export function fetchSelectedWorkspace() {
  return (dispatch, getState) => {
    let { uid, selectedWorkspace } = getState().auth.user;

    dispatch({ type: FETCH_WORKSPACES });

    let workspaceRef = firebase.firestore().collection("workspaces");
    workspaceRef
      .where(`members.${uid}`, "==", true)
      .onSnapshot(function(querySnapshot) {
        var workspaces = {};
        querySnapshot.forEach(function(doc) {
          if (selectedWorkspace === null) {
            selectedWorkspace = doc.id;
          }
          workspaces[doc.id] = doc.data();
        });

        if (selectedWorkspace !== null) {
          //if a user is in a workspace, load the data for it on app start.
          dispatch(selectWorkspace(selectedWorkspace));
        }

        dispatch({ type: FETCH_WORKSPACES_SUCCESS, workspaces: workspaces });
      });
  };
}

export function fetchWorkspaceUsers(workspaceID) {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_WORKSPACE_USERS });

    let userRef = firebase.firestore().collection(`users`);

    userRef
      .where(`workspaces.${workspaceID}`, "==", true)
      .onSnapshot(function(querySnapshot) {
        var users = {};
        querySnapshot.forEach(function(doc) {
          users[doc.id] = doc.data();
        });
        dispatch({
          type: FETCH_WORKSPACE_USERS_SUCCESS,
          workspaceUsers: users
        });
      });
  };
}
