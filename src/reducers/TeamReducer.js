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
  selectedTeam: null
};

export default function team(state = initialState, action) {
  switch (action.type) {
    case CREATE_TEAM:
      return {
        ...state
      };
    case CREATE_TEAM_SUCCESS:
      return {
        ...state
      };
    case FETCH_TEAMS:
      return {
        ...state
      };
    case FETCH_TEAMS_SUCCESS:
      return {
        ...state,
        teams: action.teams
      };
    case SELECT_TEAM:
      return {
        ...state,
        selectedTeam: action.selectedTeam
      };
    default:
      return state;
  }
}
