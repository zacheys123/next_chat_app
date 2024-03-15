import { connectDb } from "@/lib/connectDb";
import User from "@/models/user";

export async function POST(req, { params }) {
  const { id } = params;
  console.log(id);
}
