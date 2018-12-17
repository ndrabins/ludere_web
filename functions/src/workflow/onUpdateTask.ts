const admin = require("firebase-admin");
const functions = require("firebase-functions");
const Map = require("lodash/map");

const firestore = admin.firestore();
import { createNotification } from "../notifications/notifications";

export const handler = functions.firestore
  .document(
    "workspaces/{workspaceID}/teams/{teamID}/workflow/{boardID}/tasks/{taskID}"
  )
  .onUpdate((snap, context) => {
    const boardID = context.params.boardID;
    const workspaceID = context.params.workspaceID;
    const teamID = context.params.teamID;
    const taskID = context.params.taskID;

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
          if (isMember) {
            createNotification(firestore, memberID, teamID, {
              type: "team",
              priority: false,
              teamID: teamID,
              workspaceID: workspaceID,
              dateCreated: context.timestamp,
              data: {},
            });
            createNotification(firestore, memberID, boardID, {
              type: "board",
              priority: false,
              teamID: teamID,
              workspaceID: workspaceID,
              dateCreated: context.timestamp,
              data: {},
            });
            createNotification(firestore, memberID, taskID, {
              type: "task",
              priority: false,
              teamID: teamID,
              workspaceID: workspaceID,
              dateCreated: context.timestamp,
              data: {}, // put here what was actually updated
            });
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
