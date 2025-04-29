"use client"

import decodeJWT from '@/app/utils/decodeJwt';
import { UseAuthUser } from '@/hooks/useAuthUser';
import { UpdatePasswordRequest, UpdateUserRequest, UsersResource } from '@/types/users';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminProfile = ({users,token} :{users:UsersResource,token:string}) => {
  const [formData, setFormData] = useState<UsersResource>({
    id: users.id ?? 0,
    name: users.name ?? '',
    username: users.username ?? '',
    email: users.email ?? '',
    role: users.role ?? '',
    status: users.status ?? 'active',
    nomor_handphone:users.nomor_handphone ?? ''
  });
  const router = useRouter();
  const [profileImage, setProfileImage] = useState('/icon/219983.png');
  const [isEditing, setIsEditing] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const usernameold = users.username;
  const {updateUser,logoutAdmin,updatePassword} = UseAuthUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB', {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        toast.success('Profile image updated!', {
          position: "top-right",
          autoClose: 2000,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async (e: React.FormEvent) => {
  
    e.preventDefault();
    setIsEditing(false);
     const payload :UpdateUserRequest  = {
          nama:formData.name,
          nomor_handphone:formData.nomor_handphone,
          role:formData.role,
          username:formData.username,
          status:formData.status,
          confirm_password:""
        }
      
        toast.success('Profile updated successfully!', {
          position: "top-right",
          autoClose: 1000,
        }); 
        const res = await updateUser(formData.id,payload,token);
        if ((res.status) && ((usernameold !== formData.username))) {
          const response = await logoutAdmin();
          if (response.success) {
            router.push('../admin/login');
            router.refresh(); 
          } else {
            console.error('Logout failed');
          }
        } else {
          window.location.reload();
        }
    
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('Password Dan Konfirmasi salah', { position: "top-right" });
      return;
    }
    const payload:UpdatePasswordRequest ={
      username:formData.username,
      password:currentPassword,
      new_password:newPassword,
      confirm_new_password:confirmPassword
    }
    const res = await updatePassword(payload)
    if (res.status) {
      toast.success('Password updated successfully!', { position: "top-right",autoClose:2000 });
      const response = await logoutAdmin();
      setTimeout(()=>{
        if (response.success) {
          router.push('../admin/login');
            router.refresh(); 
      } else {
          console.error('Logout failed');
      }
      },2000);
  
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-emerald-100 text-emerald-800";
      case "inactive":
        return "bg-amber-100 text-amber-800";
      case "banned":
        return "bg-rose-100 text-rose-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          {/* Header with Profile Image */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 p-8 text-white">
            <div className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-8">
              <div className="relative group">
                <div className="w-28 h-28 rounded-full border-4 border-white/30 overflow-hidden shadow-xl">
                  <img
                    src={profileImage}
                    alt="Admin Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                    className="hidden"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </label>
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-3xl font-bold tracking-tight">{formData.name}</h1>
                <p className="text-indigo-100 font-medium">{formData.role}</p>
                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(formData.status)}`}>
                  {formData.status}
                </span>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-800">Profile Information</h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-300 shadow-sm hover:shadow-md"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="space-x-3">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-5 py-2.5 bg-white text-gray-600 border border-gray-300 font-medium rounded-lg hover:bg-gray-50 transition duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveChanges}
                    className="px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-300 shadow-sm hover:shadow-md"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500' : 'border-transparent bg-gray-50'} rounded-lg transition`}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Nomor Handphone</label>
                  <input
                    type="text"
                    id="nomor_handphone"
                    name="nomor_handphone"
                    value={formData.nomor_handphone}
                    onChange={handleChange}
                    disabled
                    className="w-full px-4 py-3 border border-transparent bg-gray-50 rounded-lg cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500' : 'border-transparent bg-gray-50'} rounded-lg transition`}
                  />
                </div>
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    disabled
                    className="w-full px-4 py-3 border border-transparent bg-gray-50 rounded-lg cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500' : 'border-transparent bg-gray-50'} rounded-lg transition appearance-none`}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="banned">Banned</option>
                </select>
              </div>
            </form>
          </div>

          {/* Account Settings */}
          <div className="border-t border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Account Settings</h2>
            
            <div className="space-y-6">
              <div className="p-6 border border-gray-200 rounded-xl bg-gray-50">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Change Password</h3>
                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                    <input
                      type="password"
                      id="currentPassword"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                    <input
                      type="password"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition"
                      required
                    />
                  </div>
                  <div className="flex justify-end pt-2">
                    <button 
                      type="submit"
                      className="px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-300 shadow-sm hover:shadow-md"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              </div>

              <div className="p-6 border border-red-200 bg-red-50 rounded-xl">
                <h3 className="text-lg font-medium text-red-700 mb-3">Danger Zone</h3>
                <p className="text-sm text-red-600 mb-5">These actions are irreversible. Please proceed with caution.</p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h4 className="font-medium text-red-800 mb-1">Delete Account</h4>
                    <p className="text-xs text-red-600">Once you delete your account, there is no going back.</p>
                  </div>
                  <button className="mt-3 sm:mt-0 px-5 py-2.5 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition duration-300 shadow-sm hover:shadow-md">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName="shadow-lg"
        progressClassName="bg-indigo-500"
      />
    </div>
  );
};

export default AdminProfile;