const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Follow, User } = require('../../db/models');

const router = express.Router();

//GET USERS FOLLOWING THIS USER(BY USER ID) '/api/follows/followers1'
router.get('/followers:userId', async (req, res) => {
  const userId = req.params.userId

  const followers = await User.findAll({
    include: [{
      model: User,
      as: 'followers',
      where: { id: userId }
    }]
  });

  const userFollowers = await Follow.findAll({ where : { leader: userId }})

  return res.status(200).json(userFollowers)
})

module.exports = router;

