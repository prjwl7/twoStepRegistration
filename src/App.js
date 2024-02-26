// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Step1Form from "./components/Step1Form.tsx";
import Step2Form from "./components/Step2Form.tsx";
import { Provider } from "react-redux";
import store from './store.ts'
import UserTable from "./UserTable.js";
import UserTableStep2 from "./UserTable2.js";


const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Step1Form />} />
          <Route path="/step2" element={<Step2Form />} />
        </Routes>
        <UserTable />
        <UserTableStep2 />
      </Router>
    </Provider>
  );
};

export default App;
