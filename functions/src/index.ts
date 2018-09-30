import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

try {
  admin.initializeApp(functions.config().firebase);
} catch (e) {} // You do that because the admin SDK can only be initialized once.
const firestore = admin.firestore();

import * as OnCreateMessage from "./chat/onCreateMessage";
import * as OnDeleteChannel from "./chat/onDeleteChannel";
import * as OnDeleteBoard from "./workflow/onDeleteBoard";
import * as OnCreateTask from "./workflow/OnCreateTask";
import * as OnUpdateTask from "./workflow/OnUpdateTask";

import * as OnDeleteList from "./workflow/onDeleteList";
import * as InviteUser from "./workspaces/inviteUser";
import * as onDeleteTeam from "./team/onDeleteTeam";

exports.onCreateMessage = OnCreateMessage.handler;
exports.onDeleteChannel = OnDeleteChannel.handler;

exports.onDeleteList = OnDeleteList.handler;
exports.onDeleteBoard = OnDeleteBoard.handler;
exports.OnCreateTask = OnCreateTask.handler;
exports.OnUpdateTask = OnUpdateTask.handler;

exports.onDeleteTeam = onDeleteTeam.handler;

exports.inviteUser = InviteUser.handler;
