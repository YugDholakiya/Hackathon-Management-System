import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./redux/rootreducer.jsx";
// import {thunk } from 'redux-thunk'
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { BrowserRouter } from "react-router-dom";
import { Button } from "./components/common/Button.jsx";
import "./fonts/Nunito_Sans/NunitoSans-VariableFont_YTLC,opsz,wdth,wght.ttf";

// import HackathonsPage from "./components/layout/HackathonsPage/HackathonsPage.jsx";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
