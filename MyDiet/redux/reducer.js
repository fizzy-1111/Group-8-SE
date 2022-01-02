import { combineReducers } from "redux";
import { SET_ACCOUNT_INFORMATION } from "./actions";

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_ACCOUNT_INFORMATION: //payload contains account information
      return { ...state, accountInformation: action.payload };
    default:
      return state;
  }
};

export const reducer = combineReducers({
  auth: authReducer,
});
