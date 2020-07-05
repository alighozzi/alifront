import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";

import { getItem } from "./utilis/localStorageHelper";
import "./App.css";
import { PersistGate } from "redux-persist/integration/react";
import RouteContainer from "./Container/RouteContainer";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedStatus: "not-logged",
    };
  }

  render() {
    //console.log("token", getItem("token"));

    return (
      <div className="App">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <RouteContainer />
            </BrowserRouter>
          </PersistGate>
        </Provider>
      </div>
    );
  }
}

export default App;
