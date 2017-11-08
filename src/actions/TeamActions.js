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

export function createTeam(teamName) {
  console.log("Joining :", teamName);

  return dispatch => {
    dispatch({ type: CREATE_TEAM });
  };
}

export function fetchTeams() {
  console.log("Fetching teams");

  return (dispatch, getState) => {
    let {uid} = getState().auth.user;
    dispatch({ type: FETCH_TEAMS });

    let teamRef = firebase.firestore().collection("teams");
    teamRef.where(`members.${uid}`, '==', true).onSnapshot(function(querySnapshot) {
      var teams = [];
      querySnapshot.forEach(function(doc) {
        teams.push(doc.data());
        console.log(doc.id, " => ", doc.data());
      });
      dispatch({ type: FETCH_TEAMS, teams: teams });
      console.log(teams);
    });
  };
}
