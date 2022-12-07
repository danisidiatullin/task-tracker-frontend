import React, { useContext, useState } from "react";

import ErrorMessage from "./ErrorMessage";
import { UserContext } from "../context/UserContext";
import { ApiClient, errorMessage } from "../api-client";
import FormField from "./FormField";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [, setToken] = useContext(UserContext);

  const submitLogin = async () => {
    const token = await ApiClient.submitLogin({
      email: email,
      password: password,
    });

    if (token.access_token) {
      setToken(token.access_token);
    } else {
      setErrorMessage(token.error);
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
