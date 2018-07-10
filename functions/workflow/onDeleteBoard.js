const admin = require("firebase-admin");
const functions = require("firebase-functions");

try {
  admin.initializeApp(functions.config().firebase);
} catch (e) {}
const firestore = admin.firestore();
const deleteUtility = require("../utility/deleteCollection");

// delete all lists in board whenever board is deleted. This will propagate to tasks as well.
exports.handler = functions.firestore
  .document("workspace/{workspaceID}/teams/{teamID}/workflow/{boardID}")
  .onDelete((snap, context) => {
    const workspaceID = context.params.workspaceID;
    const teamID = context.params.teamID;
    const boardID = context.params.boardID;

    //don't need to delete tasks here because we already do that on deleting each list
    return deleteUtility.deleteCollection(
      firestore,
      `workspace/${workspaceID}/teams/${teamID}/workflow/${boardID}/lists`,
      10
    );
  });
