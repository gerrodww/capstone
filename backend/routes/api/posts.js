const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Post, Comment, Like, User } = require('../../db/models');
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3');

const router = express.Router();

//GET ALL POSTS WITH COMMENTS AND LIKES
router.get('/all', async (req, res) => {
  const posts = await Post.findAll({
    include : [
      { model: Comment, include: [{ model: User, attributes: ['username', 'image'] }]},
      { model: Like, include: [{ model: User, attributes: ['username', 'image'] }]},
      { model: User, attributes: ['username', 'image']}
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
      { model: Comment, include: [{ model: User, attributes: ['username', 'image'] }] },
      { model: Like, include: [{ model: User, attributes: ['username', 'image'] }]},
      {model: User, attributes: ['username', 'image']}
      
    ],
    order: [['id', 'DESC']]
  });

  if (posts.length === 0) {
    return res.status(404).json({ message: 'No posts found for this user' })
  }

  return res.json(posts);
});

//GET POSTS BY USER ID WITH COMMENTS AND LIKES '/api/posts/mine'
router.get('/mine', async (req, res) => {
  const userId = req.user.id

  const posts = await Post.findAll({
    where: { userId },
    include : [
      { model: Comment, include: [{ model: User, attributes: ['username', 'image'] }] },
      { model: Like, include: [{ model: User, attributes: ['username', 'image'] }]},
      {model: User, attributes: ['username', 'image']}
      
    ],
    order: [['id', 'DESC']]
  });

  // if (posts.length === 0) {
  //   return res.status(404).json({ message: 'No posts found for this user' })
  // }

  return res.json(posts);
});

//GET POST BY POST ID WITH COMMENTS AND LIKES '/api/posts/post1'
router.get('/post:postId', async (req, res) => {
  const { postId } = req.params;

  const post = await Post.findOne({
    where: { id: postId },
    include : [
      { model: Comment, include: [{ model: User, attributes: ['username', 'image'] }] },
      { model: Like, include: [{ model: User, attributes: ['username', 'image'] }]},
      {model: User, attributes: ['username', 'image']}
    ]
  });

  if (!post) {
    return res.status(404).json({ message: 'Post not found' })
  }

  return res.json(post);
});

//CREATE NEW POST '/api/posts/new'
router.post('/new', requireAuth, singleMulterUpload('imgUrl'), async (req, res) => {
  try {
    const userId = req.user.id
    let { body } = req.body
    if (!body) {
      body = null;
    }
    let imgUrl;
    if (req.file) {
      imgUrl = await singlePublicFileUpload(req.file);
    }
    if (!req.file) {
      imgUrl = null
    }
    const newPost = await Post.create({ userId, body, imageUrl: imgUrl });
    return res.status(201).json(newPost);
  } catch (error) {
    return error
  }
});

//EDIT POST BY POST ID '/api/posts/edit1'
router.put('/edit:postId', requireAuth, async (req, res) => {
  const postId = req.params.postId
  const post = await Post.findByPk(postId);

  if (!post) return res.status(404).json({ message: 'Post not found' });

  if (req.user.id !== post.userId) return res.status(403).json({ message: 'Forbidden' });

  const { body, imageUrl } = req.body

  post.body = body || post.body
  post.imageUrl = imageUrl || post.imageUrl

  await post.save();
  return res.status(200).json(post);
});

//DELETE POST BY ID '/api/posts/delete1'
router.delete('/delete:postId', requireAuth, async (req, res) => {
  const postId = req.params.postId
  const post = await Post.findByPk(postId);

  if (!post) return res.status(404).json({ message: 'Post not found' });

  if (req.user.id !== post.userId) return res.status(403).json({ message: 'Forbidden' });

  await post.destroy();
  return res.status(200).json({ message: 'Post successfully deleted' });
});

module.exports = router;