// src/app/api/check-auth/route.js
import { supabase } from "@/lib/supabase";

export async function GET(req) {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");

  // Memeriksa apakah token ada
  if (!token) {
    return new Response(
      JSON.stringify({ success: false, message: "Token not provided" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const { data, error } = await supabase.auth.api.getUser(token);

  if (error || !data.user) {
    return new Response(
      JSON.stringify({ success: false, message: "User not authenticated" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  return new Response(JSON.stringify({ success: true, user: data.user }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
