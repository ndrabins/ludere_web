import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

try {
  admin.initializeApp(functions.config().firebase);
} catch (e) {} // You do that because the admin SDK can only be initialized once.
const firestore = admin.firestore();

import * as OnCreateMessage from "./chat/onCreateMessage";
import * as OnDeleteChannel from "./chat/onDeleteChannel";
import * as OnDeleteBoard from "./workflow/onDeleteBoard";
import * as OnDeleteList from "./workflow/onDeleteList";
// import * as InviteUser from "./workspaces/inviteUser";

// TODO: refactor this to async await es6

exports.onCreateMessage = OnCreateMessage.handler;
exports.onDeleteChannel = OnDeleteChannel.handler;

exports.onDeleteList = OnDeleteList.handler;
exports.onDeleteBoard = OnDeleteBoard.handler;

// exports.inviteUser = InviteUser.handler;
