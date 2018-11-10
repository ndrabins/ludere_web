import {
  FETCH_NOTIFICATIONS,
  FETCH_NOTIFICATIONS_SUCCESS,
  NOTIFICATION_READ,
} from "../actions/types";

import firebase from "firebase/app";

//send firebase path here to mark notification as read

//fetch noticiations
export function readNotification(notificationID) {
  return (dispatch, getState) => {
    const { uid } = getState().auth.user;
    dispatch({ type: NOTIFICATION_READ });

    const notificationRef = firebase
      .firestore()
      .collection("privateUserData")
      .doc(`${uid}`)
      .collection("notifications")
      .doc(`${notificationID}`);

    notificationRef.set(
      { showNotification: false, hasBeenViewedBefore: true },
      { merge: true }
    );
  };
}

export function fetchNotifications() {
  return (dispatch, getState) => {
    const { uid } = getState().auth.user;
    dispatch({ type: FETCH_NOTIFICATIONS });

    const notificationRef = firebase
      .firestore()
      .collection(`privateUserData`)
      .doc(`${uid}`)
      .collection(`notifications`);

    notificationRef.onSnapshot(function(querySnapshot) {
      var notifications = {};
      querySnapshot.forEach(function(doc) {
        notifications[doc.id] = doc.data();
      });
      dispatch({
        type: FETCH_NOTIFICATIONS_SUCCESS,
        notifications: notifications,
      });
    });
  };
}
