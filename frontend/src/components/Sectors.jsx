import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent } from './ui/card';
import { mockData } from '../mock';

const Sectors = () => {
  const { t } = useLanguage();
  const sectors = t('sectors.items') || [];

  return (
    <section id="sectors" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('sectors.title')}
          </h2>
          <div className="w-20 h-1 bg-[#27AE60] mx-auto rounded-full"></div>
        </div>

        {/* Sectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sectors.map((sector, index) => (
            <Card 
              key={index}
              className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 overflow-hidden cursor-pointer"
            >
              <div 
                className="h-48 bg-cover bg-center relative"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${mockData.images.sectors[index % mockData.images.sectors.length]})`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-lg mb-1">
                    {sector.name}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {sector.description}
                  </p>
                </div>
              </div>
              <CardContent className="p-6 bg-white">
                <div className="flex items-center justify-between">
                  <span className="text-[#27AE60] font-medium text-sm">
                    Детальніше
                  </span>
                  <div className="w-8 h-8 bg-[#27AE60]/10 rounded-full flex items-center justify-center group-hover:bg-[#27AE60] transition-colors duration-300">
                    <svg className="w-4 h-4 text-[#27AE60] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#27AE60] mb-2">50+</div>
              <div className="text-[#6E7B8B] text-sm">Виробничих об'єктів</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#FF9900] mb-2">30+</div>
              <div className="text-[#6E7B8B] text-sm">ТРЦ та офісів</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#27AE60] mb-2">25+</div>
              <div className="text-[#6E7B8B] text-sm">Готелів та ресторанів</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#FF9900] mb-2">40+</div>
              <div className="text-[#6E7B8B] text-sm">Інших об'єктів</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sectors;