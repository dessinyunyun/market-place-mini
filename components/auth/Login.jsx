import React, { useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/authContext";
const Login = ({ setAuthActive }) => {
  let { state, dispatch } = useContext(AuthContext);
  const router = useRouter();
  const [dataLogin, setDataLogin] = React.useState({
    username: "",
    password: "",
  });

  const submitLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.BASE_URL}auth/login`, JSON.stringify(dataLogin), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status == 200) {
        const token = response.data.data.token;
        const nama = response.data.data.profileName;
        alert("berhasil login");
        localStorage.setItem("token", token);
        localStorage.setItem("profilename", nama);
        const loggedInTime = new Date();
        localStorage.setItem("loggedTime", loggedInTime);

        dispatch({ type: "profile", data: response.data.data });

        router.push("/");
      }
      console.log(response);
    } catch (error) {
      alert("username/password salah");
      console.log(error);
    }
  };

  const handleLogim = (e) => {
    setDataLogin((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  return (
    <div className="bg-white h-3/7 w-2/5 shadow-xl rounded-lg overflow-hidden flex flex-col justify-between ">
      <div className="header-login bg-blue-200 text-blue-500 py-3 text-center w-full">
        <h1>Login</h1>
      </div>
      <div className="body-login text-slate-600 flex flex-col justify-center px-3 w-full items-center gap-2 mt-2">
        <div className="username w-full">
          <label htmlFor="username" className="block text-sm">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="enter username"
            className="appearance-none border border-slate-300 w-full py-2 px-3 text-slate-600 text-sm leading-tight focus:outline-none focus:border-blue-500 rounded-md"
            onChange={handleLogim}
          />
        </div>

        <div className="password w-full">
          <label htmlFor="password" className="block text-sm">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="enter password"
            className="appearance-none border border-slate-300 w-full py-2 px-3 text-slate-600 text-sm leading-tight focus:outline-none focus:border-blue-500 rounded-md"
            onChange={handleLogim}
          />
        </div>

        <button className="bg-blue-500 text-white font-light w-1/6 mt-3 text-sm rounded-md py-1.5" onClick={submitLogin}>
          Masuk
        </button>
      </div>
      <div className="footer-login pt-2 pb-3 text-sm text-center text-sky-500 underline" onClick={() => setAuthActive("register")}>
        <span className="cursor-pointer">belum punya akun</span>
      </div>
    </div>
  );
};

export default Login;
