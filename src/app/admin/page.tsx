// src/app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { FaLeaf } from "react-icons/fa";

export default function Admin() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found, redirecting to login");
      router.push("/login");
    } else {
      setLoading(true);
      // Simulasi pengecekan token
      setLoading(false);
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(""); // Reset pesan error

    const { error } = await supabase
      .from("posts")
      .insert([{ title, content, author }]);
    if (error) {
      setErrorMessage(error.message);
    } else {
      alert("Tulisan berhasil ditambahkan");
      setTitle("");
      setContent("");
      setAuthor("");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-green-800 mb-6">
        Tambah Tulisan
      </h1>
      {errorMessage && (
        <p className="text-red-500 text-center mb-4">{errorMessage}</p>
      )}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-8"
      >
        <div className="mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Judul"
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="mb-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Konten"
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            rows={5}
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="nama penulis"
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 transition-colors"
        >
          Simpan
        </button>
      </form>
      <div className="mt-10 text-center">
        <FaLeaf className="text-4xl text-green-600 mx-auto mb-2" />
        <p className="text-gray-500">Embrace Your Spiritual Journey</p>
      </div>
    </div>
  );
}
