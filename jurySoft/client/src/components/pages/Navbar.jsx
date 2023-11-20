import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
// import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import Swal from "sweetalert2";
import { useEffect } from "react";
import { useState } from "react";
import { Alert } from "@mui/material";

export default function Navbar(props) {
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const location = useLocation();

  const handleName = () => {
    localStorage.setItem("role", "please login");
    navigate("/");
  };

  const popUp = () => {
    const timer = setTimeout(() => {
      setShowAlert(false); // Close the alert after 2 seconds
    }, 3000); // Set the duration to 2 seconds (2000 milliseconds)

    return () => {
      clearTimeout(timer); // Clear the timer when the component unmounts (optional)
    };
  };

  const handleSuperAdmin = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/protected/superAdmin",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("schbhsc", response);
      setMessage(response.data.message);
      popUp();
      setShowAlert(true);
    } catch (error) {
      // console.error("SuperAdminerror", error.response.status);

      if (error.response.status === 403) {
        setMessage("Access denied!");
        popUp();
        setShowAlert(true);
      }
    }
  };

  const handleAdmin = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/protected/admin",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("response", response.data.message);

      popUp();
      setShowAlert(true);

      setMessage(response.data.message);
    } catch (error) {
      // console.error('Admin error:', error);
      // setMessage("Access denied!");
      if (error.response.status === 403) {
        setMessage("Access denied!");
        popUp();
        setShowAlert(true);
      }
    }
  };

  const handleExecutive = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/protected/executive",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessage(response.data.message);

      popUp();
      setShowAlert(true);

      setMessage(response.data.message);
    } catch (error) {
      if (error.response.status === 403) {
        setMessage("Access denied!");
        popUp();
        setShowAlert(true);
      }
    }
  };

  return (
    <div>
      {/* style={{backgroundColor:"#EF4E29"}} */}
      <div className="navbar bg-neutral">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-base-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            ></ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl text-base-200">
            {/* {localStorage.getItem("role")} */}
            {console.log("CurrentLocation:", location.pathname)}

            {location.pathname == "/"
              ? "please login"
              : localStorage.getItem("role")}
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          {location.pathname == "/" || location.pathname == "/signIn"   ? (
            ""
          ) : (
            <ul className="menu menu-horizontal px-1">
              <li>
                <a className="text-base-200" onClick={handleSuperAdmin}>
                  Access SuperAdmin
                </a>
              </li>

              <li>
                <a className="text-base-200" onClick={handleAdmin}>
                  Access Admin
                </a>
              </li>

              <li>
                <a className="text-base-200" onClick={handleExecutive}>
                  Access Executive
                </a>
              </li>
            </ul>
          )}

          {/* {localStorage.getItem("role") == "please login" ? (
           ""
          ) : (
            ""
          )} */}
        </div>
        <div className="navbar-end">
          {/* <a className="btn">Button</a> */}

          <ul className="menu menu-horizontal px-1">
            <li>
              <a className="text-base-200">Home</a>
            </li>
            <li>
              <a className="text-base-200" onClick={() => handleName()}>
                Login
              </a>
            </li>
          </ul>
        </div>
      </div>
      {showAlert && (
        <Alert
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            zIndex: 999,
          }}
          severity="info"
          onClose={() => setShowAlert(false)}
        >
          {message}
        </Alert>
      )}
    </div>
  );
}
