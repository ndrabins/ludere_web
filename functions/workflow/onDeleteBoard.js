const admin = require("firebase-admin");
const functions = require("firebase-functions");

try {
  admin.initializeApp(functions.config().firebase);
} catch (e) {}
const firestore = admin.firestore();
const deleteUtility = require("../utility/deleteCollection");

// delete all lists in board whenever board is deleted. This will propagate to tasks as well.
exports.handler = functions.firestore
  .document("workflow/{boardID}")
  .onDelete((snap, context) => {
    //don't need to delete tasks here because we already do that on deleting each list
    return deleteUtility.deleteCollection(
      firestore,
      `workflow/${snap.id}/lists`,
      10
    );
  });
