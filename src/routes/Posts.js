const express = require("express");
const routerPosts = express.Router();
const { Posts, Likes } = require("../models")

const { validateToken } = require("../middlewares/AuthMiddleware");

routerPosts.get("/", validateToken, async (req, res) => {
  const listOfPosts = await Posts.findAll({ include: [Likes] });
  const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
  res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts });
});

routerPosts.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  res.json(post);
});


routerPosts.post("/", validateToken, async (req, res) => {
  const post = req.body;
  console.log('req.user.', req.user)
  post.username = req.user.username;
  await Posts.create(post);
  res.json(post);
});

routerPosts.delete("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;
  await Posts.destroy({
    where: {
      id: postId,
    },
  });

  res.json("DELETED SUCCESSFULLY");
});
module.exports = routerPosts;