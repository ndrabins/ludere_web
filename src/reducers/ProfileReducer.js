import {
  FETCH_USER_PROFILE,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_MY_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_ERROR,
} from "../actions/types";

const initialState = {
  myUserProfile: {},
  selectedUserProfile: {},
};

export default function team(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_PROFILE:
      return state;
    case FETCH_USER_PROFILE_SUCCESS:
      return { ...state, selectedUserProfile: action.profile };
    case FETCH_MY_USER_PROFILE_SUCCESS:
      return { ...state, myUserProfile: action.profile };
    case FETCH_USER_PROFILE_ERROR:
      return state;
    default:
      return state;
  }
}
