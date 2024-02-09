import { useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Google from "./Google";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const [empty, setEmpty] = useState(true)

  let data = window.localStorage.getItem("cred");
  let credentials = JSON.parse(data);

  const handleSubmit = () => {
    if (email.length > 0 && password.length > 0) {
      if (credentials.email == email && credentials.password == password) {
        navigate("/home");
      } else {
      setEmpty(true)
      setErr(true);
      }
    }else{
      setEmpty(false)
    }
  };

  return (
    <div className="loginContainer">
      <Header title="Login" logout={false} />

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
          {!err ? (
            ""
          ) : (
            <p className='error'>email and password didn't match</p>
          )}
          {empty ? (
            ""
          ) : (
            <p className='error'>please type in email and password</p>
          )}
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

      {/* <Google/> */}
    </div>
  );
}

export default Login;
