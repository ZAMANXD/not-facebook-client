import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useHistory } from "react-router";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useState } from "react";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();
  

  const [user, setUser] = useState({});

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT ID Token: " + response.credential);
    let userObject = jwtDecode(response.credential);
    setUser(userObject);
     history.push("/home");
  }

  useEffect(()=>{
    /* global google */
    // eslint-disable-next-line no-unused-expressions
    google.accounts.id.initialize({
      client_id: "1031240701134-23r5alage2037jq5etfidh4qc5qtf2nc.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: "outline", size: "large"}
    );

  }, [])

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">NotFacebook</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on NotFacebook.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <button className="loginRegisterButton">Log into Account</button>
          </form>
          <div className="google-sign-in">
            <h3>Or continue with</h3>
            <div id="signInDiv">Google</div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
