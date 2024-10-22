import Post from "../models/postModel.js";
import { errorHandler } from "../utils/error.js";

export const addPost = async (req, res, next) => {
  const { title, content, category, categoryBrief } = req.body;
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
    categoryBrief,
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
    const posts = await Post.find({
      category: req.params.category,
    });
    if (!posts) {
      return next(errorHandler(404, "No Posts available in this category"));
    }
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};
export const getPosts = async (req, res, next) => {
  /// get all posts based on different query params
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const totalPosts = await Post.countDocuments();
    const now = await new Date();
    const monthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: monthAgo },
    });
    res.status(200).json({ posts, totalPosts, lastMonthPosts });
  } catch (error) {
    next(error);
  }
};

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

export const deletePost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to delete this post"));
  }
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json("Post deleted successfully");
  } catch (error) {
    next(error);
  }
};
