
import { combineReducers } from "redux";
import listStreamingReducer from "./useReducer";

const rootReducer = combineReducers({
  listStream: listStreamingReducer,
});

export default rootReducer;
