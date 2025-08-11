import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent } from './ui/card';
import { 
  Settings, 
  Wrench, 
  FileText, 
  Headphones, 
  TrendingUp, 
  Package 
} from 'lucide-react';

const Services = () => {
  const { t } = useLanguage();

  const iconMap = [
    Settings,   // Проєктування котелень
    Wrench,     // Монтаж і пусконалагодження
    FileText,   // Документація та дозволи
    Headphones, // Сервіс 24/7
    TrendingUp, // Енергоаудит і модернізація
    Package     // Постачання обладнання
  ];

  const services = t('services.items') || [];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('services.title')}
          </h2>
          <div className="w-20 h-1 bg-[#27AE60] mx-auto rounded-full"></div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[index];
            
            return (
              <Card 
                key={index}
                className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-[#F2F4F7] border-0 overflow-hidden"
              >
                <CardContent className="p-8 text-center h-full flex flex-col">
                  {/* Icon */}
                  <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 bg-[#27AE60]/10 rounded-full flex items-center justify-center group-hover:bg-[#27AE60] transition-colors duration-300">
                      <IconComponent className="h-8 w-8 text-[#27AE60] group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {service.title}
                    </h3>
                    <p className="text-[#6E7B8B] leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Hover indicator */}
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-full h-1 bg-gradient-to-r from-[#27AE60] to-[#FF9900] rounded-full"></div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-[#27AE60]/5 to-[#FF9900]/5 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Потрібна консультація з вашого проєкту?
            </h3>
            <p className="text-[#6E7B8B] mb-6 max-w-2xl mx-auto">
              Наші інженери безкоштовно оцінюють ваші потреби та пропонують оптимальне рішення
            </p>
            <button className="bg-[#FF9900] hover:bg-[#FF9900]/90 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Отримати консультацію
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;