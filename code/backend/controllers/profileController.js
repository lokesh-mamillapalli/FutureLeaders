const Profile = require('../models/Profile');

exports.createProfile = async (req, res) => {
  try {
    const { leadershipGoal, gender, ageGroup, focusArea } = req.body;
    const userId = req.user.id;

    // Check if profile exists and update it, or create new one
    const profile = await Profile.findOneAndUpdate(
      { userId },
      { leadershipGoal, gender, ageGroup, focusArea },
      { new: true, upsert: true } // This will create if doesn't exist, or update if exists
    );

    res.status(200).json({
      success: true,
      profile
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { leadershipGoal, gender, ageGroup, focusArea } = req.body;
    const userId = req.user.id;

    let profile = await Profile.findOne({ userId });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    profile = await Profile.findOneAndUpdate(
      { userId },
      { leadershipGoal, gender, ageGroup, focusArea },
      { new: true }
    );

    res.json({
      success: true,
      profile
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await Profile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json({
      success: true,
      profile
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};