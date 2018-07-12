import { combineReducers } from "redux";
// import { routerReducer } from "react-router-redux";

//Reducers
import AuthReducer from "./AuthReducer";
import TeamReducer from "./TeamReducer";
import ChatReducer from "./ChatReducer";
import WorkspaceReducer from "./WorkspaceReducer";
import ProfileReducer from "./ProfileReducer";
import WorkflowReducer from "./WorkflowReducer";
import UserReducer from "./UserReducer";

const appReducer = combineReducers({
  auth: AuthReducer,
  team: TeamReducer,
  workspace: WorkspaceReducer,
  profile: ProfileReducer,
  chat: ChatReducer,
  workflow: WorkflowReducer,
  userData: UserReducer
});

const rootReducer = (state, action) => {
  if (action.type === "SIGN_OUT_USER") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
