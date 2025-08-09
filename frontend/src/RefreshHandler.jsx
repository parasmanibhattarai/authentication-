
import {  useEffect } from "react";
import { useLocation,useNavigate } from 'react-router-dom';

function RefreshHandler({setIsAuthenticated}) {
const location = useLocation();
const navigate = useNavigate();

useEffect (() => {

    if (localStorage.getItem("token")) {
      // If token exists, set authenticated to true
      setIsAuthenticated(true);
      if(location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/") {
        // If the user is on login or register page, redirect to home
        navigate("/home", { replace: false });
      }
    }
},[location.pathname, setIsAuthenticated])
 
return(null)

}

export default RefreshHandler