import {
  CREATE_WORKSPACE,
  CREATE_WORKSPACE_SUCCESS,
  CREATE_WORKSPACE_ERROR,
  FETCH_WORKSPACES,
  FETCH_WORKSPACES_SUCCESS,
  FETCH_WORKSPACES_ERROR,
} from "../actions/types";

const initialState = {
  workspaces: {},
  selectedCompany: null
};

export default function workspaces(state = initialState, action) {
  switch (action.type) {
    case CREATE_WORKSPACE:
      return state;
    case CREATE_WORKSPACE_SUCCESS:
      return state;
    case CREATE_WORKSPACE_ERROR:
      return state;
    case FETCH_WORKSPACES:
      return state;
    case FETCH_WORKSPACES_SUCCESS:
      return {
        ...state,
        workspaces: action.workspaces
      };
    case FETCH_WORKSPACES_ERROR:
      return state;
    default:
      return state;
  }
}
