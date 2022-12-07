import React, { useContext, useState } from "react";
import { ApiClient } from "../api-client";

import { UserContext } from "../context/UserContext";
import ErrorMessage from "./ErrorMessage";
import FormField from "./FormField";

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

        <FormField
          label="Email Address"
          type="email"
          value={email}
          f={setEmail}
        />

        <FormField
          label="Password"
          type="password"
          value={password}
          f={setPassword}
        />

        <FormField
          label="Confirm Password"
          type="password"
          value={confirmationPassword}
          f={setConfirmationPassword}
        />

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
