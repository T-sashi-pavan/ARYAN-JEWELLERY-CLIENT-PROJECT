import React, { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, authAPI } from '../services/api'
import toast from 'react-hot-toast'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('adminToken'))
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('adminToken')
      
      if (storedToken) {
        try {
          // Verify token with backend
          const response = await api.get('/auth/verify-token', {
            headers: { Authorization: `Bearer ${storedToken}` }
          })
          
          if (response.data.success) {
            setToken(storedToken)
            setAdmin(response.data.data.admin)
          } else {
            // Token is invalid
            logout()
          }
        } catch (error) {
          console.error('Token verification failed:', error)
          logout()
        }
      }
      
      setLoading(false)
    }

    initializeAuth()
  }, [])

  const login = async (credentials) => {
    try {
      setLoading(true)
      const response = await api.post('/auth/login', credentials)
      
      if (response.data.success) {
        const { admin: adminData, token: authToken } = response.data.data
        
        // Store token in localStorage
        localStorage.setItem('adminToken', authToken)
        
        // Update state
        setToken(authToken)
        setAdmin(adminData)
        
        toast.success('Login successful!')
        navigate('/dashboard')
        
        return { success: true }
      }
    } catch (error) {
      console.error('Login error:', error)
      
      const message = error.response?.data?.message || 'Login failed'
      toast.error(message)
      
      return { 
        success: false, 
        message 
      }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    // Clear token from localStorage
    localStorage.removeItem('adminToken')
    
    // Clear state
    setToken(null)
    setAdmin(null)
    
    // Navigate to login
    navigate('/login')
    
    toast.success('Logged out successfully')
  }

  const updateProfile = async (profileData) => {
    try {
      const response = await authAPI.updateProfile(profileData)
      
      if (response.data.success) {
        setAdmin(response.data.data.admin)
        toast.success('Profile updated successfully!')
        return { success: true }
      }
    } catch (error) {
      console.error('Update profile error:', error)
      
      const message = error.response?.data?.message || 'Failed to update profile'
      toast.error(message)
      
      return { 
        success: false, 
        message 
      }
    }
  }

  const changePassword = async (passwordData) => {
    try {
      const response = await api.post('/auth/change-password', passwordData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      if (response.data.success) {
        toast.success('Password changed successfully!')
        return { success: true }
      }
    } catch (error) {
      console.error('Change password error:', error)
      
      const message = error.response?.data?.message || 'Failed to change password'
      toast.error(message)
      
      return { 
        success: false, 
        message 
      }
    }
  }

  const forgotPassword = async () => {
    try {
      const response = await authAPI.forgotPassword()
      
      if (response.data.success) {
        toast.success(response.data.message)
        return { success: true, message: response.data.message }
      }
    } catch (error) {
      console.error('Forgot password error:', error)
      
      const message = error.response?.data?.message || 'Failed to send reset email'
      toast.error(message)
      
      return { 
        success: false, 
        message 
      }
    }
  }

  const isAuthenticated = () => {
    return !!(token && admin)
  }

  const getAuthHeaders = () => {
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  const value = {
    admin,
    token,
    loading,
    login,
    logout,
    updateProfile,
    changePassword,
    forgotPassword,
    isAuthenticated,
    getAuthHeaders
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}