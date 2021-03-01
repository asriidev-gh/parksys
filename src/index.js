import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";

import { Provider } from "react-redux";
import store from "./redux/store";

// Libraries that kept the state even the browser refresh
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/lib/integration/react";

// Libraries that kept the state even the browser refresh
const persistor = persistStore(store)

ReactDOM.render( 
  <Provider store={store}>
    <PersistGate
      loading={<div>Loading..</div>}
      persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,  
  document.getElementById("root")
);
