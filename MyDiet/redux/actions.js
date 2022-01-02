// action types
export const SET_ACCOUNT_INFORMATION = "SET_ACCOUNT_INFORMATION";

//actions
export const setAccountInformation = (item) => ({
  type: SET_ACCOUNT_INFORMATION,
  payload: item,
});
