import {
  CREATE_TEAM,
  CREATE_TEAM_SUCCESS,
  CREATE_TEAM_ERROR,
  JOIN_TEAM,
  JOIN_TEAM_SUCCESS,
  JOIN_TEAM_ERROR,
  FETCH_TEAMS,
  FETCH_TEAMS_SUCCESS,
  FETCH_TEAMS_ERROR
} from "./types";

import firebase from "firebase";
require("firebase/firestore");

export function createTeam(teamName, description = "") {
  return (dispatch, getState) => {
    let { uid } = getState().auth.user;

    let team = {
      description: description,
      members: {},
      modules: {
        chat: true,
        kanban: true
      },
      members: {},
      name: teamName
    };
    team.members[uid] = true;

    dispatch({ type: CREATE_TEAM });

    firebase
      .firestore()
      .collection("teams")
      .add(team)
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        dispatch({ type: CREATE_TEAM_SUCCESS });
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  };
}

export function fetchTeams() {
  return (dispatch, getState) => {
    let { uid } = getState().auth.user;
    dispatch({ type: FETCH_TEAMS });

    let teamRef = firebase.firestore().collection("teams");
    teamRef
      .where(`members.${uid}`, "==", true)
      .onSnapshot(function(querySnapshot) {
        var teams = {};
        querySnapshot.forEach(function(doc) {
          teams[doc.id] = doc.data();
        });
        dispatch({ type: FETCH_TEAMS_SUCCESS, teams: teams });
      });
  };
}
