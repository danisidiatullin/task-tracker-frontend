import React, { createContext, useEffect, useState } from "react";
import { ApiClient } from "../api-client";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("awesomeTasksToken"));

  useEffect(() => {
    const fetchUser = async () => {
      const token_ = await ApiClient.fetchUser(token);
      if (!token_) {
        setToken(null);
      }
      localStorage.setItem("awesomeTasksToken", token_);
    };
    fetchUser();
  }, [token]);

  return (
    <UserContext.Provider value={[token, setToken]}>
      {props.children}
    </UserContext.Provider>
  );
};
