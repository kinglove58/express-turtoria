import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.string,
    require: true,
  },
  password: {
    type: mongoose.Schema.Types.String,
    require: true,
  },
});
