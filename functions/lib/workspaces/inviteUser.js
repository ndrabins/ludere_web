"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
try {
    admin.initializeApp(functions.config().firebase);
}
catch (e) { }
const firestore = admin.firestore();
// delete all messages on deleting a channel
exports.handler = functions.https.onCall((data, context) => __awaiter(this, void 0, void 0, function* () {
    // 1. create a user for each email
    // 2. send that user sign in link
    let newUsers = {};
    let workspaceID = data.workspaceID;
    let workspaceData = {};
    let updateWorkspacePromises;
    if (!context.auth) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError("failed-precondition", "The function must be called " + "while authenticated.");
    }
    let createUserPromises = data.emails.map(email => {
        return admin
            .auth()
            .createUser({
            email: email,
            emailVerified: false,
            displayName: email,
            photoURL: "https://image.flaticon.com/icons/svg/186/186539.svg"
        })
            .then(userRecord => {
            return userRecord;
        })
            .catch(error => {
            console.warn(error);
            return {};
        });
    });
    return yield Promise.all(createUserPromises)
        .then(invitedUsers => {
        invitedUsers.map(user => {
            // @ts-ignore
            if (user.uid) {
                // @ts-ignore
                newUsers[user.uid] = true;
            }
        });
        return newUsers; // return the UID of all successfully created users
    })
        .catch(error => {
        console.log("Error in promise all", error);
        return newUsers;
    });
}));
//# sourceMappingURL=inviteUser.js.map