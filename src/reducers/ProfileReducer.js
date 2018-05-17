import {
  FETCH_USER_PROFILE,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_MY_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_ERROR,
  UPDATE_USER_PROFILE
} from "../actions/types";

const initialState = {
  myUserProfile: {
    photoURL: ""
  },
  selectedUserProfile: {},
  loading: false
};

export default function team(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_PROFILE:
      return { ...state, loading: true };
    case FETCH_USER_PROFILE_SUCCESS:
      return { ...state, selectedUserProfile: action.profile, loading: true };
    case FETCH_MY_USER_PROFILE_SUCCESS:
      return { ...state, myUserProfile: action.profile, loading: false };
    case FETCH_USER_PROFILE_ERROR:
      return state;
    case UPDATE_USER_PROFILE:
      return state;
    default:
      return state;
  }
}
