const admin = require("firebase-admin");
const functions = require("firebase-functions");
const Map = require("lodash/map");

try {
  admin.initializeApp(functions.config().firebase);
} catch (e) {}
const firestore = admin.firestore();

export const handler = functions.firestore
  .document(
    "workspaces/{workspaceID}/teams/{teamID}/workflow/{boardID}/tasks/{taskID}"
  )
  .onCreate((snap, context) => {
    const boardID = context.params.boardID;
    const workspaceID = context.params.workspaceID;
    const teamID = context.params.teamID;
    const message = snap.data();

    const teamRef = firestore.doc(`workspaces/${workspaceID}/teams/${teamID}`);

    // get all teammembers to know where to send notifications
    return teamRef
      .get()
      .then(teamDoc => {
        const teamMembers = teamDoc.data().members;
        if (teamMembers === undefined) {
          return;
        }
        //for each team member that is a member, send a notification on the channel

        Map(teamMembers, (isMember, memberID) => {
          if (isMember && message.sentBy !== memberID) {
            let notifications = {};
            notifications[`${teamID}`] = true; // set notification on the teamg
            notifications[`${boardID}`] = true;
            const privateUserRef = firestore.doc(`privateUserData/${memberID}`);
            privateUserRef.set(
              {
                notifications,
              },
              { merge: true }
            );
          }
        });
      })
      .catch(err => {
        console.log("Error in notifications", err);
      });

    // 1. get team ID on channel.
    // 2. fetch team to find members
    // 3. send each team member a notification of channelID
  });
