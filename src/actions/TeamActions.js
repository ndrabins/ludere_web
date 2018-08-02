import {
  CREATE_TEAM,
  CREATE_TEAM_SUCCESS,
  JOIN_TEAM,
  FETCH_TEAMS,
  FETCH_TEAMS_SUCCESS,
  SELECT_TEAM,
  CREATE_TEAM_ERROR,
  REMOVE_TEAM_MEMBER,
  FETCH_ANNOUNCEMENTS,
  CREATE_ANNOUNCEMENT,
  DELETE_ANNOUNCEMENT,
  UPDATE_ANNOUNCEMENT,
  UPDATE_TEAM
} from "./types";

import firebase from "firebase/app";

import * as chatActions from "./ChatActions";
import * as workflowActions from "./WorkflowActions";

export function createTeam(
  teamName,
  description = "",
  initialTeam = false,
  workspaceID = null
) {
  return (dispatch, getState) => {
    let { uid } = getState().auth.user;
    let { selectedWorkspace } = getState().workspace;
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();

    const workspaceIDToFetch = workspaceID || selectedWorkspace;

    let teamRef = firebase
      .firestore()
      .collection(`workspaces/${workspaceIDToFetch}/teams`);

    let workspaceRef = firebase
      .firestore()
      .collection("workspaces")
      .doc(workspaceIDToFetch);

    let team = {
      description: description,
      modules: {
        chat: true,
        kanban: true
      },
      members: {},
      name: teamName,
      dateCreated: timestamp,
      teamIconURL: null,
      teamIconColor: "#303030"
    };
    team.members[uid] = true;

    dispatch({ type: CREATE_TEAM });

    teamRef
      .add(team)
      .then(function(docRef) {
        dispatch({ type: CREATE_TEAM_SUCCESS });
        dispatch(selectTeam(docRef.id));

        if (initialTeam) {
          workspaceRef.update({ initalTeam: docRef.id });
        }

        //This needs to be refactored into a general purpose setup for modules function.
        //when a team is created with the chat module, initialize their chat module with a general and announcements channel?
        dispatch(chatActions.createChannel("general"));
        dispatch(workflowActions.createBoard("general"));
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
        dispatch({ type: CREATE_TEAM_ERROR });
      });
  };
}

export function updateTeam(data) {
  return (dispatch, getState) => {
    let { selectedWorkspace } = getState().workspace;
    let { selectedTeam } = getState().team;

    let teamRef = firebase
      .firestore()
      .doc(`workspaces/${selectedWorkspace}/teams/${selectedTeam}`);

    teamRef.set(data, { merge: true }).then(function() {
      dispatch({ type: UPDATE_TEAM });
    });
  };
}

export function fetchTeams() {
  return (dispatch, getState) => {
    let { uid } = getState().auth.user;
    let { selectedWorkspace } = getState().workspace;

    dispatch({ type: FETCH_TEAMS });

    let teamRef = firebase
      .firestore()
      .collection(`workspaces/${selectedWorkspace}/teams`);

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

export function selectTeam(teamID) {
  return dispatch => {
    dispatch({ type: SELECT_TEAM, selectedTeam: teamID });
    if (teamID !== null) {
      dispatch(loadTeamData(teamID));
    }
  };
}

//Whenever we select a team, we should make all the calls regarding data we need for that team
export function loadTeamData(teamID) {
  //This is probs gonna need some refactoring sometime soon... God help us
  return (dispatch, getState) => {
    dispatch(fetchAnnouncements(teamID));
    dispatch(chatActions.selectChannel(null));
    dispatch(chatActions.fetchChannels(teamID));
    dispatch(workflowActions.fetchBoards(teamID));
  };
}

export function joinTeam(teamID, userID = null) {
  return (dispatch, getState) => {
    const { selectedWorkspace } = getState().workspace;
    let UID;
    if (userID == null) {
      UID = getState().auth.user.uid;
    } else {
      UID = userID;
    }

    let teamRef = firebase
      .firestore()
      .collection(`workspaces/${selectedWorkspace}/teams`)
      .doc(teamID);

    let newTeamMember = {};

    newTeamMember[`members.${UID}`] = true;

    teamRef.update(newTeamMember);
    dispatch({ type: JOIN_TEAM });
  };
}

export function removeFromTeam(teamID, userID) {
  return (dispatch, getState) => {
    const { selectedWorkspace } = getState().workspace;
    let UID;
    if (userID == null) {
      UID = getState().auth.user.uid;
    } else {
      UID = userID;
    }

    let teamRef = firebase
      .firestore()
      .collection(`workspaces/${selectedWorkspace}/teams`)
      .doc(teamID);

    let newTeamMember = {};

    newTeamMember[`members.${UID}`] = false;

    teamRef.update(newTeamMember);
    dispatch({ type: REMOVE_TEAM_MEMBER });
  };
}

export function fetchAnnouncements(teamID) {
  return (dispatch, getState) => {
    let { selectedWorkspace } = getState().workspace;

    dispatch({
      type: FETCH_ANNOUNCEMENTS,
      announcements: {},
      loading: true
    });

    let teamRef = firebase
      .firestore()
      .collection(
        `workspaces/${selectedWorkspace}/teams/${teamID}/announcements`
      );

    teamRef.orderBy("dateCreated", "desc").onSnapshot(function(querySnapshot) {
      var announcements = {};
      querySnapshot.forEach(function(doc) {
        announcements[doc.id] = doc.data();
      });
      dispatch({
        type: FETCH_ANNOUNCEMENTS,
        announcements: announcements,
        loading: false
      });
    });
  };
}

export function createAnnouncement(announcementContent, teamID) {
  return (dispatch, getState) => {
    let { uid } = getState().auth.user;
    let { selectedWorkspace } = getState().workspace;

    const timestamp = firebase.firestore.FieldValue.serverTimestamp();

    let announcement = {
      createdBy: uid,
      dateCreated: timestamp,
      dateUpdated: timestamp,
      content: { ...announcementContent }, //need to use spread cause quill returns custom object
      edited: false
    };

    let announcementRef = firebase
      .firestore()
      .collection(
        `workspaces/${selectedWorkspace}/teams/${teamID}/announcements`
      );

    announcementRef.add(announcement).then(function(docRef) {
      dispatch({ type: CREATE_ANNOUNCEMENT });
    });
  };
}

export function deleteAnnouncement(announcementID) {
  return (dispatch, getState) => {
    let { selectedWorkspace } = getState().workspace;
    let { selectedTeam } = getState().team;

    let announcementRef = firebase
      .firestore()
      .doc(
        `workspaces/${selectedWorkspace}/teams/${selectedTeam}/announcements/${announcementID}`
      );

    announcementRef.delete().then(function() {
      dispatch({ type: DELETE_ANNOUNCEMENT });
    });
  };
}

export function updatedAnnouncement(announcementID, updatedAnnouncement) {
  return (dispatch, getState) => {
    let { selectedWorkspace } = getState().workspace;
    let { selectedTeam } = getState().team;

    let announcementRef = firebase
      .firestore()
      .doc(
        `workspaces/${selectedWorkspace}/teams/${selectedTeam}/announcements/${announcementID}`
      );

    announcementRef.set(updatedAnnouncement, { merge: true }).then(function() {
      dispatch({ type: UPDATE_ANNOUNCEMENT });
    });
  };
}

// BY LITTLE LION
// SCREW CODE THIS IS A MESSAGE SAYING I FRICKIN FRICKETY FRICK LOVE YOU
// i have the hiccups
