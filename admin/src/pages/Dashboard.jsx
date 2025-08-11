import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { leadsAPI } from '../services/api'
import { 
  Users, MessageSquare, CheckCircle, TrendingUp,
  Activity, FileText, Clock, AlertCircle
} from 'lucide-react'

const Dashboard = () => {
  const [stats, setStats] = useState(null)
  const [leadStats, setLeadStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [dashboardData, leadsData] = await Promise.all([
          leadsAPI.getDashboardStats(),
          leadsAPI.getLeadStats()
        ])
        
        setStats(dashboardData.data)
        setLeadStats(leadsData.data)
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-20 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const statCards = [
    {
      title: 'Всього заявок',
      value: stats?.total_leads || 0,
      icon: MessageSquare,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Нові заявки',
      value: leadStats?.new || 0,
      icon: AlertCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Завершені проєкти',
      value: stats?.completed_projects || 0,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Активних послуг',
      value: stats?.active_services || 0,
      icon: Activity,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ]

  const leadStatusCards = [
    {
      title: 'Нові',
      value: leadStats?.new || 0,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'В роботі',
      value: leadStats?.in_progress || 0,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Завершені',
      value: leadStats?.completed || 0,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Відхилені',
      value: leadStats?.rejected || 0,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Дашборд</h1>
        <p className="text-gray-600">Огляд статистики та активності системи</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lead Status Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-[#27AE60]" />
              <span>Статус заявок</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {leadStatusCards.map((stat, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg ${stat.bgColor} text-center`}
                >
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-[#27AE60]" />
              <span>Контент</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Всього елементів контенту</span>
                <span className="font-semibold">{stats?.total_content_items || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Активних послуг</span>
                <span className="font-semibold">{stats?.active_services || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Завершених проєктів</span>
                <span className="font-semibold">{stats?.completed_projects || 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-[#27AE60]" />
            <span>Швидкі дії</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Переглянути заявки</p>
                  <p className="text-sm text-gray-600">Нових: {leadStats?.new || 0}</p>
                </div>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FileText className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Редагувати контент</p>
                  <p className="text-sm text-gray-600">Оновити інформацію</p>
                </div>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">Додати проєкт</p>
                  <p className="text-sm text-gray-600">Новий кейс</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-[#27AE60]" />
            <span>Статус системи</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">API працює</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">База даних підключена</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                Останнє оновлення: {new Date().toLocaleTimeString('uk-UA')}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard