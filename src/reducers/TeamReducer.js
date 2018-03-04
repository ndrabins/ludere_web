import {
  CREATE_TEAM,
  CREATE_TEAM_SUCCESS,
  CREATE_TEAM_ERROR,
  JOIN_TEAM,
  JOIN_TEAM_SUCCESS,
  JOIN_TEAM_ERROR,
  FETCH_TEAMS,
  FETCH_TEAMS_SUCCESS,
  FETCH_TEAMS_ERROR,
  SELECT_TEAM
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
    default:
      return state;
  }
}
