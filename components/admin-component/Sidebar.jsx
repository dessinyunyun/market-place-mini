"use client";
import React, { useEffect, useContext, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthContext } from "@/context/authContext";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import moment from "moment";
import { BsCircleFill } from "react-icons/bs";
import Image from "next/image";
import OnlineTime from "./OnlineTime";
import { useRouter } from "next/navigation";
const Sidebar = ({ children, showSidebar }) => {
  let { state, dispatch } = useContext(AuthContext);
  const router = usePathname();
  const routerPush = useRouter();
  const currentDate = new Date();
  const [name, setName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("profilename");
    setName(name);
    console.log(name);
  }, []);
  const loggedTime = localStorage.getItem("loggedTime");

  const logout = () => {
    const result = confirm(`Apakah Anda yakin ingin keluar`);
    if (result) {
      localStorage.clear();
      dispatch({ action: "refresh" });
      routerPush.push("/auth");
    }
  };
  return (
    <div className="flex">
      <div className={`left-3 ${showSidebar ? "w-60 translate-x-4 visible " : "-translate-x-20 w-0 invisible"} flex gap-1.5 transition-all ease-linear duration-300 h-1/2 top-1/2 translate-y-1/4   flex-col justify-between `}>
        <div className="flex flex-col items-center bg-white w-full rounded-lg shadow-md">
          <div className="profile p-4 px-10">
            <Link href="/">
              <RiAccountPinCircleFill size={75} className="text-blue-400" />
            </Link>
          </div>
          <div className="footer-profile w-full bg-blue-200 h-10 flex justify-center items-center text-sky-700">{name}</div>
        </div>
        <div className="flex flex-col items-center bg-white rounded-lg overflow-hidden shadow-md">
          <div className="footer-profile w-full bg-blue-200 h-10 text-center text-sky-700 flex items-center justify-center">Menu</div>
          <div className={`${router == "/" ? "bg-sky-700 text-white" : "bg-slate-50  text-slate-900 "} hover:bg-primary  cursor-pointer font-light w-full py-2 px-2 inline-block text-sm`}>
            <Link href="/">Barang</Link>
          </div>
          <div className={`${router == "/supplier" ? "bg-sky-700 text-white" : "bg-slate-50  text-slate-900 "}  hover:bg-primarycursor-pointer font-normal w-full py-2 px-2 inline-block text-sm`}>
            <Link href="/supplier">Supplier</Link>
          </div>
        </div>
        <div className="flex flex-col items-center bg-white rounded-lg overflow-hidden shadow-md">
          <div className="footer-profile w-full bg-blue-200 h-10 text-center text-sky-700 flex items-center justify-center">
            Online <BsCircleFill className="ml-1 text-green-600" size={13} />
          </div>
          <div className={`bg-slate-50 hover:bg-primary text-slate-900 cursor-pointer font-normal w-full py-2.5 px-3 inline-block text-xs`}>
            <p>Hari Online :{moment(currentDate).format("YY-MM-DD")}</p>
            <p>
              <OnlineTime loggedTime={loggedTime} />
            </p>
          </div>
          <button className="text-red-500 bg-slate-300 w-full mt-5 px-3 py-1 rounded-lg flex justify-center items-center">
            <span className="flex gap-1 items-center" onClick={logout}>
              <FiLogOut size={30} /> Logout
            </span>
          </button>
        </div>
      </div>
      <main className="transition-all ease-linear duration-300 w-full">{children}</main>
    </div>
  );
};

export default Sidebar;
