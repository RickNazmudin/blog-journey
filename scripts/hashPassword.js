const bcrypt = require("bcrypt");

// Misalkan Anda mendapatkan password dari input pengguna
const inputPassword = "admin123";

// Ambil hash dari database
const storedHash = "hash_dari_database"; // Ganti dengan hash yang sesuai

bcrypt.compare(inputPassword, storedHash, function (err, result) {
  if (err) {
    console.error(err);
  } else if (result) {
    console.log("Password is correct!");
  } else {
    console.log("Password is incorrect.");
  }
});
