import {
  SELECT_WORKSPACE,
  CREATE_WORKSPACE,
  CREATE_WORKSPACE_SUCCESS,
  CREATE_WORKSPACE_ERROR,
  FETCH_WORKSPACES,
  FETCH_WORKSPACES_SUCCESS,
  FETCH_WORKSPACES_ERROR
} from "./types";

import {reset} from 'redux-form';
import firebase from "firebase";

import * as teamActions from "./TeamActions";

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
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        dispatch({ type: CREATE_WORKSPACE_SUCCESS });
        dispatch(reset('createWorkspaceForm'));

        //Create workspace with an initial team that everyone is a part of.
        dispatch(teamActions.createTeam(workspaceName));
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
        dispatch({ type: CREATE_WORKSPACE_ERROR });
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
          if(selectedWorkspace === null){
            selectedWorkspace = doc.id;
          }
          workspaces[doc.id] = doc.data();
        });
        dispatch({ type: FETCH_WORKSPACES_SUCCESS, workspaces: workspaces });

        if(selectedWorkspace!==null){
          //if a user is in a workspace, load the data for it on app start.
          dispatch(selectWorkspace(selectedWorkspace));
          return;
        }

      });
  };
}

export function selectWorkspace(workspaceID) {
    return dispatch => {
      dispatch({ type: SELECT_WORKSPACE, selectedWorkspace: workspaceID });
      dispatch(teamActions.fetchTeams());
    };
  }
