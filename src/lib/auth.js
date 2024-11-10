// import { supabase } from "./supabase";
// import bcrypt from "bcrypt";

// export async function loginUser(email, password) {
//   console.log("Attempting login with email:", email);

//   // Ambil pengguna berdasarkan email
//   const { data: user, error } = await supabase
//     .from("users")
//     .select("*")
//     .eq("email", email)
//     .single();

//   if (error) {
//     console.error("Error fetching user:", error.message);
//     return { success: false, message: "User not found" };
//   }

//   if (!user) {
//     console.error("No user found with this email:", email);
//     return { success: false, message: "Invalid login credentials" };
//   }

//   console.log("User data fetched successfully:", user);

//   // Verifikasi password dengan bcrypt
//   const isPasswordValid = await bcrypt.compare(password, user.password);
//   console.log("Password valid:", isPasswordValid);

//   if (!isPasswordValid) {
//     console.error("Invalid password for user:", email);
//     return { success: false, message: "Invalid login credentials" };
//   }

//   console.log("User logged in successfully:", user);
//   return { success: true, user };
// }
