import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ChiefProvider from "./components/ChiefProvider";
import "./index.css";

ReactDOM.render(
  <StrictMode>
    <ChiefProvider>
      <App />
    </ChiefProvider>
  </StrictMode>,
  document.getElementById("root")
);
