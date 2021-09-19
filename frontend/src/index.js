import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import { $, jQuery } from "jquery";
window.$ = $;
window.jQuery = jQuery;

ReactDOM.render(<App />, document.getElementById("root"));

reportWebVitals();
