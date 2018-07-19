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
const OnDeleteList = require("./workflow/onDeleteList");
const InviteUser = require("./workspaces/inviteUser");
// TODO: refactor this to async await es6
exports.onCreateMessage = OnCreateMessage.handler;
exports.onDeleteChannel = OnDeleteChannel.handler;
exports.onDeleteList = OnDeleteList.handler;
exports.onDeleteBoard = OnDeleteBoard.handler;
exports.inviteUser = InviteUser.handler;
//# sourceMappingURL=index.js.map