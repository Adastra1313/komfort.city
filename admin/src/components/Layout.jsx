import React, { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Button } from './ui/button'
import { 
  Menu, X, Home, Users, Settings, FileText, 
  PresentationChart, Building, Award, Wrench,
  HelpCircle, MessageSquare, Image, LogOut,
  User, Bell, Search
} from 'lucide-react'

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const navigation = [
    { name: 'Дашборд', href: '/dashboard', icon: Home },
    { name: 'Заявки', href: '/leads', icon: MessageSquare },
    { 
      name: 'Контент',
      icon: FileText,
      children: [
        { name: 'Послуги', href: '/content/services', icon: Wrench },
        { name: 'Сектори', href: '/content/sectors', icon: Building },
        { name: 'Переваги', href: '/content/advantages', icon: Award },
        { name: 'Рішення', href: '/content/solutions', icon: PresentationChart },
        { name: 'Проєкти', href: '/content/projects', icon: Users },
        { name: 'FAQ', href: '/content/faq', icon: HelpCircle },
      ]
    },
    { name: 'Медіа', href: '/media', icon: Image },
    { name: 'Налаштування', href: '/settings', icon: Settings },
  ]

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const isActive = (href) => location.pathname === href

  const isParentActive = (children) => {
    return children?.some(child => location.pathname === child.href)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#27AE60] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <span className="text-lg font-semibold text-gray-900">
              Komfort<span className="text-[#27AE60]">.City</span>
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-4">
          <div className="space-y-2">
            {navigation.map((item) => {
              if (item.children) {
                const parentActive = isParentActive(item.children)
                return (
                  <div key={item.name}>
                    <div className={`
                      flex items-center px-3 py-2 text-sm font-medium rounded-lg
                      ${parentActive ? 'bg-[#27AE60] text-white' : 'text-gray-700 hover:bg-gray-100'}
                    `}>
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </div>
                    <div className="ml-8 mt-2 space-y-1">
                      {item.children.map((child) => (
                        <button
                          key={child.href}
                          onClick={() => {
                            navigate(child.href)
                            setSidebarOpen(false)
                          }}
                          className={`
                            w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors
                            ${isActive(child.href) 
                              ? 'bg-[#27AE60] text-white' 
                              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
                          `}
                        >
                          <child.icon className="mr-3 h-4 w-4" />
                          {child.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              }

              return (
                <button
                  key={item.href}
                  onClick={() => {
                    navigate(item.href)
                    setSidebarOpen(false)
                  }}
                  className={`
                    w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors
                    ${isActive(item.href) 
                      ? 'bg-[#27AE60] text-white' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}
                  `}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </button>
              )
            })}
          </div>
        </nav>

        {/* User Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-[#27AE60] rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{user?.username}</p>
              <p className="text-xs text-gray-600">{user?.email}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Вийти
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              
              <div className="hidden md:flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Пошук..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-[#27AE60] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#27AE60] rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-900 hidden md:block">
                  {user?.username}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default Layout