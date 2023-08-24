"use client";
import React from "react";

import { AuthContextProvider } from "@/context/authContext";
import LayoutRefresh from "./layoutRefresh";

const LayoutUseClient = ({ children }) => {
  return (
    <AuthContextProvider>
      <LayoutRefresh>{children}</LayoutRefresh>
    </AuthContextProvider>
  );
};

export default LayoutUseClient;
