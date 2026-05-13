// @ts-nocheck
import React from "react";
import { createRoot } from "react-dom/client";
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

const rootEl = document.getElementById("root");
if (rootEl) {
  const root = createRoot(rootEl);
  root.render(
    <Provider store={store}>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <App />
      </BrowserRouter>
    </Provider>
  );
}
