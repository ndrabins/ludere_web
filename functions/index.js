"use strict"; // The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");
try {
  admin.initializeApp(functions.config().firebase);
} catch (e) {} // You do that because the admin SDK can only be initialized once.
const firestore = admin.firestore();

// HOWTO make an onCall function.
// exports.helloWorld = functions.https.onCall((data, context) => {
//   try {
//     return "passed";
//   } catch (err) {
//     throw new functions.https.HttpsError("unknown", error.message, error);
//   }
// });

// TODO: refactor this to async await

exports.onCreateMessage = require("./chat/onCreateMessage");
exports.onDeleteChannel = require("./chat/onDeleteChannel");

exports.onDeleteList = require("./workflow/onDeleteList");
exports.onDeleteBoard = require("./workflow/onDeleteBoard");
