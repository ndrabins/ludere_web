import { combineReducers } from "redux";
// import { routerReducer } from "react-router-redux";

//Reducers
import AuthReducer from "./AuthReducer";
import TeamReducer from "./TeamReducer";
import ChatReducer from "./ChatReducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  team: TeamReducer,
  chat: ChatReducer,
});

export default rootReducer;
