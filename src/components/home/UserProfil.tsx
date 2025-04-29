'use client'

import { UseAuthUser } from '@/hooks/useAuthUser'
import { UpdateUserRequest, UserRequest, UsersResource } from '@/types/users'
import { useState } from 'react'

type UserProfileProps = {
  user: UsersResource,
  token:string | null
}

const UserProfile = ({ user,token }: UserProfileProps) => {
  const [editing, setEditing] = useState(false)
  const [editingPassword, setEditingPassword] = useState(false)
  const [updatedUser, setUpdatedUser] = useState<UsersResource>(user)
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const {updateUser} = UseAuthUser();
  const toggleEdit = () => {
    setEditing(!editing)
    setEditingPassword(false)
    setErrors({})
  }

  const togglePasswordEdit = () => {
    setEditingPassword(!editingPassword)
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
    setErrors({})
  }

  const handleSaveChanges = async () => {

    const payload :UpdateUserRequest  = {
      nama:updatedUser.name,
      nomor_handphone:updatedUser.nomor_handphone,
      role:updatedUser.role,
      username:updatedUser.username,
      status:updatedUser.status,
      confirm_password:""
    }
  
    
    const res = await updateUser(updatedUser.id,payload,token ?? '');
    if (res.status) {
      window.location.reload();
      return;
    }
    
  }

  const handlePasswordChange = () => {
    const newErrors: Record<string, string> = {}
    
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required'
    }
    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required'
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters'
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Save password changes
    console.log('Saving password changes:', passwordData)
    setEditingPassword(false)
    setErrors({})
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUpdatedUser(prev => ({ ...prev, [name]: value }))
  }

  const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData(prev => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl border border-gray-100 shadow-xs overflow-hidden">
        {/* Header Section */}
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">{user.name}</h1>
            <p className="text-sm text-gray-500">{user.role} • <span className="capitalize">{user.status}</span></p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={toggleEdit}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                editing 
                  ? 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
              }`}
            >
              {editing ? 'Cancel' : 'Edit Profile'}
            </button>
            {!editing && (
              <button
                onClick={togglePasswordEdit}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors"
              >
                Change Password
              </button>
            )}
          </div>
        </div>

        {/* Profile Information */}
        <div className="p-6">
          {editingPassword ? (
            <div className="space-y-5">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordInputChange}
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.currentPassword && (
                    <p className="mt-1 text-xs text-red-500">{errors.currentPassword}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordInputChange}
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.newPassword && (
                    <p className="mt-1 text-xs text-red-500">{errors.newPassword}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordInputChange}
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={togglePasswordEdit}
                  className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePasswordChange}
                  className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Update Password
                </button>
              </div>
            </div>
          ) : editing ? (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={updatedUser.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={updatedUser.username}
                    disabled
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    Nomor Handphone
                  </label>
                  <input
                    type="text"
                    name="nomor_handphone"
                    value={updatedUser.nomor_handphone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    Status
                  </label>
                  <input
                    type="text"
                    name="status"
                    disabled
                    value={updatedUser.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
                  />
                </div>
              </div>
              
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleSaveChanges}
                  className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between py-2.5 border-b border-gray-50">
                <span className="text-sm font-medium text-gray-500">Full Name</span>
                <span className="text-sm text-gray-900">{user.name}</span>
              </div>
              <div className="flex justify-between py-2.5 border-b border-gray-50">
                <span className="text-sm font-medium text-gray-500">Username</span>
                <span className="text-sm text-gray-900">{user.username}</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-sm font-medium text-gray-500">Nomor Handphone</span>
                <span className="text-sm text-gray-900 capitalize">{user.nomor_handphone}</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-sm font-medium text-gray-500">Status</span>
                <span className="text-sm text-gray-900 capitalize">{user.status}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserProfile