import "dotenv/config";
import { db } from "./db.js";
import { users } from "../shared/schema.js";
import bcrypt from "bcrypt";

async function main() {
  const username = "admin";
  const password = "password";

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.insert(users).values({
    username,
    password: hashedPassword,
  });

  console.log("Admin user created");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
