const admin = require("firebase-admin");
const functions = require("firebase-functions");
const Map = require("lodash/map");

try {
  admin.initializeApp(functions.config().firebase);
} catch (e) {}
const firestore = admin.firestore();

exports.handler = functions.firestore
  .document(
    "workspace/{workspaceID}/teams/{teamID}/chat/{channelID}/messages/{messageID}"
  )
  .onCreate((snap, context) => {
    const channelID = context.params.channelID;
    const workspaceID = context.params.workspaceID;
    const teamID = context.params.teamID;
    const message = snap.data();

    const teamRef = firestore.doc(`workspaces/${workspaceID}/teams/${teamID}`);

    // get all teammembers to know where to send notifications
    teamRef
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
            notifications[`${channel.team}`] = true; // set notification on the teamg
            notifications[`${channelID}`] = true;
            const privateUserRef = firestore.doc(`privateUserData/${memberID}`);
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
        console.log("Error in fetching team members", err);
      });

    // 1. get team ID on channel.
    // 2. fetch team to find members
    // 3. send each team member a notification of channelID
  });
