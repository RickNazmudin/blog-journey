// src/app/page.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/supabase";
import { FaLeaf } from "react-icons/fa";

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  updated_at: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showFullContent, setShowFullContent] = useState<{
    [key: number]: boolean;
  }>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const postsPerPage = 6;
  const pageTopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const { count } = await supabase
        .from("posts")
        .select("*", { count: "exact" });

      const totalPostCount = count || 0;
      const calculatedTotalPages = Math.ceil(totalPostCount / postsPerPage);
      setTotalPages(calculatedTotalPages);

      const { data } = await supabase
        .from("posts")
        .select("*")
        .range((currentPage - 1) * postsPerPage, currentPage * postsPerPage - 1)
        .order("id", { ascending: false });

      setPosts(data || []);

      // Scroll to top of the page
      if (pageTopRef.current) {
        pageTopRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };

    fetchPosts();
  }, [currentPage]);

  const toggleContent = (id: number) => {
    setShowFullContent((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setShowFullContent({});
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`mx-1 px-3 py-1 rounded ${
            currentPage === i
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Reference point for scrolling */}
      <div ref={pageTopRef}></div>

      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center text-green-800 mb-8">
          Bagikan Perjalanan Spiritual Anda
        </h1>
        <p className="text-center text-gray-600 mb-6 italic">
          &quot;Setiap langkah dalam perjalanan ini adalah kesempatan untuk
          menemukan diri kita yang sejati.&quot;
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md p-6 transition-transform transform hover:scale-105"
            >
              <h2 className="text-2xl font-semibold text-green-700 mb-2">
                {post.title}
              </h2>
              <p className="text-gray-600 whitespace-pre-line">
                {showFullContent[post.id]
                  ? post.content
                  : `${post.content.substring(0, 150)}...`}
              </p>
              {!showFullContent[post.id] && post.content.length > 150 && (
                <button
                  onClick={() => toggleContent(post.id)}
                  className="mt-4 text-blue-500 hover:underline"
                >
                  Lanjutkan Membaca
                </button>
              )}
              {showFullContent[post.id] && (
                <>
                  <div className="text-gray-500 mt-4 flex items-center space-x-2">
                    <span>Ditulis oleh: {post.author}</span>
                    <span className="text-sm text-gray-400">|</span>
                    <span className="text-sm">
                      {new Date(post.updated_at).toLocaleDateString("id-ID")}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleContent(post.id)}
                    className="mt-4 text-red-500 hover:underline"
                  >
                    Kembali
                  </button>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-8">
          <div className="flex space-x-2">{renderPageNumbers()}</div>
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
