const express = require('express');
const { requireAuth } = require('../../utils/validation');
const { Post, Comment, Like } = require('../../db/models')

const router = express.Router();

//GET ALL POSTS WITH COMMENTS AND LIKES
router.get('/all', async (req, res) => {
  const posts = await Post.findAll({
    include : [
      { model: Comment },
      { model: Like}
    ],
    order: [['id', 'DESC']]
  });
  return res.json(posts);
});

//GET POSTS BY USER ID WITH COMMENTS AND LIKES '/api/posts/user1'
router.get('/user:userId', async (req, res) => {
  const { userId } = req.params;

  const posts = await Post.findAll({
    where: { userId },
    include : [
      { model: Comment },
      { model: Like}
    ],
    order: [['id', 'DESC']]
  });

  if (posts.length === 0) {
    return res.status(404).json({ message: 'No posts found for this user' })
  }

  return res.json(posts);
});

//GET POST BY POST ID WITH COMMENTS AND LIKES '/api/posts/post1'
router.get('/post:postId', async (req, res) => {
  const { postId } = req.params;

  const post = await Post.findOne({
    where: { id: postId },
    include : [
      { model: Comment },
      { model: Like}
    ],
    order: [['id', 'DESC']]
  });

  if (!post) {
    return res.status(404).json({ message: 'Post not found' })
  }

  return res.json(post);
});

//CREATE NEW POST '/api/posts/new'
// router.post('/new', requireAuth, async (req, res) => {
  
// })

module.exports = router;