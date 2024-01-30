import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import { AppContextProvider } from "./LifeMaze/AppContext";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { store } from "./LifeMaze/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route
        path="*"
        element={
          <AppContextProvider>
            <Provider store={store}>
              <App />
            </Provider>
          </AppContextProvider>
        }
      />
    </Routes>
  </BrowserRouter>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
