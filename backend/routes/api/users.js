const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3');

const router = express.Router();

//backend validation for signup
const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

// Sign up
router.post('/', validateSignup, async (req, res) => {

    const { email, password, username } = req.body;

    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({ email, username, hashedPassword });

    const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
    };

    await setTokenCookie(res, safeUser);

    return res.json({
        user: safeUser
    });
});

// Restore session user
router.get('/', (req, res) => {
    const { user } = req;
    if (user) {
        const safeUser = {
            id: user.id,
            email: user.email,
            username: user.username,
            bio: user.bio,
            darkMode: user.darkMode,
            image: user.image
        };
        return res.json({
            user: safeUser
        });
    } else return res.json({ user: null });
});

// Edit user
router.put('/edit:userId', requireAuth, singleMulterUpload('image'), async (req, res) => {
    try {
        const userId = req.params.userId
        const user = await User.findByPk(userId);
        
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        if (req.user.id !== Number(userId)) return res.status(403).json({ message: 'Forbidden' });

        let imgUrl;
        if (req.file) {
            try {
                imgUrl = await singlePublicFileUpload(req.file);
            } catch (error) {
                console.log('Error:', error)
            }
        }
        
        const { username, bio, darkMode} = req.body;
        
        user.username = username || user.username;
        user.image = imgUrl || user.image
        user.bio = bio || user.bio;
        user.darkMode = darkMode || user.darkMode;
        
        await user.save();
        return res.status(200).json(user);
    } catch (error) {
        return error
    }
});


module.exports = router;
