import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { mockData } from '../mock';
import { HelpCircle, MessageCircle } from 'lucide-react';

const FAQ = () => {
  const { t } = useLanguage();
  const faqItems = mockData.faq;

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center mb-4">
            <HelpCircle className="h-12 w-12 text-[#27AE60] mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Часті питання
            </h2>
          </div>
          <p className="text-xl text-[#6E7B8B] max-w-2xl mx-auto">
            Відповіді на найпоширеніші питання про наші послуги та рішення
          </p>
          <div className="w-20 h-1 bg-[#27AE60] mx-auto rounded-full mt-6"></div>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-b border-gray-100 last:border-b-0"
              >
                <AccordionTrigger className="px-6 py-6 text-left hover:bg-gray-50 transition-colors duration-200 group">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-[#27AE60]/10 rounded-full flex items-center justify-center group-hover:bg-[#27AE60] transition-colors duration-200">
                      <span className="text-[#27AE60] group-hover:text-white font-semibold text-sm">
                        {index + 1}
                      </span>
                    </div>
                    <span className="text-lg font-semibold text-gray-900 group-hover:text-[#27AE60] transition-colors duration-200">
                      {item.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="ml-12 text-[#6E7B8B] leading-relaxed text-base">
                    {item.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-[#27AE60]/10 to-[#FF9900]/10 rounded-2xl p-8 border border-gray-200">
            <MessageCircle className="h-12 w-12 text-[#27AE60] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Не знайшли відповідь на своє питання?
            </h3>
            <p className="text-[#6E7B8B] mb-6 max-w-md mx-auto">
              Наші експерти готові відповісти на будь-які питання про теплові рішення для вашого бізнесу
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#27AE60] hover:bg-[#27AE60]/90 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105">
                Зателефонувати експерту
              </button>
              <button className="bg-[#FF9900] hover:bg-[#FF9900]/90 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105">
                Написати в чат
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;