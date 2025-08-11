import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent } from './ui/card';
import { 
  Zap, 
  Lightbulb, 
  Shield, 
  CheckCircle 
} from 'lucide-react';

const Advantages = () => {
  const { t } = useLanguage();
  const advantages = t('advantages.items') || [];

  const iconMap = [
    Zap,        // Енергоефективно
    Lightbulb,  // Інноваційно
    Shield,     // Безпечно
    CheckCircle // Під ключ
  ];

  return (
    <section id="advantages" className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#27AE60]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FF9900]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('advantages.title')}
          </h2>
          <p className="text-xl text-[#6E7B8B] max-w-3xl mx-auto">
            Чому бізнес обирає нас для вирішення питань теплопостачання
          </p>
          <div className="w-20 h-1 bg-[#27AE60] mx-auto rounded-full mt-6"></div>
        </div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {advantages.map((advantage, index) => {
            const IconComponent = iconMap[index];
            
            return (
              <Card 
                key={index}
                className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50/50 overflow-hidden"
              >
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#27AE60] to-[#27AE60]/80 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#27AE60] transition-colors duration-300">
                        {advantage.title}
                      </h3>
                      <p className="text-[#6E7B8B] leading-relaxed text-lg">
                        {advantage.description}
                      </p>
                    </div>
                  </div>

                  {/* Animated bottom border */}
                  <div className="mt-6">
                    <div className="w-0 h-1 bg-gradient-to-r from-[#27AE60] to-[#FF9900] rounded-full group-hover:w-full transition-all duration-500"></div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Process Timeline */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Як ми працюємо
            </h3>
            <p className="text-[#6E7B8B]">
              5 простих кроків до ефективної теплової системи
            </p>
          </div>

          <div className="relative">
            {/* Process Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#27AE60] to-[#FF9900] transform -translate-y-1/2"></div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { step: "1", title: "Заявка", desc: "Прийом та обробка запиту" },
                { step: "2", title: "Аудит", desc: "Виїзд інженера на об'єкт" },
                { step: "3", title: "Проєкт", desc: "Розробка та кошторис" },
                { step: "4", title: "Монтаж", desc: "Встановлення та пуск" },
                { step: "5", title: "Сервіс", desc: "Обслуговування 24/7" }
              ].map((item, index) => (
                <div key={index} className="text-center relative">
                  <div className="w-12 h-12 bg-white border-4 border-[#27AE60] rounded-full flex items-center justify-center font-bold text-[#27AE60] mx-auto mb-4 relative z-10">
                    {item.step}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-[#6E7B8B]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advantages;