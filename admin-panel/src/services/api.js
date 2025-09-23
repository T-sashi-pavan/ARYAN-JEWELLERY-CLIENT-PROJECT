import axios from 'axios'

// Create axios instance
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('adminToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  verifyToken: () => api.get('/auth/verify-token'),
  getProfile: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  changePassword: (data) => api.post('/auth/change-password', data),
  forgotPassword: () => api.post('/auth/forgot-password'),
  validateResetToken: (token) => api.get(`/auth/validate-reset-token/${token}`),
  resetPassword: (token, password) => api.post('/auth/reset-password', { token, password }),
  setup: () => api.post('/auth/setup'),
}

// Products API
export const productsAPI = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => {
    // Handle FormData for file uploads
    const isFormData = data instanceof FormData;
    return api.post('/products', data, {
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {}
    });
  },
  update: (id, data) => {
    // Handle FormData for file uploads
    const isFormData = data instanceof FormData;
    return api.put(`/products/${id}`, data, {
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {}
    });
  },
  delete: (id) => api.delete(`/products/${id}`),
  bulkDelete: (productIds) => api.post('/products/bulk-delete', { ids: productIds }),
  getDeleted: (params) => api.get('/products/deleted', { params }),
  restore: (id) => api.post(`/products/${id}/restore`),
  bulkRestore: (productIds) => api.post('/products/bulk-restore', { ids: productIds }),
  permanentDelete: (id) => api.delete(`/products/${id}/permanent`),
  bulkPermanentDelete: (productIds) => api.post('/products/bulk-permanent-delete', { ids: productIds }),
  toggleVisibility: (id) => api.patch(`/products/${id}/visibility`),
  getStats: () => api.get('/products/stats'),
  exportCSV: () => api.get('/products/export/csv', { responseType: 'blob' }),
}

// Upload API
export const uploadAPI = {
  uploadProductImages: (formData) => 
    api.post('/upload/product-images', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  uploadSingleImage: (formData) => 
    api.post('/upload/single-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  deleteImage: (filename) => api.delete(`/upload/delete-image/${filename}`),
  getImages: () => api.get('/upload/images'),
  getStorageInfo: () => api.get('/upload/storage-info'),
  cleanupUnused: () => api.post('/upload/cleanup-unused'),
}

// Utility functions
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    return error.response.data?.message || 'An error occurred'
  } else if (error.request) {
    // Request was made but no response received
    return 'Network error. Please check your connection.'
  } else {
    // Something happened in setting up the request
    return 'An unexpected error occurred'
  }
}

export const downloadFile = (blob, filename) => {
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  window.URL.revokeObjectURL(url)
  document.body.removeChild(link)
}

// Convenience functions for specific auth operations
export const validateResetToken = (token) => authAPI.validateResetToken(token)
export const resetPassword = (token, password) => authAPI.resetPassword(token, password)

export default api