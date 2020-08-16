import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore } from "redux";
import allReducers from "./reducers";
import { Provider } from "react-redux";

function saveToLocalStorage(state) {
  try {
    const SerializedState = JSON.stringify(state);
    localStorage.setItem("state", SerializedState);
  } catch (e) {
    console.log(e);
  }
}

function LoadFromLocalStorage() {
  try {
    const SerializedState = localStorage.getItem("state");
    if (SerializedState == null) return undefined;
    return JSON.parse(SerializedState);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

const presistedState = LoadFromLocalStorage();

const store = createStore(
  allReducers,
  presistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => saveToLocalStorage(store.getState()));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
