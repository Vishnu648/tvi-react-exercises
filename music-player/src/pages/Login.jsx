import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="loginContainer">
      <Header title="Login" />

      <div className="formContainer">
        <form className="formStyle">
          <input type="email" placeholder="E-mail" />
          <input type="password" placeholder="Password" />

          <input type="button" value="Login" className="submitBtn" />
        </form>
        <Link to={"/register"}>
          <p className="registerLoginLink">register</p>
        </Link>
      </div>
    </div>
  );
}

export default Login;
