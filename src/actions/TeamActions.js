import {
  CREATE_TEAM,
  CREATE_TEAM_SUCCESS,
  CREATE_TEAM_ERROR,
  JOIN_TEAM,
  JOIN_TEAM_SUCCESS,
  JOIN_TEAM_ERROR,
  FETCH_TEAMS,
  FETCH_TEAMS_SUCCESS,
  FETCH_TEAMS_ERROR,
  SELECT_TEAM
} from "./types";

import firebase from "firebase";
import * as chatActions from './ChatActions';

require("firebase/firestore");


export function createTeam(teamName, description = "") {
  return (dispatch, getState) => {
    let { uid } = getState().auth.user;

    let team = {
      description: description,
      modules: {
        chat: true,
        kanban: true
      },
      members: {},
      name: teamName,
      dateCreated: Date.now(),
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
    let firstTeam = null;
    dispatch({ type: FETCH_TEAMS });

    let teamRef = firebase.firestore().collection("teams");
    teamRef
      .where(`members.${uid}`, "==", true)
      .onSnapshot(function(querySnapshot) {
        var teams = {};
        querySnapshot.forEach(function(doc) {
          if(firstTeam === null){
            firstTeam = doc.id;
          }
          teams[doc.id] = doc.data();
        });
        dispatch({ type: FETCH_TEAMS_SUCCESS, teams: teams });

        if(firstTeam!==null){
          //if a user is in a team, load the data for it on app start.
          dispatch(selectTeam(firstTeam));
          return;
        }
      });
  };
}

export function selectTeam(teamID) {

  return dispatch => {
    dispatch({ type: SELECT_TEAM, selectedTeam: teamID });
    dispatch(loadTeamData(teamID));
  };
}

//Whenever we select a team, we should make all the calls regarding data we need for that team
function loadTeamData(teamID){
  //This is probs gonna need some refactoring sometime soon... God help us
  return (dispatch, getState) => {
    let team = getState().team.teams[teamID];

    if(team.modules.chat === true){
      dispatch(chatActions.fetchChannels(teamID));
    }
  }
}
