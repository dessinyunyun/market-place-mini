"use client";
import Image from "next/image";
import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/authContext";
import Link from "next/link";
const axios = require("axios");

export default function Home() {
  let { state, dispatch } = useContext(AuthContext);
  const [listBarang, setListBarang] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [pagination, setPagination] = useState(1);
  const [limit, setlimit] = useState(20);
  const router = useRouter();
  console.log(state);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth");
    }
  }, [state]);

  useEffect(() => {
    console.log("tes");
    const token = localStorage.getItem("token");
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.BASE_URL}barang/find-all?limit=${limit}&offset=${pagination}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const getBarang = async () => {
      try {
        await axios
          .request(config)
          .then((response) => {
            console.log(response.data);
            setListBarang(response.data.data);
          })
          .catch((error) => {
            console.log("Error:", error);
          });
      } catch (error) {
        console.log("Caught an exception:", error);
      }
    };

    getBarang();
  }, [pagination, refresh]);

  console.log(listBarang);
  console.log(pagination);

  const deleteBarang = async (id, namaBarang) => {
    const result = confirm(`Apakah Anda yakin ingin menghapus ${namaBarang}?`);
    if (result) {
      const token = localStorage.getItem("token");
      try {
        const config = {
          method: "delete",
          maxBodyLength: Infinity,
          url: `${process.env.BASE_URL}barang/delete/${id}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.request(config);
        alert("berhasil menghapus barang");
        setRefresh(!refresh);
        console.log(response.data);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24 px-10 w-full">
      <div className="relative overflow-x-auto w-full rounded-md bg-gray-50   shadow-lg">
        <h1 className="w-full header-table p-2 bg-blue-200 text-sky-700">Dashboard</h1>

        <div className="options p-2 py-3 flex justify-between w-full items-center">
          <p>Barang</p>
          <Link href={`/barang/tambahbarang/`}>
            <button className="bg-sky-700 py-1 px-3 rounded-md text-white">Tambah Barang</button>{" "}
          </Link>
        </div>

        <div className="table-container px-1">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 border">
                  No
                </th>
                <th scope="col" className="px-6 py-3 border">
                  Nama Barang
                </th>
                <th scope="col" className="px-6 py-3 border">
                  Stok
                </th>
                <th scope="col" className="px-6 py-3 border">
                  Harga
                </th>
                <th scope="col" className="px-6 py-3 border">
                  Nama Supplier
                </th>
                <th scope="col" className="px-6 py-3 border">
                  Alamat Supplier
                </th>
                <th scope="col" className="px-6 py-3 border">
                  No Telp Supplier
                </th>
                <th scope="col" className="px-6 py-3 border text-center">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="w-full text-xs">
              {listBarang.length > 0 ? (
                listBarang.map((barang, i) => (
                  <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 border">{i + 1}</td>
                    <td className="px-6 py-4 border">{barang.namaBarang}</td>
                    <td className="px-6 py-4 border">{barang.stok}</td>
                    <td className="px-6 py-4 border">{barang.harga}</td>
                    <td className="px-6 py-4 border"> {barang.supplier ? barang.supplier.namaSupplier : "-"}</td>
                    <td className="px-6 py-4 border"> {barang.supplier ? barang.supplier.alamat : "-"}</td>
                    <td className="px-6 py-4 border"> {barang.supplier ? barang.supplier.noTelp : "-"}</td>
                    <td className="px-6 py-4 border flex gap-0.5 justify-center">
                      <button className="bg-red-500 text-slate-200 p-2 rounded-md" onClick={() => deleteBarang(barang.id, barang.namaBarang)}>
                        Hapus
                      </button>
                      <Link href={`/barang/editbarang/${barang.id}`}>
                        <button className="bg-yellow-400 text-slate-700 p-2 rounded-md">Update</button>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className=" w-full text-center">
                  <td className="w-full py-10 text-sky-700 text-lg animate-pulse" colSpan={8}>
                    Loading ...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex items-center w-full justify-between border border-slate-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
              <a href="#" className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Previous
              </a>
              <a href="#" className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Next
              </a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
              <div>
                <nav className="isolate inline-flex -space-x-px rounded-md gap-1 shadow-sm" aria-label="Pagination">
                  <a
                    href="#"
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    onClick={(e) => {
                      e.preventDefault();
                      setPagination(pagination < 2 ? pagination : pagination - 1);
                    }}
                  >
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                    </svg>
                  </a>

                  <a
                    href="#"
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    onClick={(e) => {
                      e.preventDefault();
                      setPagination(pagination + 1);
                    }}
                  >
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
