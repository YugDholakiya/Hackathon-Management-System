import React, { useState, useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { setRole } from "../../redux/actions/RegisterLoginActions";
import { generalThunkFunction } from "../../redux/actions/Genralactions";

function Layout() {
  const [userDetails, setUserDetails] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const [role, setrole] = useState("");
  const [roleDetails, setRoleDetails] = useState([]);

  const loginState = useSelector((state) => state.registerLoginReducer);
  const generalState = useSelector((state) => state.generalReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUserDetails =
      JSON.parse(localStorage.getItem("userDetails")) || {};
      dispatch(
        setRole(
          storedUserDetails.roleDetails,
          storedUserDetails.role,
          storedUserDetails.isAuth
        )
      );
      
    dispatch(generalThunkFunction("getAllParticipants"));
    dispatch(generalThunkFunction("getAllHosts"));
    dispatch(generalThunkFunction("getAllHackathons"));
    dispatch(generalThunkFunction("getAllHackathonsApplications"));
  }, []);

  useEffect(() => {
    setUserDetails( loginState);
    setIsAuth(true);
    setRole(loginState.role);
    setRoleDetails(loginState.roleDetails);

    console.log(userDetails)
  }, [loginState]);

  console.log(loginState);
  return (
    <div>
      <Navbar role={role} isAuth={isAuth} />
      <Outlet />
      <Footer id="footer" />
    </div>
  );
}

export default Layout;
