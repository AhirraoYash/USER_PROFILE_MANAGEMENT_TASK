const User = require('../models/User');

const getUserById = async (userId) => {
  return await User.findById(userId).select('-password');
};

const updateUserProfile = async (userId, data) => {
  const { name, phone } = data;
  return await User.findByIdAndUpdate(
    userId,
    { $set: { name, phone } },
    { new: true }
  ).select('-password');
};

const updateUserAvatar = async (userId, filename) => {
  return await User.findByIdAndUpdate(
    userId,
    { $set: { avatar: filename } },
    { new: true }
  ).select('-password');
};

module.exports = { getUserById, updateUserProfile, updateUserAvatar };