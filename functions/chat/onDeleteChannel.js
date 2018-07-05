const admin = require("firebase-admin");
const functions = require("firebase-functions");

try {
  admin.initializeApp(functions.config().firebase);
} catch (e) {}
const firestore = admin.firestore();
const deleteUtility = require("../utility/deleteCollection");

// delete all messages on deleting a channel
exports.handler = functions.firestore
  .document("chat/{channelID}")
  .onDelete((snap, context) => {
    return deleteUtility.deleteCollection(
      firestore,
      `chat/${snap.id}/messages`,
      50
    );
  });
