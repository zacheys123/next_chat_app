import mongoose from "mongoose";
import { models } from "mongoose";
const userSchema = new mongoose.Schema(
  { fullname: { type: String, required: true } },
  { email: { type: String, required: true, unique: true } },
  { city: { type: String, required: true } },
  { address: { type: String } },
  { password: { type: String, required: true } },
  { timestamps: true }
);
const User = models.User || mongoose.model("User", userSchema);

export default User;
