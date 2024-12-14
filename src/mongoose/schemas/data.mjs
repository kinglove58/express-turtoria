import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  displayname: mongoose.Schema.Types.String,
  password: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  name: mongoose.Schema.Types.String,
});

export const User = mongoose.model("User", userSchema);
