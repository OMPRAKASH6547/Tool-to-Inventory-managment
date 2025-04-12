import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './components/Dashboard'
import ToolsInventory from "./components/ToolsInventory";
import MachenicsPanal from "./components/MachenicsPanal";
import UpdateInventory from "./pages/UpdateInventory";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/adminDashboard" element={<Dashboard />} />
            <Route path="/userDashboard" element={< MachenicsPanal />} />
            <Route path="/addTools" element={<ToolsInventory />} />
            <Route path="/update/:id" element={<UpdateInventory />} />



          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
