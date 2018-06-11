// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");
const cors = require("cors")({
  origin: true
});
admin.initializeApp();
const firestore = admin.firestore();

// HOWTO make an onCall function.
// exports.helloWorld = functions.https.onCall((data, context) => {
//   try {
//     return "passed";
//   } catch (err) {
//     throw new functions.https.HttpsError("unknown", error.message, error);
//   }
// });

// Delete all tasks in list whenever a list is deleted.
exports.onDeleteList = functions.firestore
  .document("workflow/{boardID}/lists/{listID}")
  .onDelete((snap, context) => {
    const deletedList = snap.data();
    const boardID = deletedList.boardID;
    const taskOrder = deletedList.taskOrder;

    taskOrder.forEach(taskID => {
      firestore
        .doc(`workflow/${boardID}/tasks/${taskID}`)
        .delete()
        .then(function() {
          console.log("Document successfully deleted!");
        });
    });
  });

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
// exports.addMessage = functions.https.onRequest((req, res) => {
//   // Grab the text parameter.
//   const original = req.query.text;
//   // Push the new message into the Realtime Database using the Firebase Admin SDK.
//   return admin
//     .database()
//     .ref("/messages")
//     .push({ original: original })
//     .then(snapshot => {
//       // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
//       return res.redirect(303, snapshot.ref.toString());
//     });
// });
