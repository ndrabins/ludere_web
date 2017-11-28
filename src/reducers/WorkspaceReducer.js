import {
  SELECT_WORKSPACE,
  CREATE_WORKSPACE,
  CREATE_WORKSPACE_SUCCESS,
  CREATE_WORKSPACE_ERROR,
  FETCH_WORKSPACES,
  FETCH_WORKSPACES_SUCCESS,
  FETCH_WORKSPACES_ERROR,
  JOIN_WORKSPACE,
  JOIN_WORKSPACE_SUCCESS,
  JOIN_WORKSPACE_ERROR,
  FETCH_WORKSPACE_USERS,
  FETCH_WORKSPACE_USERS_SUCCESS,
  FETCH_WORKSPACE_USERS_ERROR,
} from "../actions/types";

const initialState = {
  workspaces: {},
  selectedWorkspace: null,
  workspaceUsers: {},
  loadingUsers: false,
};

export default function workspaces(state = initialState, action) {
  switch (action.type) {
    case SELECT_WORKSPACE:
      return {
        ...state,
        selectedWorkspace: action.selectedWorkspace
      };
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
    case JOIN_WORKSPACE:
      return state;
    case JOIN_WORKSPACE_SUCCESS:
      return state;
    case JOIN_WORKSPACE_ERROR:
      return state;
    case FETCH_WORKSPACE_USERS:
      return {
        ...state,
        loadingUsers: true,
      };
    case FETCH_WORKSPACE_USERS_SUCCESS:
      return {
        ...state,
        workspaceUsers: action.workspaceUsers,
        loadingUsers: false,
      };
    case FETCH_WORKSPACE_USERS_ERROR:
      return state;
    default:
      return state;
  }
}
