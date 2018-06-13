import {
  FETCH_NOTIFICATIONS,
  FETCH_NOTIFICATIONS_SUCCESS,
  NOTIFICATION_READ
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
      .collection(`privateUserData`)
      .doc(`${uid}`);

    let newNotifications = { notifications: {} };

    newNotifications.notifications[`${notificationID}`] = false;

    notificationRef.set(newNotifications, { merge: true });
  };
}

export function fetchNotifications() {
  return (dispatch, getState) => {
    const { uid } = getState().auth.user;
    dispatch({ type: FETCH_NOTIFICATIONS });

    const notificationRef = firebase
      .firestore()
      .collection(`privateUserData`)
      .doc(`${uid}`);

    notificationRef.onSnapshot(function(doc) {
      console.log(doc.data());
      if (!doc.exists) {
        dispatch({
          type: FETCH_NOTIFICATIONS_SUCCESS,
          notifications: {}
        });
        return;
      }
      dispatch({
        type: FETCH_NOTIFICATIONS_SUCCESS,
        notifications: doc.data().notifications
      });
    });
  };
}
