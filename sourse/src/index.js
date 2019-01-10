import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./view/App";
import { BASEROUTE } from "config/path";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route } from "react-router-dom";
ReactDOM.render(
  <BrowserRouter basename={''}>
    <Route component={App} />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
