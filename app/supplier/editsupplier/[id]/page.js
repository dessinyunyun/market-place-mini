"use client";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";

import Link from "next/link";

const EditSupplier = ({ setAuthActive }) => {
  const router = usePathname();
  const segments = router.split("/");

  const id = segments[segments.length - 1];
  console.log(id);

  const [supplierData, setsupplierData] = useState({
    namaSupplier: "",
    alamat: "",
    noTelp: "",
  });

  const handleChangeSupplierData = (e) => {
    setsupplierData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const submitEditSupplier = async () => {
    const token = localStorage.getItem("token");
    try {
      const config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `${process.env.BASE_URL}supplier/update/${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: JSON.stringify(supplierData), // Menggunakan data dari state supplierData
      };
      const response = await axios.request(config);
      alert("berhasil mengedit Supplier");
      console.log(response.data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    const getSupplier = async () => {
      const token = localStorage.getItem("token");
      try {
        const config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `${process.env.BASE_URL}supplier/find-by-id/${id}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.request(config);
        setsupplierData(response.data.data);
        console.log(response.data);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    getSupplier();
  }, []);
  console.log(supplierData);

  return (
    <div className="w-full flex justify-center items-center h-screen">
      <div className="bg-white h-3/7 w-3/5 shadow-xl rounded-lg overflow-hidden flex flex-col justify-between ">
        <div className="header-EditSupplier bg-blue-200 text-blue-500 py-3 text-start px-3 w-full">
          <h1>Edit Barang</h1>
        </div>
        <div className="body-EditSupplier text-slate-600 flex flex-col justify-center px-3 w-full items-center gap-2 my-4">
          <div className="namaSupplier w-full flex items-center gap-3">
            <label htmlFor="namaSupplier" className="block text-sm w-1/3">
              Nama Supplier
            </label>
            <input
              type="text"
              id="namaSupplier"
              name="namaSupplier"
              value={supplierData?.namaSupplier}
              placeholder="enter Nama Supplier"
              className="appearance-none border border-slate-300 w-full py-2 px-3 text-slate-600 text-sm leading-tight focus:outline-none focus:border-blue-500 rounded-md"
              onChange={handleChangeSupplierData}
            />
          </div>
          <div className="alamat w-full flex items-center gap-3">
            <label htmlFor="alamat" className="block text-sm w-1/3">
              Alamat Supplier
            </label>
            <input
              type="text"
              id="alamat"
              value={supplierData?.alamat}
              name="alamat"
              placeholder="enter   Alamat Supplier"
              className="appearance-none border border-slate-300 w-full py-2 px-3 text-slate-600 text-sm leading-tight focus:outline-none focus:border-blue-500 rounded-md"
              onChange={handleChangeSupplierData}
            />
          </div>
          <div className="noTelp w-full flex items-center gap-3">
            <label htmlFor="noTelp" className="block text-sm w-1/3">
              No Telp Supplier
            </label>
            <input
              type="text"
              id="noTelp"
              name="noTelp"
              value={supplierData?.noTelp}
              placeholder="enter No Telp Supplier"
              className="appearance-none border border-slate-300 w-full py-2 px-3 text-slate-600 text-sm leading-tight focus:outline-none focus:border-blue-500 rounded-md"
              onChange={handleChangeSupplierData}
            />
          </div>

          <div class="button-option w-full flex justify-between pt-2 border-t">
            <button className="bg-slate-500 text-white font-light w-1/6 mt-3 text-sm rounded-md py-1.5 px-2">
              <Link href={"/supplier"}>Kembali</Link>
            </button>
            <button className="bg-blue-500 text-white font-light w-1/6 mt-3 text-sm rounded-md py-1.5 px-2" onClick={submitEditSupplier}>
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSupplier;
