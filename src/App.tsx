import React from 'react';
import './App.css';
import Reminders from "./components/reminders/reminders";
import {setupStore} from "./store/store";
import {Provider} from "react-redux";

function App() {
    const store = setupStore();
  return (
      <>
          <Provider store={store}>
              <Reminders/>
          </Provider>
      </>
  );
}

export default App;
