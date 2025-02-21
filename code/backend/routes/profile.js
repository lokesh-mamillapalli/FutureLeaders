const express = require('express');
const { createProfile, updateProfile, getProfile } = require('../controllers/profileController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/', protect, createProfile);
router.put('/', protect, updateProfile);
router.get('/', protect, getProfile);

module.exports = router;