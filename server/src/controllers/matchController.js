const User = require('../models/User');

exports.getPotentialMatches = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find potential matches based on university and preferences
    const potentialMatches = await User.find({
      _id: { 
        $ne: userId,
        $nin: [...user.matches, ...user.likes, ...user.dislikes]
      },
      university: user.university,
    }).select('-password');

    res.json(potentialMatches);
  } catch (error) {
    res.status(500).json({ message: 'Error finding matches', error: error.message });
  }
};

exports.likeUser = async (req, res) => {
  try {
    const { targetUserId } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    const targetUser = await User.findById(targetUserId);

    if (!user || !targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add to likes
    user.likes.push(targetUserId);
    await user.save();

    // Check if it's a match
    if (targetUser.likes.includes(userId)) {
      user.matches.push(targetUserId);
      targetUser.matches.push(userId);
      
      await Promise.all([user.save(), targetUser.save()]);
      
      return res.json({ 
        message: 'It\'s a match!',
        matchedUser: {
          id: targetUser._id,
          name: targetUser.name,
          university: targetUser.university,
        }
      });
    }

    res.json({ message: 'User liked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error liking user', error: error.message });
  }
};

exports.dislikeUser = async (req, res) => {
  try {
    const { targetUserId } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.dislikes.push(targetUserId);
    await user.save();

    res.json({ message: 'User disliked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error disliking user', error: error.message });
  }
};

exports.getMatches = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId)
      .populate('matches', '-password')
      .select('matches');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.matches);
  } catch (error) {
    res.status(500).json({ message: 'Error getting matches', error: error.message });
  }
}; 