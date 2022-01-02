import { combineReducers } from "redux";
import { SET_ACCOUNT_INFORMATION, SET_MONITOR_ACCOUNT } from "./actions";

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_ACCOUNT_INFORMATION: //payload contains account information
      return { ...state, accountInformation: action.payload };
    case SET_MONITOR_ACCOUNT:
      return { ...state, monitorAccount: action.payload };
    default:
      return state;
  }
};

export const reducer = combineReducers({
  auth: authReducer,
});
