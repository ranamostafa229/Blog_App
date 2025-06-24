import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        "https://1.bp.blogspot.com/-vh8-upIQB8M/XhgUdDPZXlI/AAAAAAAAAQI/PVsDpHDtWvY-cvLq1SNWRaEcR0uhMJQQACLcBGAsYHQ/s1600/Blog%2BPost.jpg",
    },
    userId: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    // categoryBrief: {
    //   type: String,
    // },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    difficulty: {
      type: Number,
      required: true,
      default: 1,
    },
    //   likes: [
    //     {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "User",
    //     },
    //   ],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
