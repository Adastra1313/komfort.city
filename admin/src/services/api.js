import axios from 'axios'

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8001/api',
  timeout: 10000,
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token')
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
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('admin_token')
      localStorage.removeItem('admin_user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/admin/login', credentials),
  logout: () => api.post('/admin/logout'),
  getMe: () => api.get('/admin/me'),
  changePassword: (passwordData) => api.post('/admin/change-password', passwordData),
}

// Content API
export const contentAPI = {
  // Site Info
  getSiteInfo: () => api.get('/site-info'),
  updateSiteInfo: (data) => api.put('/site-info', data),
  
  // Services
  getServices: () => api.get('/admin/services'),
  createService: (data) => api.post('/services', data),
  updateService: (id, data) => api.put(`/services/${id}`, data),
  deleteService: (id) => api.delete(`/services/${id}`),
  
  // Sectors
  getSectors: () => api.get('/admin/sectors'),
  createSector: (data) => api.post('/sectors', data),
  updateSector: (id, data) => api.put(`/sectors/${id}`, data),
  deleteSector: (id) => api.delete(`/sectors/${id}`),
  
  // Advantages
  getAdvantages: () => api.get('/admin/advantages'),
  createAdvantage: (data) => api.post('/advantages', data),
  updateAdvantage: (id, data) => api.put(`/advantages/${id}`, data),
  deleteAdvantage: (id) => api.delete(`/advantages/${id}`),
  
  // Solutions
  getSolutions: () => api.get('/admin/solutions'),
  createSolution: (data) => api.post('/solutions', data),
  updateSolution: (id, data) => api.put(`/solutions/${id}`, data),
  deleteSolution: (id) => api.delete(`/solutions/${id}`),
  
  // Projects
  getProjects: () => api.get('/admin/projects'),
  createProject: (data) => api.post('/projects', data),
  updateProject: (id, data) => api.put(`/projects/${id}`, data),
  deleteProject: (id) => api.delete(`/projects/${id}`),
  
  // FAQ
  getFAQ: () => api.get('/admin/faq'),
  createFAQ: (data) => api.post('/faq', data),
  updateFAQ: (id, data) => api.put(`/faq/${id}`, data),
  deleteFAQ: (id) => api.delete(`/faq/${id}`),
}

// Leads API
export const leadsAPI = {
  getLeads: (status) => api.get(`/leads${status ? `?status_filter=${status}` : ''}`),
  getLead: (id) => api.get(`/leads/${id}`),
  updateLeadStatus: (id, data) => api.put(`/leads/${id}/status`, data),
  getLeadStats: () => api.get('/leads/stats'),
  getDashboardStats: () => api.get('/dashboard/stats'),
}

// Media API
export const mediaAPI = {
  uploadImage: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  uploadBulk: (files) => {
    const formData = new FormData()
    files.forEach(file => formData.append('files', file))
    return api.post('/upload/bulk', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  getMediaFiles: (limit) => api.get(`/media${limit ? `?limit=${limit}` : ''}`),
  deleteMedia: (filename) => api.delete(`/media/${filename}`),
}

export default api