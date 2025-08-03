import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    content: {
      type: String,
      required: true,
      maxlength: 1000,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
