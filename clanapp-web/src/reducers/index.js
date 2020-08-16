import loggedReducer from "./isLogged";
import userDetails from "./userDetails";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  isLogged: loggedReducer,
  userDetails: userDetails,
});

export default allReducers;
