// src/app/admin/page.tsx
import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Admin() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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
