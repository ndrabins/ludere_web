// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");
const Map = require("lodash/map");
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");
try {
  admin.initializeApp(functions.config().firebase);
} catch (e) {} // You do that because the admin SDK can only be initialized once.
const firestore = admin.firestore();

const deleteUtility = require("./utility/deleteCollection");

// HOWTO make an onCall function.
// exports.helloWorld = functions.https.onCall((data, context) => {
//   try {
//     return "passed";
//   } catch (err) {
//     throw new functions.https.HttpsError("unknown", error.message, error);
//   }
// });

// TODO: refactor this to async await
exports.onCreateMessage = functions.firestore
  .document("chat/{channelID}/messages/{messageID}")
  .onCreate((snap, context) => {
    const channelID = context.params.channelID;
    const message = snap.data();

    const channelRef = firestore.doc(`chat/${channelID}`);
    //Fetch channel data for workspaceID and teamID
    channelRef
      .get()
      .then(channelDoc => {
        const channel = channelDoc.data();

        if (channel.workspaceID === undefined || channel.workspaceID === null) {
          return;
        }

        const teamRef = firestore.doc(
          `workspaces/${channel.workspaceID}/teams/${channel.team}`
        );

        // get all teammembers to know where to send notifications
        teamRef
          .get()
          .then(teamDoc => {
            const teamMembers = teamDoc.data().members;

            //for each team member that is a member, send a notification on the channel
            Map(teamMembers, (isMember, memberID) => {
              if (isMember && !message.sentBy) {
                let notifications = {};
                notifications[`${channelID}`] = true;
                const privateUserRef = firestore.doc(
                  `privateUserData/${memberID}`
                );
                privateUserRef.set(
                  {
                    notifications
                  },
                  { merge: true }
                );
              }
            });
          })
          .catch(err => {
            console.log("Error getting document", err);
          });
      })
      .catch(err => {
        console.log("Error getting document", err);
      });

    // 1. get team ID on channel.
    // 2. fetch team to find members
    // 3. send each team member a notification of channelID
    return null;
  });
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
    return null;
  });

// delete all lists in board whenever board is deleted. This will propagate to tasks as well.
exports.onDeleteBoard = functions.firestore
  .document("workflow/{boardID}")
  .onDelete((snap, context) => {
    //don't need to delete tasks here because we already do that on deleting each list
    return deleteUtility.deleteCollection(
      firestore,
      `workflow/${snap.id}/lists`,
      10
    );
  });

// delete all messages on deleting a channel
exports.onDeleteChannel = functions.firestore
  .document("chat/{channelID}")
  .onDelete((snap, context) => {
    return deleteUtility.deleteCollection(
      firestore,
      `chat/${snap.id}/messages`,
      50
    );
  });
