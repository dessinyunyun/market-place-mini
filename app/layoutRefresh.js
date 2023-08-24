import React, { useEffect, createContext, useContext, useState } from "react";
import Sidebar from "@/components/admin-component/Sidebar";
import Navbar from "@/components/Navbar";
import { AuthContextProvider, AuthContext } from "@/context/authContext";
import { useRouter } from "next/navigation";

const LayoutRefresh = ({ children }) => {
  let { state, dispatch } = useContext(AuthContext);
  const [userLogin, setUserLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");

      console.log(state);
      console.log(token);
      if (token) {
        setUserLogin(true);
      } else {
        setUserLogin(false);
        router.push("/auth");
      }
    };

    // Inisialisasi
    handleStorageChange();

    // Tambahkan event listener untuk memantau perubahan di localStorage
    window.addEventListener("storage", handleStorageChange);

    // Cleanup pada unmount atau perubahan komponen yang menyebabkan
    // LayoutUseClient di-unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [state]);

  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <>
      {userLogin ? (
        <>
          <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
          <Sidebar showSidebar={showSidebar}>{children}</Sidebar>
        </>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default LayoutRefresh;
