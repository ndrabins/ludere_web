const admin = require("firebase-admin");
const functions = require("firebase-functions");

try {
  admin.initializeApp(functions.config().firebase);
} catch (e) {}
const firestore = admin.firestore();

// delete all messages on deleting a channel
exports.handler = functions.https.onCall((data, context) => {
  // 1. create a user for each email
  // 2. send that user sign in link
  let newUsers = {};

  let createUserPromises = data.emails.map(email => {
    return admin.auth().createUser({
      email: email,
      emailVerified: false,
      displayName: email,
      photoURL: ""
    });
  });

  Promise.all(createUserPromises)
    .then(function(invitedUsers) {
      return invitedUsers;
    })
    .catch(function(error) {
      console.log("Error creating new user:", error);
    });

  // .then(function(userRecord) {
  //   // See the UserRecord reference doc for the contents of userRecord.
  //   newUsers[userRecord.uid] = true;
  // })
  // .catch(function(error) {
  //   console.log("Error creating new user:", error);
  // });
});
