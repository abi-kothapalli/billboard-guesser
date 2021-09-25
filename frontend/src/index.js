import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Using Bootstrap for CSS styling and Font Awesome for icons
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";

// Add App component to root of webpage
ReactDOM.render(<App />, document.getElementById("root"));

reportWebVitals();
