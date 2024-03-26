const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Comment, Post, Like, User } = require('../../db/models');

const router = express.Router();

//GET ALL USER COMMENTS '/api/comments/mine'
router.get('/mine', requireAuth, async (req, res) => {
  const userId = req.user.id 
  // const comments = await Comment.findAll({ where: { userId }, order: [['postId', 'DESC']]})
  const posts = await Post.findAll({
    include : [
      { model: Comment, include: [{ model: User, attributes: ['username'] }] },
      { model: Like, include: [{ model: User, attributes: ['username'] }] },
      { model: User, attributes: ['username']}
    ]
  });

  const postsWithUserComments = posts.filter(post => {
    return post.Comments.some(comment => comment.userId === userId);
  });

  return res.json(postsWithUserComments);
});

//CREATE COMMENT BY POST ID '/api/comments/new1'
router.post('/new:postId', requireAuth, async (req, res) => {
  const { body, imageUrl } = req.body
  const userId = req.user.id 
  const postId = req.params.postId

  const post = await Post.findOne({
    where: { id: postId },
    include : [
      { model: Comment },
      { model: Like },
      { model: User, attributes: ['username']}
    ]
  });
  if (!post) return res.status(404).json({ message: 'Post not found' });

  const newComment = await Comment.create({ body, imageUrl, userId, postId });
  post.Comments.push(newComment);

  return res.status(201).json(post);
});

//EDIT COMMENT BY COMMENT ID '/api/comments/edit1'
router.put('/edit:commentId', requireAuth, async (req, res) => {
  const { body, imageUrl } = req.body
  const commentId = req.params.commentId

  const comment = await Comment.findByPk(commentId);
  if (!comment) return res.status(404).json({ message: 'Comment not found' });

  if (req.user.id !== comment.userId) return res.status(403).json({ message: 'Forbidden from route' });

  comment.body = body || comment.body
  comment.imageUrl == imageUrl || comment.imageUrl

  await comment.save();
  return res.status(200).json(comment);
});

//DELETE COMMENT BY COMMENT ID '/api/comments/delete1'
router.delete('/delete:commentId', requireAuth, async (req, res) => {
  const commentId = req.params.commentId
  const comment = await Comment.findByPk(commentId);
  if (!comment) return res.status(404).json({ message: 'Comment not found' });

  if (req.user.id !== comment.userId) return res.status(403).json({ message: 'Forbidden' });

  await comment.destroy();
  return res.status(200).json({ message: 'Comment successfully deleted' });
})

module.exports = router;
