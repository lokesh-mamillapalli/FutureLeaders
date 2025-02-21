const express = require('express');
const { check } = require('express-validator');
const { register, login, socialAuth, forgotPassword, addChild, changePassword } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const router = express.Router();

// Validation middleware
const registerValidation = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  check('name', 'Name is required').not().isEmpty()
];

const loginValidation = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
];

const addChildValidation = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  check('name', 'Name is required').not().isEmpty()
];

const changePasswordValidation = [
  check('currentPassword', 'Current password is required').exists(),
  check('newPassword', 'New password must be at least 6 characters').isLength({ min: 6 })
];

// Routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.post('/social-auth', socialAuth);
router.post('/forgot-password', [
  check('email', 'Please include a valid email').isEmail()
], forgotPassword);
router.post('/add-child', protect, addChildValidation, addChild);
router.post('/change-password', protect, changePasswordValidation, changePassword);

module.exports = router;