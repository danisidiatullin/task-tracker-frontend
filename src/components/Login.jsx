import React, { useContext, useState } from "react";

import ErrorMessage from "./ErrorMessage";
import { UserContext } from "../context/UserContext";
import { ApiClient } from "../api-client";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [, setToken] = useContext(UserContext);

  const submitLogin = async () => {
    const response = await ApiClient.submitLogin({
      email: email,
      password: password,
    });
    const data = await response.json();

    if (!response.ok) {
      setErrorMessage(data.detail);
    } else {
      setToken(data.access_token);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitLogin();
  };

  return (
    <div className="column">
      <form className="box" onSubmit={handleSubmit}>
        <h1 className="title has-text-centered">Login</h1>

        <div className="field">
          <label className="label">Email Address</label>
          <div className="control">
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required=""
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required=""
            />
          </div>
        </div>

        <ErrorMessage message={errorMessage} />
        <br />
        <button className="button is-primary" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
