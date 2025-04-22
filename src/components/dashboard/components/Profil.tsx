"use client"

import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminProfile = () => {
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Administrator',
    phone: '+6281234567890',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [albumImages, setAlbumImages] = useState([]);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleProfileImageChange = (e: { target: { files: any[]; }; }) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAlbumImageChange = (e) => {
    const files = Array.from(e.target.files);
    setAlbumImages([...albumImages, ...files]);
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    // Simulate saving changes
    toast.success('Profile updated successfully!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-3xl">
        {/* Header */}
        <div className="flex items-center mb-8 space-x-6">
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <img
              src={profileImage || "https://via.placeholder.com/150"}
              alt="Admin Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-3xl font-semibold text-gray-800">Hello, {formData.fullName}!</h2>
            <p className="text-sm text-gray-500">{formData.role}</p>
          </div>
        </div>

        {/* Profile Information */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700">Profile Information</h3>
          <form onSubmit={handleSaveChanges} className="space-y-6 mt-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-600">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  disabled
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-600">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-600">Role</label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  disabled
                />
              </div>
            </div>

            <div>
              <label htmlFor="profileImage" className="block text-sm font-medium text-gray-600">Profile Image</label>
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                accept="image/*"
                onChange={handleProfileImageChange}
                className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-6 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300"
            >
              Save Changes
            </button>
          </form>
        </div>

        {/* Photo Album */}
      

        

        {/* Account Settings */}
        <div className="mt-10 border-t pt-6">
          <h3 className="text-xl font-semibold text-gray-700">Account Settings</h3>
          <div className="space-y-4 mt-4">
            <button className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-300">
              Delete Account
            </button>
            <button className="w-full py-3 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition-all duration-300">
              Change Password
            </button>
          </div>
        </div>

        {/* Toast Notification */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default AdminProfile;
