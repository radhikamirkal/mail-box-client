import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { Authactions } from "../../Store/authSlics";
const Login = () => {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailLength = email.current.value.trim();
    const passLength = password.current.value.trim();
    const obj = {
      email: emailLength,
      password: passLength,
      returnSecureToken: true,
    };
    if (emailLength.length === 0 || passLength.length === 0) {
      alert('Fill all fields')
      return;
    } else {
      try {
        setLoading(true);
        let res = await axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key= AIzaSyCdORkp1dsGc6FajuLGDNimk9pTqyronlQ",
          obj
        );
        dispatch(
          Authactions.login({ token: res.data.idToken, email: res.data.email })
        );
        alert('Login successfully')
        navigate("/");
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("error:", error);
      }
    }
  };


  return (
    <>
      <form>
        <h1>Login</h1>
        <input ref={email} type="text" placeholder="Enter Your Email" />
        <input
          ref={password}
          type="password"
          placeholder="Enter Your Password"
        />
        <input onClick={handleSubmit} type="submit" value="Login" />
      </form>
      <div style={{ fontSize: "22px" }}>
        Don't have an account? <Link to={"/signup"}>Sign Up</Link>
      </div>
    </>
  );
};

export default Login;
