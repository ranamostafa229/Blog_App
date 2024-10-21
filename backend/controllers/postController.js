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

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Post.distinct("category");
    const numberOfPostsByCategory = await Post.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json({ categories, countedPosts: numberOfPostsByCategory });
  } catch (error) {
    next(error);
  }
};
export const getCategoryPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ category: req.params.category });
    if (!posts) {
      return next(errorHandler(404, "No Posts available in this category"));
    }
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};
export const getPosts = async (req, res, next) => {};

export const getPost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) {
      return next(errorHandler(404, "Post not found"));
    }
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};
