import React, { useContext, useEffect, useState } from "react";
import Register from "./components/Register";
import Header from "./components/Header";
import { UserContext } from "./context/UserContext";
import Login from "./components/Login";
import Table from "./components/Table";
import { ApiClient } from "./api-client";

const App = () => {
  const [message, setMessage] = useState("");
  const [token] = useContext(UserContext);

  const getTitle = async () => {
    const title = await ApiClient.getTitle();
    setMessage(title);
  };
  useEffect(() => {
    getTitle();
  }, []);

  return (
    <>
      <Header title={message} />
      <div className="columns">
        <div className="column"></div>
        <div className="column m-5 is-two-thirds">
          {!token ? (
            <div className="columns">
              <Register /> <Login />
            </div>
          ) : (
            <Table />
          )}
        </div>
        <div className="column"></div>
      </div>
    </>
  );
};

export default App;
