"use strict"; // The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");
try {
  admin.initializeApp(functions.config().firebase);
} catch (e) {} // You do that because the admin SDK can only be initialized once.
const firestore = admin.firestore();

// TODO: refactor this to async await es6

exports.onCreateMessage = require("./chat/onCreateMessage");
exports.onDeleteChannel = require("./chat/onDeleteChannel");

exports.onDeleteList = require("./workflow/onDeleteList");
exports.onDeleteBoard = require("./workflow/onDeleteBoard");

exports.inviteUser = require("./workspaces/inviteUser");
