const express = require("express");
const { getPosts, createPost, postsByUser, postById, isPoster, deletePost, updatePost } = require("../controllers/post");
const { requireLogin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { createPostValidator } = require("../validator");

const router = express.Router();

router.get("/posts", getPosts);
router.post(
    "/post/new/:userId",
     requireLogin,
     createPost,
     createPostValidator

     
);
router.get("/posts/by/:userId", requireLogin, postsByUser);
router.put("/post/:postId", requireLogin, isPoster, updatePost);
router.delete("/post/:postId", requireLogin, isPoster, deletePost);

router.param("userId", userById);
router.param("postId", postById);


module.exports = router;