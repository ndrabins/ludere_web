const createNotification = (db, userID, itemID, notificationData) => {
  return new Promise((resolve, reject) => {
    writeNotification(db, userID, itemID, notificationData, resolve, reject);
  });
};

// 1. Top level ID needs to match with context of thing being notified. IE
// noficationID = boardID that was updated
// 2: dateCreated, type, creator? (person who updated, deleted, created) - SET ATTRIBUTES ON ALL NOTIFICATIONS
// 3: data - variable data object based upon needs of notifications
// tag - messageContent, fromID,
// task - descriptionUpdated: true,
// assignedTask - fromID, taskName?,

// this is just validation we are sending correct "types"
const notificationTypes = {
  directMessage: "directMessage",
  assignedUser: "assignedUser",
  task: "task",
  board: "board",
  channel: "board",
};

// const sampleChatTagNotification = {
//   type: "channel",
//   dateCreated: Date.now(),
//   priority: "priority", // relax vs priority -
//   showNotification: true, // set this to false once a user views it - ie visits channel
//   data: {
//     // context related to the channel
//     from: "userID",
//     messageID: "123", // highlight the message you were tagged in
//   },
// };

// const sampleCommentNotification = {
//   type: "task",
//   dateCreated: Date.now(),
//   priority: "relax",
//   showNotification: true, // set this to false once a user views it - ie visits channel
//   data: {
//     // context related to the task
//     comment: true,
//     // subtask: true, if a task was updated with a "Subtask change"... update this to be true
//   },
// };
// const sampleAssignUserBoardNotification = {
//   type: "board",
//   dateCreated: db.FieldValue.serverTimestamp(),
//   priority: false, // show red icon to the left of board...
//   showNotification: true, // set this to false once a user views it - ie visits channel
//   data: {}, // context related to the task  }
// };

// const sampleAssignUserNotification = {
//   type: "task",
//   dateCreated: Date.now(),
//   priority: true,
//   showNotification: true, // set this to false once a user views it - ie visits channel
//   teamID: <id>
//   workspaceID: <id>
//   data: {
//     // context related to the task
//     comment: true,
//     // subtask: true, if a task was updated with a "Subtask change"... update this to be true
//   },
// };

// possible data attributes - use as a guide for crafting notifications
// Data is where we put information we want to display on that notifications
const dataAttributes = {
  taskCreated: true,
  comment: true,
  subtaskCreated: true,
};

function writeNotification(
  db,
  userID,
  itemID,
  notificationData,
  resolve,
  reject
) {
  const privateUserRef = db.doc(
    `privateUserData/${userID}/notifications/${itemID}`
  );

  const notification = {
    showNotification: true, // set this to false once a user views it - ie visits channel
    // this is to handle the case where we want to show something on the initial view but never again... for example a new task
    ...notificationData,
  };

  privateUserRef
    .set(notification, { merge: true })
    .then(() => {
      resolve();
      return;
    })
    .catch(reject);
}

export { createNotification };
