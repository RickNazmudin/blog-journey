// src/app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { FaLeaf } from "react-icons/fa";

interface Post {
  id: number;
  title: string;
  content: string;
  author: string; // Menambahkan properti author
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase.from("posts").select("*");
      setPosts(data || []); // Pastikan data tidak null
    };

    fetchPosts();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center text-green-800 mb-8">
          Bagikan Perjalanan Spiritual Anda
        </h1>
        <p className="text-center text-gray-600 mb-6 italic">
          &quot;Setiap langkah dalam perjalanan ini adalah kesempatan untuk
          menemukan diri kita yang sejati.&quot;
        </p>
        <div className="w-full md:w-1/4 bg-white rounded-lg shadow-md p-4 ml-4 mt-4 md:mt-0">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Instruksi Login
          </h2>
          <p className="text-left text-gray-600 mb-2 italic">
            Untuk menambahkan tulisan, silahkan login dengan email:
            <strong> admin@email.com</strong> password:{" "}
            <strong>admin123</strong>
          </p>
        </div>
        <br />
        <br />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md p-6 transition-transform transform hover:scale-105"
            >
              <h2 className="text-2xl font-semibold text-green-700 mb-2">
                {post.title}
              </h2>
              <p className="text-gray-600">{post.content}</p>
              <p className="text-gray-500 mt-4">
                Ditulis oleh: {post.author}
              </p>{" "}
              {/* Menampilkan penulis */}
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <FaLeaf className="text-4xl text-green-600 mx-auto mb-2" />
          <p className="text-gray-500">Embrace Your Spiritual Journey</p>
        </div>
        <div className="mt-10 text-center">
          <p className="text-lg text-gray-700 italic">
            &quot;Dalam setiap tulisan, ada cahaya yang membimbing kita menuju
            pencerahan.&quot;
          </p>
        </div>
      </div>
    </div>
  );
}
