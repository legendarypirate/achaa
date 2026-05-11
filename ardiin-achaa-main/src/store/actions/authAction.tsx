// @ts-nocheck
import Axios from "../../Axios";
import * as actionTypes from "./actionTypes";

export const fetchAuthStart = () => {
  return {
    type: actionTypes.FETCH_AUTH_START,
  };
};

export const fetchAuthSuccess = (data) => {
  return {
    type: actionTypes.FETCH_AUTH_SUCCESS,
    data: data,
  };
};

export const fetchAuthFail = (error) => {
  return {
    type: actionTypes.FETCH_AUTH_FAIL,
    error: error,
  };
};

export const fetchAuth = () => {
  return (dispatch) => {
    dispatch(fetchAuthStart());

    let tokenName = "token";
    if (String(window.location.pathname).search("/admin") > -1) {
      tokenName = "adminToken";
    }

    Axios.get("/accounts/authenticate", {
      headers: {
        token: localStorage.getItem(tokenName),
      },
    })
      .then((res) => {
        // const id = parseInt(String(window.location.pathname).split("/")[2]);

        if (res.data.error === 409 || res.data.error === 404) {
          window.localStorage.removeItem(tokenName);
        } else {
          dispatch(fetchAuthSuccess(res.data));
        }

        // if (id && id !== res.data.user.id) {
        //   window.location.replace("/admin");
        // }
      })
      .catch((error) => {
        dispatch(fetchAuthFail(error));
      });
  };
};
