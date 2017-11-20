import { combineReducers } from "redux";
// import { routerReducer } from "react-router-redux";

//Reducers
import AuthReducer from "./AuthReducer";
import TeamReducer from "./TeamReducer";
import ChatReducer from "./ChatReducer";
import WorkspaceReducer from "./WorkspaceReducer";
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  auth: AuthReducer,
  team: TeamReducer,
  chat: ChatReducer,
  workspace: WorkspaceReducer,
  form: formReducer
});

export default rootReducer;
