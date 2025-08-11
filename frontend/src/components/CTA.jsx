import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle, 
  FileText, 
  Calculator 
} from 'lucide-react';

const CTA = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    objectType: '',
    area: '',
    currentFuel: '',
    needs: '',
    timeline: '',
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Дякуємо! Ваша заявка відправлена. Ми зв\'яжемося з вами найближчим часом.');
  };

  return (
    <section id="cta" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#27AE60]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#FF9900]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Info */}
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Отримати кошторис за 24–48 годин
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Заповніть форму, і наш інженер безкоштовно розрахує вартість теплового рішення для вашого об'єкта
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-[#27AE60] flex-shrink-0" />
                <span className="text-gray-300">Безкоштовна консультація інженера</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calculator className="h-6 w-6 text-[#FF9900] flex-shrink-0" />
                <span className="text-gray-300">Точний розрахунок економії енергії</span>
              </div>
              <div className="flex items-center space-x-3">
                <FileText className="h-6 w-6 text-[#27AE60] flex-shrink-0" />
                <span className="text-gray-300">Детальний кошторис з гарантіями</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-6 w-6 text-[#FF9900] flex-shrink-0" />
                <span className="text-gray-300">Швидка відповідь протягом 24-48 годин</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-4">Або зателефонуйте прямо зараз</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-[#27AE60]" />
                  <span className="text-white font-medium">+380 XX XXX XX XX</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-[#FF9900]" />
                  <span className="text-white">info@komfort.city</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-[#27AE60]" />
                  <span className="text-gray-300">Пн-Пт: 9:00-18:00, Сб-Нд: 10:00-16:00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div>
            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
              <CardHeader>
                <h3 className="text-2xl font-bold text-gray-900 text-center">
                  Форма для розрахунку
                </h3>
                <p className="text-[#6E7B8B] text-center">
                  Всі поля обов'язкові для точного розрахунку
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Object Type */}
                  <div>
                    <Label htmlFor="objectType" className="text-gray-900 font-medium">
                      Тип об'єкта *
                    </Label>
                    <select
                      id="objectType"
                      name="objectType"
                      value={formData.objectType}
                      onChange={handleInputChange}
                      required
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27AE60] focus:border-transparent"
                    >
                      <option value="">Оберіть тип об'єкта</option>
                      <option value="production">Виробництво</option>
                      <option value="office">Офіс/ТРЦ</option>
                      <option value="hotel">Готель/Ресторан</option>
                      <option value="medical">Медичний заклад</option>
                      <option value="residential">Житловий комплекс</option>
                      <option value="educational">Освітній заклад</option>
                      <option value="warehouse">Склад/Логістика</option>
                      <option value="agriculture">Агро комплекс</option>
                    </select>
                  </div>

                  {/* Area/Power */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="area" className="text-gray-900 font-medium">
                        Площа (м²) *
                      </Label>
                      <Input
                        id="area"
                        name="area"
                        type="number"
                        placeholder="1000"
                        value={formData.area}
                        onChange={handleInputChange}
                        required
                        className="mt-1 focus:ring-[#27AE60] focus:border-[#27AE60]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="currentFuel" className="text-gray-900 font-medium">
                        Поточне паливо *
                      </Label>
                      <select
                        id="currentFuel"
                        name="currentFuel"
                        value={formData.currentFuel}
                        onChange={handleInputChange}
                        required
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27AE60] focus:border-transparent"
                      >
                        <option value="">Оберіть паливо</option>
                        <option value="gas">Газ</option>
                        <option value="electricity">Електроенергія</option>
                        <option value="solid">Тверде паливо</option>
                        <option value="central">Централізоване</option>
                        <option value="none">Немає системи</option>
                      </select>
                    </div>
                  </div>

                  {/* Needs */}
                  <div>
                    <Label htmlFor="needs" className="text-gray-900 font-medium">
                      Потреби *
                    </Label>
                    <div className="mt-1 space-y-2">
                      {['Опалення', 'ГВП (гаряче водопостачання)', 'Технологічні процеси', 'Вентиляція'].map((need) => (
                        <label key={need} className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-[#27AE60] focus:ring-[#27AE60]"
                          />
                          <span className="ml-2 text-gray-700">{need}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <Label htmlFor="timeline" className="text-gray-900 font-medium">
                      Терміни реалізації *
                    </Label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      required
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27AE60] focus:border-transparent"
                    >
                      <option value="">Оберіть терміни</option>
                      <option value="urgent">Терміново (до 1 місяця)</option>
                      <option value="normal">Стандартно (1-3 місяці)</option>
                      <option value="planned">Планово (3-6 місяців)</option>
                      <option value="future">В перспективі (більше 6 місяців)</option>
                    </select>
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-900 font-medium">
                        Ім'я та прізвище *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Іван Петренко"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="mt-1 focus:ring-[#27AE60] focus:border-[#27AE60]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-gray-900 font-medium">
                        Телефон *
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+380 XX XXX XX XX"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="mt-1 focus:ring-[#27AE60] focus:border-[#27AE60]"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-900 font-medium">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="ivan@company.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="mt-1 focus:ring-[#27AE60] focus:border-[#27AE60]"
                    />
                  </div>

                  {/* Additional Message */}
                  <div>
                    <Label htmlFor="message" className="text-gray-900 font-medium">
                      Додаткова інформація
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Опишіть особливості вашого об'єкта або додаткові вимоги..."
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      className="mt-1 focus:ring-[#27AE60] focus:border-[#27AE60]"
                    />
                  </div>

                  {/* Privacy Agreement */}
                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      required
                      className="mt-1 rounded border-gray-300 text-[#27AE60] focus:ring-[#27AE60]"
                    />
                    <span className="text-sm text-gray-600">
                      Я погоджуюся з обробкою персональних даних та{' '}
                      <a href="#" className="text-[#27AE60] hover:underline">
                        політикою конфіденційності
                      </a>
                    </span>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit"
                    size="lg"
                    className="w-full bg-[#FF9900] hover:bg-[#FF9900]/90 text-white font-semibold py-4 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Отримати кошторис за 24 години
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;