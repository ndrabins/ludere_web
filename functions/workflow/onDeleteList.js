const admin = require("firebase-admin");
const functions = require("firebase-functions");

try {
  admin.initializeApp(functions.config().firebase);
} catch (e) {} // You do that because the admin SDK can only be initialized once.
const firestore = admin.firestore();

exports.handler = functions.firestore
  .document(
    "workspace/{workspaceID}/teams/{teamID}/workflow/{boardID}/lists/{listID}"
  )
  .onDelete((snap, context) => {
    const deletedList = snap.data();
    const workspaceID = context.params.workspaceID;
    const teamID = context.params.teamID;
    const boardID = context.params.boardID;
    const taskOrder = deletedList.taskOrder;

    taskOrder.forEach(taskID => {
      firestore
        .doc(
          `workspace/${workspaceID}/teams/${teamID}/workflow/${boardID}/tasks/${taskID}`
        )
        .delete()
        .then(function() {
          console.log("Document successfully deleted!");
        });
    });
    return null;
  });
