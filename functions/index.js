// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");

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

exports.onCreateMessage = functions.firestore
  .document("chat/{channelID}/messages/{messageID}")
  .onDelete((snap, context) => {
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
