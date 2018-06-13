// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");

const Map = require("lodash/map");
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");
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
              if (isMember || !message.sentBy) {
                let notifications = {};
                notifications[`${channelID}`] = true;
                const userRef = firestore.doc(`users/${memberID}`);
                userRef.set(
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
    return deleteCollection(firestore, `workflow/${snap.id}/lists`, 10);
  });

// delete all messages on deleting a channel
exports.onDeleteChannel = functions.firestore
  .document("chat/{channelID}")
  .onDelete((snap, context) => {
    return deleteCollection(firestore, `chat/${snap.id}/messages`, 50);
  });

function deleteCollection(db, collectionPath, batchSize) {
  var collectionRef = db.collection(collectionPath);
  var query = collectionRef.orderBy("__name__").limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, batchSize, resolve, reject);
  });
}

function deleteCollection(db, collectionPath, batchSize) {
  var collectionRef = db.collection(collectionPath);
  var query = collectionRef.orderBy("__name__").limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, batchSize, resolve, reject);
  });
}

function deleteQueryBatch(db, query, batchSize, resolve, reject) {
  query
    .get()
    .then(snapshot => {
      // When there are no documents left, we are done
      if (snapshot.size == 0) {
        return 0;
      }

      // Delete documents in a batch
      var batch = db.batch();
      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });

      return batch.commit().then(() => {
        return snapshot.size;
      });
    })
    .then(numDeleted => {
      if (numDeleted === 0) {
        resolve();
        return;
      }

      // Recurse on the next process tick, to avoid
      // exploding the stack.
      process.nextTick(() => {
        deleteQueryBatch(db, query, batchSize, resolve, reject);
      });
    })
    .catch(reject);
}
