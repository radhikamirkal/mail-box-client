import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Authactions } from "../Store/authSlics";
import { useDispatch } from "react-redux";
import "./Navbar.css";
import { toast, ToastContainer } from "react-toastify";
const Navbar = () => {
  const dispatch = useDispatch();

  const email = useSelector((store) => {
    return store.auth.email;
  });

  const token = useSelector((store) => {
    return store.auth.token;
  });

  const handleLogout = () => {
    dispatch(Authactions.logout());
    alert('Logout successfully')
  };

  return (
    <>
      <div className="Navbar">
        <h1>MaxMail</h1>
        <Link to={"/"}>Home</Link>
        {token && <Link to={"/mailbox"}>MailBox</Link>}
        {!token && <Link to={"/signUp"}>SignUp</Link>}
        {token ? (
          <button className="btns" style={{color:'red', cursor:'pointer'}} onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
        {email && <p>{email}</p>}
      </div>
     
    </>
  );
};

export default Navbar;
