import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaCamera, FaSignOutAlt, FaUser, FaPhone, FaEnvelope } from 'react-icons/fa';

const Profile = () => {
  const { user, updateUser, logout } = useAuth();
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || ''
      });
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.put('/user/profile', formData);
      updateUser(data);
      toast.success('Profile updated successfully! 🎉');
    } catch (err) {
      toast.error('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error('File size too large (Max 2MB)');
      return;
    }

    const uploadData = new FormData();
    uploadData.append('avatar', file);

    try {
      toast.info('Uploading image...');
      const { data } = await api.post('/user/upload-avatar', uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      updateUser(data);
      toast.success('New profile photo set! 📸');
    } catch (err) {
      toast.error('Image upload failed.');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getAvatarUrl = () => {
    if (!user?.avatar) return 'https://via.placeholder.com/150';
    return `http://localhost:5000/uploads/${user.avatar}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6 relative">
          <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>

          <div className="flex justify-between items-end px-8 pb-6 -mt-12">
            <div className="relative group">
              <img
                src={getAvatarUrl()}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover bg-white"
              />
              <label className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-gray-100 text-indigo-600 transition-all transform hover:scale-110">
                <FaCamera size={18} />
                <input type="file" hidden onChange={handleImageUpload} accept="image/*" />
              </label>
            </div>

            <button
              onClick={handleLogout}
              className="mb-2 flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>

          <div className="px-8 pb-6">
            <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
            <p className="text-gray-500 text-sm">{user?.email}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">
            Profile Settings
          </h3>

          <form onSubmit={handleUpdate} className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
                <FaEnvelope className="text-gray-400" /> Email Address
              </label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-500 border border-gray-200 cursor-not-allowed"
              />
              <p className="text-xs text-gray-400 mt-1">Email cannot be changed.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FaUser className="text-indigo-500" /> Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FaPhone className="text-indigo-500" /> Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="+91 12345 67890"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full sm:w-auto px-8 py-3 text-white font-semibold rounded-lg shadow-md transition duration-300 ${
                  loading
                    ? 'bg-indigo-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
