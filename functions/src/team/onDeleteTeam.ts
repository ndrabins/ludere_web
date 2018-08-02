const admin = require("firebase-admin");
const functions = require("firebase-functions");

try {
  admin.initializeApp(functions.config().firebase);
} catch (e) {}
const firestore = admin.firestore();
const deleteUtility = require("../utility/deleteCollection");

// delete all messages on deleting a channel
export const handler = functions.firestore
  .document("workspaces/{workspaceID}/teams/{teamID}")
  .onDelete((snap, context) => {
    const workspaceID = context.params.workspaceID;
    const teamID = context.params.teamID;

    const deleteChatPromise = deleteUtility.deleteCollection(
      firestore,
      `workspaces/${workspaceID}/teams/${teamID}/chat`,
      20
    );
    const deleteWorkflowPromise = deleteUtility.deleteCollection(
      firestore,
      `workspaces/${workspaceID}/teams/${teamID}/workflow`,
      20
    );

    return Promise.all([deleteChatPromise, deleteWorkflowPromise]);
  });

// // delete all lists in board whenever board is deleted. This will propagate to tasks as well.
// export const handler = functions.firestore
//   .document("workspaces/{workspaceID}/teams/{teamID}/workflow/{boardID}")
//   .onDelete((snap, context) => {
//     const workspaceID = context.params.workspaceID;
//     const teamID = context.params.teamID;
//     const boardID = context.params.boardID;

//     //don't need to delete tasks here because we already do that on deleting each list
//     return deleteUtility.deleteCollection(
//       firestore,
//       `workspaces/${workspaceID}/teams/${teamID}/workflow/${boardID}/lists`,
//       10
//     );
//   });
