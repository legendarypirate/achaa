// @ts-nocheck
import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  userID: "",
  authenticate: false,
  isLoaded: false,
};

const fetchAuthStart = (state, action) => {
  return updateObject(state);
};

const fetchAuthSuccess = (state, action) => {
  return updateObject(state, {
    userID: action.data.user.id,
    authenticate: action.data.isAuthenticated,
    isLoaded: true,
  });
};

const fetchAuthFail = (state, action) => {
  return updateObject(state, {
    isLoaded: true,
  });
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_AUTH_START:
      return fetchAuthStart(state, action);
    case actionTypes.FETCH_AUTH_SUCCESS:
      return fetchAuthSuccess(state, action);
    case actionTypes.FETCH_AUTH_FAIL:
      return fetchAuthFail(state, action);
    default:
      return state;
  }
};

export default authReducer;
