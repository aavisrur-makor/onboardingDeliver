import { createTheme, ThemeProvider } from "@material-ui/core";
import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import ChiefProvider from "./components/ChiefProvider";
import store from "./redux/store";
import {mainPaletteColors} from './utils/Themes/mainPalette'
import "./index.css";

const theme = createTheme({
  palette: mainPaletteColors,
  typography: {
    fontSize: 12,
    htmlFontSize: 13,
    fontFamily: '"Work Sans", "Roboto"',
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ChiefProvider>
        <App />
      </ChiefProvider>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
