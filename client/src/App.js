import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import Home from "./pages/Home.js";
import Dashboard from "./pages/Dashboard.js";
import Register from "./pages/Register.js";
import Login from "./pages/Login.js";
import ClubDetails from "./pages/ClubDetails.js"; // Import the ClubDetails component
import { useSelector } from "react-redux";

import React from "react";
import './index.css';

function App() {
  const PrivateRoutes = () => {
    const { isAuth } = useSelector((state) => state.auth);
    // check if user is authenticated. if so, render outlet (content for the page)
    return <>{isAuth ? <Outlet /> : <Navigate to="/login" />}</>;
  };

  const RestrictedRoutes = () => {
    const { isAuth } = useSelector((state) => state.auth);

    return <>{!isAuth ? <Outlet /> : <Navigate to="/dashboard" />}</>;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Home route */}
        <Route path="/" element={<Home />} />

        {/* Private routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Restricted routes */}
        <Route element={<RestrictedRoutes />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Club details route */}
        <Route path="/clubs/:id" element={<ClubDetails />} /> {/* New Route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
