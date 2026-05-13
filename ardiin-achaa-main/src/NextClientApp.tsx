// @ts-nocheck
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store/store";

const routerFuture = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
};

const NextClientApp = () => {
  return (
    <Provider store={store}>
      <BrowserRouter future={routerFuture}>
        <App />
      </BrowserRouter>
    </Provider>
  );
};

export default NextClientApp;
