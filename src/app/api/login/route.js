// src/app/api/login/route.js
import { supabase } from "@/lib/supabase";
import bcrypt from "bcrypt";

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Email and password are required",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !user) {
    return new Response(
      JSON.stringify({ success: false, message: "User not found" }),
      {
        status: 404,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return new Response(
      JSON.stringify({ success: false, message: "Invalid login credentials" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // Simulasi pengembalian token
  return new Response(
    JSON.stringify({
      success: true,
      user: { ...user, access_token: "your_generated_token" },
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
