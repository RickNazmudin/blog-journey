// src/app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function Admin() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login"); // Redirect to login if not authenticated
      } else {
        setLoading(false); // User is authenticated
      }
    };

    checkUser();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await supabase.from("posts").insert([{ title, content }]);
    if (error) {
      alert(error.message);
    } else {
      alert("Tulisan berhasil ditambahkan");
      setTitle("");
      setContent("");
    }
  };

  if (loading) return <p>Loading...</p>; // Show loading while checking auth

  return (
    <form onSubmit={handleSubmit}>
      <h1>Tambah Tulisan</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Judul"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Konten"
        required
      />
      <button type="submit">Simpan</button>
    </form>
  );
}
