import React, { useContext, useState } from "react";
import { ApiClient } from "../api-client";

import { UserContext } from "../context/UserContext";
import ErrorMessage from "./ErrorMessage";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [, setToken] = useContext(UserContext);

  const submitRegistration = async () => {
    const token = await ApiClient.submitRegistration({
      email: email,
      hashed_password: password,
    });

    if (token.access_token) {
      setToken(token.access_token);
    } else {
      setErrorMessage(token.error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmationPassword && password.length > 4) {
      submitRegistration();
    } else {
      setErrorMessage(
        "Ensure that the passwords match and greater than 4 characters"
      );
    }
  };

  return (
    <div className="column">
      <form className="box" onSubmit={handleSubmit}>
        <h1 className="title has-text-centered">Register</h1>

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

        <div className="field">
          <label className="label">Confirm Password</label>
          <div className="control">
            <input
              type="password"
              placeholder="Enter password"
              value={confirmationPassword}
              onChange={(e) => setConfirmationPassword(e.target.value)}
              className="input"
              required=""
            />
          </div>
        </div>

        <ErrorMessage message={errorMessage} />

        <br />

        <button className="button is-primary" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
