"use client";
import React, { useState, useEffect } from "react";
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import { useRouter } from "next/navigation";
const Auth = ({ userLogin }) => {
  console.log(userLogin);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  }, [router]);
  const [authActive, setAuthActive] = useState("login");
  return <div className="h-screen flex justify-center items-center">{authActive == "login" ? <Login setAuthActive={setAuthActive} /> : <Register setAuthActive={setAuthActive} />}</div>;
};

export default Auth;
