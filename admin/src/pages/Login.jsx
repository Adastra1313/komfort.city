import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card'
import { useToast } from '../hooks/use-toast'
import { Eye, EyeOff, LogIn } from 'lucide-react'

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const { login } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await login(formData)
      
      if (result.success) {
        toast({
          title: "Успішний вхід",
          description: "Ласкаво просимо до адмін-панелі!",
        })
        navigate('/dashboard')
      } else {
        toast({
          title: "Помилка входу",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Помилка",
        description: "Щось пішло не так. Спробуйте ще раз.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#27AE60] rounded-xl mb-4">
            <span className="text-white font-bold text-2xl">K</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Komfort<span className="text-[#27AE60]">.City</span>
          </h1>
          <p className="text-gray-600">Адміністративна панель</p>
        </div>

        {/* Login Form */}
        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Вхід до системи</CardTitle>
            <CardDescription className="text-center">
              Введіть ваші облікові дані для доступу
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Користувач</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Введіть логін"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="h-11"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Введіть пароль"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="h-11 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-11 w-11 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 bg-[#27AE60] hover:bg-[#27AE60]/90"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Входимо...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <LogIn className="h-4 w-4" />
                    <span>Увійти</span>
                  </div>
                )}
              </Button>
            </form>

            {/* Default Credentials Info */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="text-sm font-medium text-blue-900 mb-2">
                Дані для входу за замовчуванням:
              </h4>
              <div className="text-sm text-blue-800 space-y-1">
                <p><strong>Логін:</strong> admin</p>
                <p><strong>Пароль:</strong> admin123</p>
              </div>
              <p className="text-xs text-blue-600 mt-2">
                ⚠️ Обов'язково змініть пароль після першого входу!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-600">
          <p>© 2025 Komfort.City. Всі права захищені.</p>
        </div>
      </div>
    </div>
  )
}

export default Login