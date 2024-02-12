import { useState } from "react";
import Header from "../components/Header";
import "./pages.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [Username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [empty, setEmpty] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      Username.length > 3 &&
      password.length > 3 &&
      confirmPassword.length > 3 &&
      email.length>0
    ) {
      if (password == confirmPassword) {
        let details = {
          email: email,
          password: password,
        };

        window.localStorage.setItem("cred", JSON.stringify(details));
        navigate("/login");
      }
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  };

  return (
    <div className="registerContainer">
      <Header title="Register" logout={false} />

      <div className="formContainer">
        <form className="formStyle">
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={Username}
            type="text"
            placeholder="Username"
            required
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            required
          />
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            type="password"
            placeholder="Confirm password"
            required
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="E-mail address"
            required
          />
          {empty ? (
            ""
          ) : (
            <p className="error">all fields are required</p>
          )}

          <input
            onClick={handleSubmit}
            type="submit"
            value="Register"
            className="submitBtn"
          />
        </form>
        <Link to={"/login"}>
          <p className="registerLoginLink">login</p>
        </Link>
      </div>
    </div>
  );
}

export default Register;
