import { combineReducers } from "redux";
// import { routerReducer } from "react-router-redux";

//Reducers
import AuthReducer from "./AuthReducer";
import TeamReducer from "./TeamReducer";
import ChatReducer from "./ChatReducer";
import WorkspaceReducer from "./WorkspaceReducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  team: TeamReducer,
  chat: ChatReducer,
  workspace: WorkspaceReducer,
});

export default rootReducer;
