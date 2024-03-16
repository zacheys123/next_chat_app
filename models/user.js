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

      unique: true,
    },
    username: {
      type: String,
    },
    other: {
      type: String,
    },
    password: { type: String },
  },
  { timestamps: true }
);
const User = models.User || mongoose.model("User", userSchema);

export default User;
