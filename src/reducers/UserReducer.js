import {
  FETCH_NOTIFICATIONS,
  FETCH_NOTIFICATIONS_SUCCESS
} from "../actions/types";

const initialState = {
  notifications: {}
};

export default function team(state = initialState, action) {
  switch (action.type) {
    case FETCH_NOTIFICATIONS:
      return { ...state };
    case FETCH_NOTIFICATIONS_SUCCESS:
      return { ...state, notifications: action.notifications };
    default:
      return state;
  }
}
