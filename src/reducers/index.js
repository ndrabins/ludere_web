import { combineReducers } from "redux";
// import { routerReducer } from "react-router-redux";

//Reducers
import AuthReducer from "./AuthReducer";
import TeamReducer from "./TeamReducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  team: TeamReducer,
});

export default rootReducer;
