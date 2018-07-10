const admin = require("firebase-admin");
const functions = require("firebase-functions");

try {
  admin.initializeApp(functions.config().firebase);
} catch (e) {}
const firestore = admin.firestore();
const deleteUtility = require("../utility/deleteCollection");

// delete all messages on deleting a channel
exports.handler = functions.firestore
  .document("workspace/{workspaceID}/teams/{teamID}/chat/{channelID}")
  .onDelete((snap, context) => {
    const workspaceID = context.params.workspaceID;
    const teamID = context.params.teamID;
    const channelID = context.params.channelID;

    return deleteUtility.deleteCollection(
      firestore,
      `workspace/${workspaceID}/teams/${teamID}/chat/${channelID}/messages`,
      50
    );
  });
