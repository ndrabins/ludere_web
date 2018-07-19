import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

try {
  admin.initializeApp(functions.config().firebase);
} catch (e) {}
const firestore = admin.firestore();

// delete all messages on deleting a channel
export const handler = functions.https.onCall(async (data, context) => {
  // 1. create a user for each email
  // 2. send that user sign in link
  let newUsers = {};

  let workspaceID = data.workspaceID;
  let workspaceData = {};
  let updateWorkspacePromises;

  let createUserPromises = data.emails.map(email => {
    return admin
      .auth()
      .createUser({
        email: email,
        emailVerified: false,
        displayName: email,
        photoURL: "https://image.flaticon.com/icons/svg/186/186539.svg"
      })
      .then(userRecord => {
        return userRecord;
      })
      .catch(error => {
        console.warn(error);
        return {};
      });
  });

  return await Promise.all(createUserPromises)
    .then(invitedUsers => {
      invitedUsers.map(user => {
        // @ts-ignore
        if (user.uid) {
          // @ts-ignore
          newUsers[user.uid] = true;
        }
      });
      return newUsers; // return the UID of all successfully created users
    })
    .catch(error => {
      console.log("Error in promise all", error);
      return newUsers;
    });
});
