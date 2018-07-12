// const admin = require("firebase-admin");
// const functions = require("firebase-functions");

// try {
//   admin.initializeApp(functions.config().firebase);
// } catch (e) {}
// const firestore = admin.firestore();

// // Whenever a user join or leaves a team we should upadte their token with theirmember status.
// // If they are a member we can set { teamID: true } , else set  { teamID: false }
// // We do this so we can validate if they have access to view whatever team resource they are trying to check.

// exports.handler = functions.firestore
//   .document("workspaces/{workspaceID}/teams/{teamID}")
//   .onUpdate((snap, context) => {
//     const workspaceID = context.params.workspaceID;
//     const teamID = context.params.teamID;
//     const channelID = context.params.channelID;

//     const previousValue = change.before.data();
//     const newValue = change.after.data();

//     // compare members list, if they haven't changed just return.
//     if (
//       JSON.stringify(previousValue.members) === JSON.stringify(newValue.members)
//     ) {
//       return null;
//     }

//     let additionalClaims = {};
//     additionalClaims[teamID] = true;

//     return admin
//       .auth()
//       .createCustomToken(uid, additionalClaims)
//       .then(function(customToken) {
//         // Send token back to client
//       })
//       .catch(function(error) {
//         console.log("Error creating custom token:", error);
//       });
//   });
