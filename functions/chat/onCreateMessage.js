const admin = require("firebase-admin");
const functions = require("firebase-functions");

try {
  admin.initializeApp(functions.config().firebase);
} catch (e) {}
const firestore = admin.firestore();

exports.handler = functions.firestore
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
