import Post from "../models/post.model.js";

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Optionally, associate post with authenticated user
    const userId = req.user?._id;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required." });
    }

    const newPost = new Post({
      title,
      content,
      author: userId,
    });

    const savedPost = await newPost.save();

    res.status(201).json({
      message: "Post created successfully.",
      post: savedPost,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create post.", error: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name email");
    res.status(200).json({
      message: "Posts fetched successfully.",
      posts,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts.", error: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user?._id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    // Check if the user is the author of the post
    if (post.author.toString() !== userId.toString()) {
      return res.status(403).json({ message: "You are not authorized to delete this post." });
    }

    await Post.findByIdAndDelete(postId);

    res.status(200).json({ message: "Post deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete post.", error: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized. User not found." });
    }

    const posts = await Post.find({ author: userId }).sort({ createdAt: -1 }).populate("author" , "name email")

    res.status(200).json({
      message: "User posts fetched successfully.",
      posts,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user posts.", error: error.message });
  }
};
