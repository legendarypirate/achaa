// @ts-nocheck
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

// REDUX
import { Provider } from "react-redux";
import { compose, combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// REDUCERS
import authReducer from "./store/reducers/authReducer";

import App from "./App";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  auth: authReducer,
});

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,

  document.getElementById("root")
);
