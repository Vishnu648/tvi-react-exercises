import { useState,useEffect } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const [empty, setEmpty] = useState(true)

  const [jwtData, setJwtData] = useState({});

  const handleCallbackResponse = (response) => {
    const token = response.credential;
    const decoded = jwtDecode(token);
    setJwtData(decoded);
    window.localStorage.setItem('googleAuth',JSON.stringify(decoded))
    navigate('/home')
  };
  
  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "385029428488-50ed9bvmeatkut4i9kpppi2o5ocq2apb.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("googleBtn"), {
      theme: "outlined",
      size: "large",
    });
    google.accounts.id.prompt();
  }, []);

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
      <div id="googleBtn"></div>
    </div>
  );
}

export default Login;
