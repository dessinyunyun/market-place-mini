"use client";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/authContext";
import Link from "next/link";
const Login = ({ setAuthActive }) => {
  let { state, dispatch } = useContext(AuthContext);
  const router = useRouter();
  const [barangData, setBarangData] = useState({
    harga: 0,
    id: 0,
    namaBarang: "",
    stok: 0,
    supplier: {
      namaSupplier: "",
    },
  });

  const handleInputChangeBarang = (e) => {
    setBarangData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleInputChangeSupplier = (e) => {
    setBarangData((prevData) => ({
      ...prevData,
      supplier: {
        ...prevData.supplier,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const submitBarang = async () => {
    const token = localStorage.getItem("token");
    try {
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.BASE_URL}barang/create`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: JSON.stringify(barangData), // Menggunakan data dari state barangData
      };
      const response = await axios.request(config);
      alert("berhasil menambah barang");
      console.log(response.data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  console.log(barangData);

  return (
    <div className="w-full flex justify-center items-center h-screen">
      <div className="bg-white h-3/7 w-2/5 shadow-xl rounded-lg overflow-hidden flex flex-col justify-between ">
        <div className="header-login bg-blue-200 text-blue-500 py-3 text-start px-3 w-full">
          <h1>Tambah Barang</h1>
        </div>
        <div className="body-login text-slate-600 flex flex-col justify-center px-3 w-full items-center gap-2 my-4">
          <div className="namaBarang w-full flex items-center gap-3">
            <label htmlFor="namaBarang" className="block text-sm w-1/3">
              Nama Barang
            </label>
            <input
              type="text"
              id="namaBarang"
              name="namaBarang"
              placeholder="enter Nama Barang"
              className="appearance-none border border-slate-300 w-full py-2 px-3 text-slate-600 text-sm leading-tight focus:outline-none focus:border-blue-500 rounded-md"
              onChange={handleInputChangeBarang}
            />
          </div>
          <div className="harga w-full flex items-center gap-3">
            <label htmlFor="harga" className="block text-sm w-1/3">
              Harga Barang
            </label>
            <input
              type="text"
              id="harga"
              name="harga"
              placeholder="enter Harga Barang"
              className="appearance-none border border-slate-300 w-full py-2 px-3 text-slate-600 text-sm leading-tight focus:outline-none focus:border-blue-500 rounded-md"
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Menghapus karakter selain angka
                handleInputChangeBarang(e);
              }}
            />
          </div>
          <div className="stok w-full flex items-center gap-3">
            <label htmlFor="stok" className="block text-sm w-1/3">
              Stok Barang
            </label>
            <input
              type="text"
              id="stok"
              name="stok"
              placeholder="enter Stok Barang"
              className="appearance-none border border-slate-300 w-full py-2 px-3 text-slate-600 text-sm leading-tight focus:outline-none focus:border-blue-500 rounded-md"
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Menghapus karakter selain angka
                handleInputChangeBarang(e);
              }}
            />
          </div>
          <div className="namaSupplier w-full flex items-center gap-3">
            <label htmlFor="namaSupplier" className="block text-sm w-1/3">
              Supplier Barang
            </label>
            <input
              type="text"
              id="namaSupplier"
              name="namaSupplier"
              placeholder="enter nama supplier Barang"
              className="appearance-none border border-slate-300 w-full py-2 px-3 text-slate-600 text-sm leading-tight focus:outline-none focus:border-blue-500 rounded-md"
              onChange={handleInputChangeSupplier}
            />
          </div>

          <div class="button-option w-full flex justify-between pt-2 border-t">
            <button className="bg-slate-500 text-white font-light w-1/6 mt-3 text-sm rounded-md py-1.5 px-2">
              <Link href={"/"}>Kembali</Link>
            </button>
            <button className="bg-blue-500 text-white font-light w-1/6 mt-3 text-sm rounded-md py-1.5 px-2" onClick={submitBarang}>
              Tambah
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
