import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { mockData } from '../mock';
import { 
  Flame, 
  Zap, 
  Thermometer, 
  Clock, 
  DollarSign, 
  ArrowRight 
} from 'lucide-react';

const Solutions = () => {
  const { t } = useLanguage();
  const solutions = mockData.solutions;

  const iconMap = [Flame, Zap, Thermometer];

  return (
    <section id="solutions" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Наші рішення
          </h2>
          <p className="text-xl text-[#6E7B8B] max-w-3xl mx-auto">
            Каталог-вітрина теплових рішень для різних типів об'єктів
          </p>
          <div className="w-20 h-1 bg-[#27AE60] mx-auto rounded-full mt-6"></div>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => {
            const IconComponent = iconMap[index];
            
            return (
              <Card 
                key={solution.id}
                className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-0 overflow-hidden bg-white"
              >
                {/* Card Header with Icon */}
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#27AE60] to-[#27AE60]/80 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-7 w-7 text-white" />
                    </div>
                    <Badge variant="outline" className="text-[#27AE60] border-[#27AE60]">
                      Популярно
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#27AE60] transition-colors duration-300">
                    {solution.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#6E7B8B] mb-6 leading-relaxed">
                    {solution.description}
                  </p>

                  {/* Specifications */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-3">
                      <Thermometer className="h-4 w-4 text-[#27AE60]" />
                      <span className="text-sm text-gray-700">
                        <strong>Потужність:</strong> {solution.powerRange}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Clock className="h-4 w-4 text-[#FF9900]" />
                      <span className="text-sm text-gray-700">
                        <strong>Терміни:</strong> {solution.timeline}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-700">
                        <strong>Бюджет:</strong> {solution.budgetRange}
                      </span>
                    </div>
                  </div>

                  {/* Brands */}
                  <div className="mb-6">
                    <p className="text-xs text-[#6E7B8B] mb-2">Бренди партнери:</p>
                    <p className="text-sm font-medium text-gray-800">{solution.brands}</p>
                  </div>

                  {/* CTA Button */}
                  <Button 
                    className="w-full bg-[#FF9900] hover:bg-[#FF9900]/90 text-white group-hover:shadow-lg transition-all duration-300"
                  >
                    Запросити кошторис
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-[#27AE60]/10 to-[#FF9900]/10 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Не знайшли підходяще рішення?
            </h3>
            <p className="text-[#6E7B8B] mb-6 max-w-2xl mx-auto">
              Ми розробляємо індивідуальні теплові системи під специфічні потреби вашого бізнесу
            </p>
            <Button 
              size="lg"
              className="bg-[#27AE60] hover:bg-[#27AE60]/90 text-white px-8 py-3 font-semibold transition-all duration-200 transform hover:scale-105"
            >
              Обговорити індивідуальний проєкт
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;