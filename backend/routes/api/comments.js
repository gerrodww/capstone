const express = require('express');
const { requireAuth } = require('../../utils/validation');
const { Comment } = require('../../db/models')

const router = express.Router();

router.get('', async (req, res) => {
})