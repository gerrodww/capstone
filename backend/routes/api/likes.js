const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Like, Post, Comment, User } = require('../../db/models');

const router = express.Router();

//CREATE LIKE BY POST ID '/api/likes/new1'
router.post('/new:postId', requireAuth, async (req, res) => {
  const userId = req.user.id

  const postId = req.params.postId
  const post = await Post.findOne({
    where: { id: postId },
    include : [
      { model: Like }
    ]
  });
  if (!post) return res.status(404).json({ message: 'Post not found' });
  if (post.userId === req.user.id) return res.status(400).json({ message: 'Cannot like your own post' });
  if (post.Likes.some(like => like.userId === userId)) return res.status(400).json({ message: 'You have already liked this post' });

  const newLike = await Like.create({ userId, postId })
  return res.status(201).json({ message: 'Like successfully created', newLike})
});

//GET LIKED POSTS BY USER ID '/api/likes/mine'
router.get('/mine', requireAuth, async (req, res) => {
  const userId = req.user.id

  const posts = await Post.findAll({
    include : [
      { model: Comment },
      { model: Like },
      { model: User, attributes: ['username']}
    ],
    order: [['id', 'DESC']]
  });

  const likedPosts = posts.filter(post => post.Likes.some(like => like.userId === userId));

  return res.status(200).json(likedPosts);
});

//DELETE LIKE BY POST ID '/api/likes/delete1'
router.delete('/delete:postId', requireAuth, async (req, res) => {
  const userId = req.user.id
  const postId = req.params.postId

  const like = await Like.findOne({ where: { postId, userId } })
  if (!like) return res.status(404).json({ message: 'Post does not exist or has not been liked by the likes of you' });
  if (like.userId !== userId) return res.status(403).json({ message: 'Forbidden' });

  await like.destroy();
  return res.status(200).json({ message: 'Post successfully unliked' })
})

module.exports = router;
