"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "./admin-component/Sidebar";

const Navbar = ({ setShowSidebar, showSidebar }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [userLogin, setUserLogin] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="bg-blue-200 text-sky-700 fixed z-10 w-full top-0">
      <nav className="container mx-auto flex justify-between items-center py-4 px-8">
        <Link href="/" className="text-xl font-bold uppercase">
          marketplace
        </Link>

        <div className="relative cursor-pointer">
          <div className={`hamburger-icon bg-white/10 flex flex-col justify-center items-center border border-slate-500/10 shadow-md p-2 ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
            <div className="bar w-6 h-0.5 bg-slate-500 mb-1 transition-transform duration-300 transform origin-center"></div>
            <div className="bar w-6 h-0.5 bg-slate-500 mb-1 transition-transform duration-300 transform origin-center"></div>
            <div className="bar w-6 h-0.5 bg-slate-500 mb-0 transition-transform duration-300 transform origin-center"></div>
          </div>

          {/* <div style={{ top: "60px" }} className={`fixed left-0 h-full  text-white w-36 p-4 transition-transform block duration-300 transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
            <Sidebar />
          </div> */}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
