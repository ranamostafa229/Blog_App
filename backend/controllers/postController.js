import Post from "../models/postModel.js";
import { errorHandler } from "../utils/error.js";

export const addPost = async (req, res, next) => {
  const { title, content, category } = req.body;
  // access from the token
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to add post"));
  }
  if (!title || !content || !category) {
    return next(errorHandler(400, "Please provide all required fields  "));
  }
  const titleExist = await Post.findOne({ title });
  if (titleExist) {
    return next(errorHandler(409, "Please provide unique title"));
  }
  const slug = title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

  const newPost = new Post({
    title,
    content,
    category,
    slug,
    userId: req.user.id,
  });

  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    next(error);
  }
};
