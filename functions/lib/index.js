"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
try {
    admin.initializeApp(functions.config().firebase);
}
catch (e) { } // You do that because the admin SDK can only be initialized once.
const firestore = admin.firestore();
const OnCreateMessage = require("./chat/onCreateMessage");
const OnDeleteChannel = require("./chat/onDeleteChannel");
const OnDeleteBoard = require("./workflow/onDeleteBoard");
const OnCreateTask = require("./workflow/OnCreateTask");
const OnUpdateTask = require("./workflow/OnUpdateTask");
const OnDeleteList = require("./workflow/onDeleteList");
const InviteUser = require("./workspaces/inviteUser");
const onDeleteTeam = require("./team/onDeleteTeam");
exports.onCreateMessage = OnCreateMessage.handler;
exports.onDeleteChannel = OnDeleteChannel.handler;
exports.onDeleteList = OnDeleteList.handler;
exports.onDeleteBoard = OnDeleteBoard.handler;
exports.OnCreateTask = OnCreateTask.handler;
exports.OnUpdateTask = OnUpdateTask.handler;
exports.onDeleteTeam = onDeleteTeam.handler;
exports.inviteUser = InviteUser.handler;
//# sourceMappingURL=index.js.map