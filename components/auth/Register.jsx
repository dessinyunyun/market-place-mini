import React from "react";
import axios from "axios";

const Register = ({ setAuthActive }) => {
  const [dataRegister, setDataRegister] = React.useState({
    profileName: "",
    username: "",
    password: "",
  });

  const submitRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.BASE_URL}auth/register`, JSON.stringify(dataRegister), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.message == "REGISTER SUCCESSFUL") {
        alert("Berhasil Register! Silahkan Login");
        setAuthActive("login");
      } else {
        alert("username is registered. change username");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(dataRegister);

  const handleRegister = (e) => {
    setDataRegister((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  return (
    <div className="bg-white h-3/7 w-2/5 shadow-xl rounded-lg overflow-hidden flex flex-col justify-between ">
      <div className="header-login bg-blue-200 text-blue-500 py-3 text-center w-full">
        <h1>Register</h1>
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
            onChange={handleRegister}
          />
        </div>
        <div className="profile-name w-full">
          <label htmlFor="profileName" className="block text-sm">
            Profile Name
          </label>
          <input
            type="text"
            id="profileName"
            name="profileName"
            placeholder="enter profile name"
            className="appearance-none border border-slate-300 w-full py-2 px-3 text-slate-600 text-sm leading-tight focus:outline-none focus:border-blue-500 rounded-md"
            onChange={handleRegister}
          />
        </div>
        <div className="password w-full">
          <label htmlFor="password" className="block text-sm">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="enter password"
            className="appearance-none border border-slate-300 w-full py-2 px-3 text-slate-600 text-sm leading-tight focus:outline-none focus:border-blue-500 rounded-md"
            onChange={handleRegister}
          />
        </div>

        <button className="bg-blue-500 text-white font-light w-1/6 mt-3 text-sm rounded-md py-1.5" onClick={submitRegister}>
          Daftar
        </button>
      </div>
      <div className="footer-login pt-2 pb-3 text-sm text-center text-sky-500 underline" onClick={() => setAuthActive("login")}>
        <span className="cursor-pointer">sudah punya akun</span>
      </div>
    </div>
  );
};

export default Register;
