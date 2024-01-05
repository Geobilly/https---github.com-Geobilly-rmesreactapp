import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import ReportTable from "./ReportTable";
// import TasksTable from "./TasksTable"; // Import the new component
import ReportForm from "./ReportForm";
import Login from "./Login";
import Client from "./Client";
import Message from "./Message";
import CanteenFees from "./CanteenFees";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Checkout from "./Checkout";
import Review from "./Review";

import SubmitTask from "./SubmitTask";
// import Dashboard from "./Dashboard"; // or '../path/to/Dashboard'
import ResponsiveDrawer from "./ResponsiveDrawer"; // Update the path based on your project structure
import TaskTable from "./TaskTable";
import ReportGrid from "./ReportGrid";
import ChartPie from "./ChartPie";
import { getStoredUsername } from "./authUtils"; // Adjust the import path

function App() {
  const [loggedInUsername, setLoggedInUsername] = useState(getStoredUsername());

  const handleLogin = (username) => {
    setLoggedInUsername(username);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        {/* <Route path="/report-table" element={<ReportTable />} /> */}

        {/* Pass the loggedInUsername prop to the TasksTable component */}
        {/* <Route
          path="/tasks-table"
          element={<TasksTable loggedInUsername={loggedInUsername} />}
        /> */}

        <Route path="/submit-report" element={<ReportForm />} />
        <Route path="/submit-task" element={<SubmitTask />} />
        {/* <Route path="/dash" element={<Dashboard />} /> */}
        <Route path="/drawer" element={<ResponsiveDrawer />} />
        <Route path="/tasktt" element={<TaskTable />} />
        <Route path="/report" element={<ReportGrid />} />
        <Route path="/pie" element={<ChartPie />} />
        <Route path="/client" element={<Client />} />
        <Route path="/message" element={<Message />} />
        <Route path="/canteen" element={<CanteenFees />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}

export default App;
