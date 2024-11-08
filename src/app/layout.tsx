// src/app/layout.tsx
import React from "react";
import Link from "next/link";

export default function Layout() {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{/* Konten utama halaman akan ditampilkan di sini */}</main>
      <footer>
        <p>© 2024 Blog Journey. All rights reserved.</p>
      </footer>
    </div>
  );
}
