import {
  SELECT_BOARD,
  FETCH_BOARDS,
  FETCH_BOARDS_SUCCESS,
  CREATE_BOARD
} from "./types";
import firebase from "firebase";

require("firebase/firestore");

//fetch my profileID on default
export function createBoard(boardName) {
  return (dispatch, getState) => {
    dispatch({ type: CREATE_BOARD });
    let { uid } = getState().auth.user;
    let selectedTeamId = getState().team.selectedTeam;

    let board = {
      dateCreated: Date.now(),
      createdBy: uid,
      teamID: selectedTeamId,
      boardName: boardName
    };

    let boardRef = firebase.firestore().collection("workflow");
    boardRef.add(board).then(function(docRef) {
      console.log("Board created with ref ", docRef.id);
    });
  };
}
