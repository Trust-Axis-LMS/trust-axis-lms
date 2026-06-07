/**
 * One-time script to generate a bcrypt hash for your admin password.
 * Usage: node scripts/hash-password.mjs
 * Then copy the output hash into your .env as ADMIN_PASSWORD_HASH
 */
import bcrypt from "bcryptjs";
import readline from "readline";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.question("Enter the password to hash: ", async (password) => {
  if (!password || password.length < 8) {
    console.error("❌ Password must be at least 8 characters.");
    process.exit(1);
  }
  const hash = await bcrypt.hash(password, 12);
  console.log("\n✅ bcrypt hash (12 rounds):");
  console.log(hash);
  console.log("\nAdd this to your .env file as:");
  console.log(`ADMIN_PASSWORD_HASH="${hash}"`);
  rl.close();
});
