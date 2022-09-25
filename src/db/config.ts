import { connect } from "mongoose";

export async function connectDB() {
  await connect(process.env.DATABASE_URL ?? "");
}
