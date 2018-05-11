import {
  CREATE_TEAM,
  CREATE_TEAM_SUCCESS,
  JOIN_TEAM,
  FETCH_TEAMS,
  FETCH_TEAMS_SUCCESS,
  SELECT_TEAM,
  REMOVE_TEAM_MEMBER
} from "../actions/types";

const initialState = {
  teams: {},
  selectedTeam: null,
  loading: false
};

export default function team(state = initialState, action) {
  switch (action.type) {
    case CREATE_TEAM:
      return state;
    case CREATE_TEAM_SUCCESS:
      return state;
    case FETCH_TEAMS:
      return {
        ...state,
        loading: true
      };
    case FETCH_TEAMS_SUCCESS:
      return {
        ...state,
        teams: action.teams,
        loading: false
      };
    case SELECT_TEAM:
      return {
        ...state,
        selectedTeam: action.selectedTeam
      };
    case JOIN_TEAM:
      return state;
    case REMOVE_TEAM_MEMBER:
      return state;
    default:
      return state;
  }
}
