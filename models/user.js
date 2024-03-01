import mongoose from "mongoose";
import { models } from "mongoose";
const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
    },
    secondname: { type: String },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    city: { type: String },
    instrument: { type: String },
    experience: {
      type: String,
    },
    age: { type: String },
    phone: {
      type: String,
    },
    emailtwo: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    username: {
      type: String,
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
const User = models.User || mongoose.model("User", userSchema);

export default User;
