import { NavLink } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { isAuth } = useSelector((state) => state.auth);
  return (
    <nav className="bg-white shadow shadow-md z-10">
      <div className="max-w-full px-10 text-md">
        <div className="flex justify-between items-center h-16">
          {/* Left Side - Home Link */}
          <div>
            <NavLink to="/">
              <span className="text-xl font-bold text-gray-800">MIT Clubs</span>
            </NavLink>
          </div>

          {/* Right Side - Authenticated Links or Login/Register */}
          <div className="flex items-center space-x-10">
            {isAuth ? (
              <>
                <NavLink
                  to="/saved-clubs"
                  className={({ isActive }) =>
                    `text-gray-700 hover:text-gray-900 ${
                      isActive ? "font-semibold" : ""
                    }`
                  }
                >
                  Saved
                </NavLink>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `text-gray-700 hover:text-gray-900 ${
                      isActive ? "font-semibold" : ""
                    }`
                  }
                >
                  Dashboard
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `text-gray-700 hover:text-gray-900 ${
                      isActive ? "font-semibold" : ""
                    }`
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `text-gray-700 hover:text-gray-900 ${
                      isActive ? "font-semibold" : ""
                    }`
                  }
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
