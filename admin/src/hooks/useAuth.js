import { useState, useEffect, createContext, useContext } from 'react'
import { authAPI } from '../services/api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem('admin_token'))

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('admin_token')
      const storedUser = localStorage.getItem('admin_user')

      if (storedToken && storedUser) {
        setToken(storedToken)
        setUser(JSON.parse(storedUser))
        
        // Verify token is still valid
        try {
          const response = await authAPI.getMe()
          setUser(response.data)
          localStorage.setItem('admin_user', JSON.stringify(response.data))
        } catch (error) {
          // Token is invalid, clear auth
          logout()
        }
      }
      
      setLoading(false)
    }

    initAuth()
  }, [])

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials)
      const { access_token, user: userData } = response.data

      setToken(access_token)
      setUser(userData)
      
      localStorage.setItem('admin_token', access_token)
      localStorage.setItem('admin_user', JSON.stringify(userData))
      
      return { success: true }
    } catch (error) {
      console.error('Login error:', error)
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Помилка входу'
      }
    }
  }

  const logout = async () => {
    try {
      if (token) {
        await authAPI.logout()
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setToken(null)
      setUser(null)
      localStorage.removeItem('admin_token')
      localStorage.removeItem('admin_user')
    }
  }

  const changePassword = async (passwordData) => {
    try {
      await authAPI.changePassword(passwordData)
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Помилка зміни паролю'
      }
    }
  }

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    changePassword,
    isAuthenticated: !!token && !!user,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default useAuth