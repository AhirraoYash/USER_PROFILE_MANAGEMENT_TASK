const userService = require('../services/userService');

exports.getProfile = async (req, res) => {
  try {
    const user = await userService.getUserById(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await userService.updateUserProfile(req.user.id, req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.uploadAvatar = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    
    const user = await userService.updateUserAvatar(req.user.id, req.file.filename);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};