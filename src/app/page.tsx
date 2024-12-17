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
    const maxPagesToShow = 5;

    // Helper function to add page number buttons
    const addPageButton = (page: number) => {
      pageNumbers.push(
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`mx-1 px-3 py-1 rounded ${
            currentPage === page
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          {page}
        </button>
      );
    };

    // Previous button
    if (currentPage > 1) {
      pageNumbers.push(
        <button
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          className="mx-1 px-3 py-1 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
        >
          &laquo;
        </button>
      );
    }

    // Logic for rendering page numbers efficiently
    if (totalPages <= maxPagesToShow) {
      // If total pages are 5 or less, show all
      for (let i = 1; i <= totalPages; i++) {
        addPageButton(i);
      }
    } else {
      // More complex rendering for many pages
      if (currentPage <= 3) {
        // Show first 4 pages and last page with ellipsis
        for (let i = 1; i <= 4; i++) {
          addPageButton(i);
        }
        pageNumbers.push(
          <span key="ellipsis-end" className="mx-1 text-gray-600">
            ...
          </span>
        );
        addPageButton(totalPages);
      } else if (currentPage > totalPages - 3) {
        // Show first page, ellipsis, and last 4 pages
        addPageButton(1);
        pageNumbers.push(
          <span key="ellipsis-start" className="mx-1 text-gray-600">
            ...
          </span>
        );
        for (let i = totalPages - 3; i <= totalPages; i++) {
          addPageButton(i);
        }
      } else {
        // Show first page, ellipsis, current page and surrounding, last page
        addPageButton(1);
        pageNumbers.push(
          <span key="ellipsis-start" className="mx-1 text-gray-600">
            ...
          </span>
        );

        // Show current page and its neighbors
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          addPageButton(i);
        }

        pageNumbers.push(
          <span key="ellipsis-end" className="mx-1 text-gray-600">
            ...
          </span>
        );
        addPageButton(totalPages);
      }
    }

    // Next button
    if (currentPage < totalPages) {
      pageNumbers.push(
        <button
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          className="mx-1 px-3 py-1 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
        >
          &raquo;
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
          Bagikan Perjalanan Spirituil Anda
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
          <div className="flex space-x-2 items-center">
            {renderPageNumbers()}
          </div>
        </div>

        <div className="mt-10 text-center">
          <FaLeaf className="text-4xl text-green-600 mx-auto mb-2" />
          <p className="text-gray-500">Embrace Your Spirituil Journey</p>
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
