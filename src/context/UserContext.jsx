import React, { createContext, useEffect, useState } from "react";
import { ApiClient } from "../api-client";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("awesomeTasksToken"));

  useEffect(() => {
    const fetchUser = async () => {
      const response = await ApiClient.fetchUser(token);
      if (!response.ok) {
        setToken(null);
      }
      localStorage.setItem("awesomeTasksToken", token);
    };
    fetchUser();
  }, [token]);

  return (
    <UserContext.Provider value={[token, setToken]}>
      {props.children}
    </UserContext.Provider>
  );
};
