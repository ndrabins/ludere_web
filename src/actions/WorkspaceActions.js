import {
  SELECT_WORKSPACE,
  CREATE_WORKSPACE,
  CREATE_WORKSPACE_SUCCESS,
  CREATE_WORKSPACE_ERROR,
  FETCH_WORKSPACES,
  FETCH_WORKSPACES_SUCCESS,
  FETCH_WORKSPACES_ERROR,
  JOIN_WORKSPACE,
  JOIN_WORKSPACE_SUCCESS,
  JOIN_WORKSPACE_ERROR,
  FETCH_WORKSPACE_USERS,
  FETCH_WORKSPACE_USERS_SUCCESS,
  FETCH_WORKSPACE_USERS_ERROR,
} from "./types";

import { reset } from 'redux-form';
import firebase from "firebase";

import * as teamActions from "./TeamActions";
import { selectChannel } from "./index";

import Map from "lodash/map";

require("firebase/firestore");


export function createWorkspace(values) {
  return (dispatch, getState) => {
    let { uid } = getState().auth.user;

    let workspaceName = values.workspaceName;

    let workspace = {
      name: workspaceName,
      dateCreated: Date.now(),
      workspaceOwner: uid,
      members: {}
    };

    workspace.members[uid] = true;

    dispatch({ type: CREATE_WORKSPACE });

    firebase
      .firestore()
      .collection("workspaces")
      .add(workspace)
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        dispatch({ type: CREATE_WORKSPACE_SUCCESS });
        dispatch(reset('createWorkspaceForm'));

        //update user object with the workspace he is in
        let userRef = firebase.firestore().collection("users").doc(uid);
        let usersWorkspaceUpdate = {};
        usersWorkspaceUpdate[`workspaces.${docRef.id}`] = true;

        userRef.update(usersWorkspaceUpdate).then(function () {
          console.log("Document successfully updated!");
        })
          .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });

        //Create workspace with an initial team that everyone is a part of.
        dispatch(teamActions.createTeam(workspaceName));
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
        dispatch({ type: CREATE_WORKSPACE_ERROR });
      });
  };
}

export function joinWorkspace(formValues) {

  return (dispatch, getState) => {

    let { uid } = getState().auth.user;

    let workspaceUID = formValues.workspaceUrl;
    dispatch({ type: JOIN_WORKSPACE });

    let membersUpdate = {}
    let usersWorkspaceUpdate = {}

    membersUpdate[`members.${uid}`] = true;
    usersWorkspaceUpdate[`workspaces.${workspaceUID}`] = true;

    let workspaceRef = firebase.firestore().collection("workspaces").doc(workspaceUID);
    let userRef = firebase.firestore().collection("users").doc(uid);

    var batch = firebase.firestore().batch();

    batch.update(workspaceRef, membersUpdate);
    batch.update(userRef, usersWorkspaceUpdate);

    batch.commit().then(function () {
      console.log("Transaction successfully committed!");
      dispatch({ type: JOIN_WORKSPACE_SUCCESS });
    }).catch(function (error) {
      console.log("Transaction failed: ", error);
      dispatch({ type: JOIN_WORKSPACE_ERROR });
    });
  }
}

export function fetchWorkspaces() {
  return (dispatch, getState) => {
    let { uid } = getState().auth.user;
    let selectedWorkspace = null;

    dispatch({ type: FETCH_WORKSPACES });

    let workspaceRef = firebase.firestore().collection("workspaces");
    workspaceRef
      .where(`members.${uid}`, "==", true)
      .onSnapshot(function (querySnapshot) {
        var workspaces = {};
        querySnapshot.forEach(function (doc) {
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

export function selectWorkspace(workspaceID) {
  return dispatch => {
    dispatch({ type: SELECT_WORKSPACE, selectedWorkspace: workspaceID });
    dispatch(teamActions.fetchTeams());
  };
}

export function fetchWorkspaceUsers() {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_WORKSPACE_USERS });

    let workspaceUID = getState().workspace.selectedWorkspace;

    let userRef = firebase
      .firestore()
      .collection(`users`);

    userRef
      .where(`workspaces.${workspaceUID}`, "==", true)
      .onSnapshot(function (querySnapshot) {
        var users = {};
        querySnapshot.forEach(function (doc) {
          users[doc.id] = doc.data();
        });
        dispatch({ type: FETCH_WORKSPACE_USERS_SUCCESS, workspaceUsers: users });
      });
  }
}
