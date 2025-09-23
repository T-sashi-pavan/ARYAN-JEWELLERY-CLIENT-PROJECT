import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../contexts/AuthContext'
import { 
  UserIcon, 
  KeyIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [isSendingReset, setIsSendingReset] = useState(false)
  const { admin, changePassword, updateProfile, forgotPassword } = useAuth()
  
  // Profile form
  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors, isSubmitting: isProfileSubmitting },
    reset: resetProfile,
    setValue: setProfileValue
  } = useForm({
    defaultValues: {
      name: admin?.name || '',
      email: admin?.email || ''
    }
  })

  // Update form values when admin data changes
  useEffect(() => {
    if (admin) {
      setProfileValue('name', admin.name || '')
      setProfileValue('email', admin.email || '')
    }
  }, [admin, setProfileValue])

  // Password form
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
    reset: resetPassword,
    watch
  } = useForm()

  const onSubmitProfile = async (data) => {
    const result = await updateProfile({
      name: data.name,
      email: data.email
    })

    if (result.success) {
      // Form will automatically update with new data from context
    }
  }

  const onSubmitPassword = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    const result = await changePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword
    })

    if (result.success) {
      resetPassword()
    }
  }

  const handleForgotPassword = async () => {
    setIsSendingReset(true)
    try {
      const result = await forgotPassword()
      if (result.success) {
        // Success message is already shown by the forgotPassword function
      }
    } catch (error) {
      toast.error('Failed to send reset email')
    } finally {
      setIsSendingReset(false)
    }
  }

  const tabs = [
    { id: 'profile', name: 'Profile', icon: UserIcon },
    { id: 'password', name: 'Password', icon: KeyIcon }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account and system preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <tab.icon className="mr-3 h-5 w-5" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>
                <p className="text-sm text-gray-600">Update your personal information</p>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmitProfile(onSubmitProfile)} className="space-y-4">
                  <div>
                    <label className="form-label">Name</label>
                    <input
                      {...registerProfile('name', {
                        required: 'Name is required',
                        minLength: {
                          value: 2,
                          message: 'Name must be at least 2 characters'
                        }
                      })}
                      type="text"
                      className={`input-field ${profileErrors.name ? 'border-red-500' : ''}`}
                      placeholder="Enter your name"
                    />
                    {profileErrors.name && (
                      <p className="form-error">{profileErrors.name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="form-label">Email</label>
                    <input
                      {...registerProfile('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Please enter a valid email address'
                        }
                      })}
                      type="email"
                      className={`input-field ${profileErrors.email ? 'border-red-500' : ''}`}
                      placeholder="Enter your email"
                    />
                    {profileErrors.email && (
                      <p className="form-error">{profileErrors.email.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="form-label">Role</label>
                    <input
                      type="text"
                      value={admin?.role === 'superadmin' ? 'Super Admin' : 'Admin'}
                      disabled
                      className="input-field bg-gray-50"
                    />
                    <p className="text-xs text-gray-500 mt-1">Role cannot be changed</p>
                  </div>
                  
                  <div>
                    <label className="form-label">Last Login</label>
                    <input
                      type="text"
                      value={admin?.lastLogin ? new Date(admin.lastLogin).toLocaleString() : 'Never'}
                      disabled
                      className="input-field bg-gray-50"
                    />
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => resetProfile({
                          name: admin?.name || '',
                          email: admin?.email || ''
                        })}
                        className="btn-outline"
                      >
                        Reset Changes
                      </button>
                      <button
                        type="submit"
                        disabled={isProfileSubmitting}
                        className="btn-primary"
                      >
                        {isProfileSubmitting ? 'Saving...' : 'Save Profile'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'password' && (
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-medium text-gray-900">Change Password</h3>
                <p className="text-sm text-gray-600">Update your password to keep your account secure</p>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmitPassword(onSubmitPassword)} className="space-y-4">
                  <div>
                    <label className="form-label">Current Password</label>
                    <input
                      {...registerPassword('currentPassword', {
                        required: 'Current password is required'
                      })}
                      type="password"
                      className={`input-field ${passwordErrors.currentPassword ? 'border-red-500' : ''}`}
                      placeholder="Enter current password"
                    />
                    {passwordErrors.currentPassword && (
                      <p className="form-error">{passwordErrors.currentPassword.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="form-label">New Password</label>
                    <input
                      {...registerPassword('newPassword', {
                        required: 'New password is required',
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters'
                        }
                      })}
                      type="password"
                      className={`input-field ${passwordErrors.newPassword ? 'border-red-500' : ''}`}
                      placeholder="Enter new password"
                    />
                    {passwordErrors.newPassword && (
                      <p className="form-error">{passwordErrors.newPassword.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="form-label">Confirm New Password</label>
                    <input
                      {...registerPassword('confirmPassword', {
                        required: 'Please confirm your password',
                        validate: (value) => {
                          const newPassword = watch('newPassword')
                          return value === newPassword || 'Passwords do not match'
                        }
                      })}
                      type="password"
                      className={`input-field ${passwordErrors.confirmPassword ? 'border-red-500' : ''}`}
                      placeholder="Confirm new password"
                    />
                    {passwordErrors.confirmPassword && (
                      <p className="form-error">{passwordErrors.confirmPassword.message}</p>
                    )}
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <button
                        type="submit"
                        disabled={isPasswordSubmitting}
                        className="btn-primary"
                      >
                        {isPasswordSubmitting ? 'Changing Password...' : 'Change Password'}
                      </button>
                    </div>
                  </div>
                </form>

                {/* Forgot Password Section */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="text-md font-medium text-gray-900 mb-3">Forgot Password?</h4>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-blue-800 mb-3">
                      You can send a password reset email to your profile email: <strong>{admin?.email}</strong>
                    </p>
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      disabled={isSendingReset}
                      className="btn-outline text-blue-600 border-blue-300 hover:bg-blue-50"
                    >
                      {isSendingReset ? 'Sending Reset Email...' : 'Send Password Reset Email'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Settings