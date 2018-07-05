//  exports.handler = function(req, res, database) {
//     const deletedList = snap.data();
//     const boardID = deletedList.boardID;
//     const taskOrder = deletedList.taskOrder;

//     taskOrder.forEach(taskID => {
//       firestore
//         .doc(`workflow/${boardID}/tasks/${taskID}`)
//         .delete()
//         .then(function() {
//           console.log("Document successfully deleted!");
//         });
//     });
//     return null;
//   });
