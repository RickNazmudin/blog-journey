// src/app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaLeaf, FaPen } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!data.success) {
      setErrorMessage(data.message);
    } else {
      localStorage.setItem("token", data.user.access_token);
      router.push("/admin");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <FaPen className="text-4xl text-green-600 mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-green-800">
            Berpartisipasi Menulis
          </h2>
          <p className="text-gray-600 mt-2">
            Bergabunglah dan bagikan inspirasi, cerita, dan pemikiranmu
          </p>
          <p>
            Email : <strong>Admin@email.com</strong>
            <br />
            Password : <strong>admin123</strong>
          </p>
        </div>

        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value ?? "")}
              placeholder="Email"
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value ?? "")}
              placeholder="Password"
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 transition-colors"
          >
            Masuk untuk Menulis
          </button>
        </form>

        <div className="mt-6 text-center">
          <FaLeaf className="text-3xl text-green-600 mx-auto mb-2" />
          <p className="text-gray-500">Wujudkan Inspirasimu Melalui Tulisan</p>
        </div>
      </div>
    </div>
  );
}
