import { useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let data = window.localStorage.getItem("cred");
  let credentials = JSON.parse(data);

  const handleSubmit = () => {
    if (credentials.email == email && credentials.password == password) {
      navigate("/home");
    } else {
      console.log("invalide credentials");
    }
  };

  return (
    <div className="loginContainer">
      <Header title="Login" />

      <div className="formContainer">
        <form className="formStyle">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="E-mail address"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
          />

          <input
            onClick={handleSubmit}
            type="button"
            value="Login"
            className="submitBtn"
          />
        </form>
        <Link to={"/"}>
          <p className="registerLoginLink">register</p>
        </Link>
      </div>
    </div>
  );
}

export default Login;
