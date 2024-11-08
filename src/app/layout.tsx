// src/app/layout.tsx
import React from "react";
import "./globals.css"; // Jika Anda memiliki file CSS global

export const metadata = {
  title: "My Next.js App",
  description: "A simple Next.js app with Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <a href="/">Home</a>
            <a href="/login">Login</a>
            <a href="/admin">Admin</a>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
