"use client";
import React, { Dispatch, createContext, useReducer } from "react";

const initialState = {
  refresh: true,
  token: "",
  id: 0,
  profileName: "",
  username: "",
};
// export const modeContext = createContext(null);
const reducer = (state, action) => {
  console.log(state);
  console.log(action);
  switch (action.type) {
    case "refresh":
      return {
        ...state,
        refresh: true,
      };
    case "profilename":
      return {
        ...state,
        profileName: action.data.profileName,
      };
    case "profile":
      return {
        ...state,
        token: action.data.token,
        id: action.data.id,
        profileName: action.data.profileName,
        username: action.data.username,
      };
  }
};

export const AuthContext = createContext({ state: initialState, dispatch: () => null });
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};
