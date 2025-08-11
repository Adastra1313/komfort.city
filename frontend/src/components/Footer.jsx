import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Youtube, 
  Linkedin, 
  ExternalLink 
} from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

  const navSections = [
    {
      title: 'Послуги',
      links: [
        { name: 'Проєктування котелень', href: '#services' },
        { name: 'Монтаж систем', href: '#services' },
        { name: 'Пусконалагодження', href: '#services' },
        { name: 'Сервісне обслуговування', href: '#services' },
        { name: 'Енергоаудит', href: '#services' }
      ]
    },
    {
      title: 'Рішення',
      links: [
        { name: 'Газові котельні', href: '#solutions' },
        { name: 'Електричні котельні', href: '#solutions' },
        { name: 'ІТП та теплопункти', href: '#solutions' },
        { name: 'Каскадні системи', href: '#solutions' },
        { name: 'Автоматизація', href: '#solutions' }
      ]
    },
    {
      title: 'Компанія',
      links: [
        { name: 'Про нас', href: '#about' },
        { name: 'Проєкти', href: '#projects' },
        { name: 'Сертифікації', href: '#certifications' },
        { name: 'Блог', href: '#blog' },
        { name: 'Кар\'єра', href: '#career' }
      ]
    },
    {
      title: 'Підтримка',
      links: [
        { name: 'Контакти', href: '#contacts' },
        { name: 'Технічна підтримка', href: '#support' },
        { name: 'Документація', href: '#documentation' },
        { name: 'FAQ', href: '#faq' },
        { name: 'Гарантії', href: '#warranty' }
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            
            {/* Company Info - Spans 2 columns */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <a href="#" className="text-3xl font-bold">
                  Komfort<span className="text-[#27AE60]">.City</span>
                </a>
                <p className="text-gray-400 mt-2 text-sm">
                  Енергоефективні теплові рішення для бізнесу та промисловості
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-4 text-sm">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-[#27AE60] flex-shrink-0" />
                  <span>{t('footer.phone')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-[#FF9900] flex-shrink-0" />
                  <span>{t('footer.email')}</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-[#27AE60] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">{t('footer.address')}</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-6">
                <p className="text-sm text-gray-400 mb-3">Слідкуйте за нами:</p>
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#27AE60] transition-colors duration-300"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#FF9900] transition-colors duration-300"
                  >
                    <Youtube className="h-5 w-5" />
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#27AE60] transition-colors duration-300"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Navigation Sections */}
            {navSections.map((section, index) => (
              <div key={index} className="lg:col-span-1">
                <h3 className="text-lg font-semibold mb-4 text-white">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a 
                        href={link.href}
                        className="text-gray-400 hover:text-[#27AE60] transition-colors duration-200 text-sm flex items-center group"
                      >
                        {link.name}
                        <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications & Partners */}
        <div className="py-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Certifications */}
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-4">
                Сертифікації та дозволи:
              </h4>
              <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                <span className="bg-gray-800 px-3 py-1 rounded">ISO 9001:2015</span>
                <span className="bg-gray-800 px-3 py-1 rounded">ДСТУ-Н Б В.1.1-27:2010</span>
                <span className="bg-gray-800 px-3 py-1 rounded">ДБН В.2.5-39:2008</span>
                <span className="bg-gray-800 px-3 py-1 rounded">Ліцензія на будівництво</span>
              </div>
            </div>

            {/* Partners */}
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-4">
                Партнери та бренди:
              </h4>
              <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                <span className="bg-gray-800 px-3 py-1 rounded">Bosch</span>
                <span className="bg-gray-800 px-3 py-1 rounded">Viessmann</span>
                <span className="bg-gray-800 px-3 py-1 rounded">Vaillant</span>
                <span className="bg-gray-800 px-3 py-1 rounded">Baxi</span>
                <span className="bg-gray-800 px-3 py-1 rounded">Danfoss</span>
                <span className="bg-gray-800 px-3 py-1 rounded">Honeywell</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Legal Info */}
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-400">
                © 2025 {t('footer.company')}. Всі права захищені.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                ЄДРПОУ: ХХХХХХХХ | Ліцензія: АВ №XXXXXX
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex space-x-6 text-sm">
              <a 
                href="#" 
                className="text-gray-400 hover:text-[#27AE60] transition-colors duration-200"
              >
                {t('footer.privacy')}
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-[#27AE60] transition-colors duration-200"
              >
                Умови використання
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-[#27AE60] transition-colors duration-200"
              >
                Договір публічної оферти
              </a>
            </div>
          </div>
        </div>

        {/* Emergency Contact Banner */}
        <div className="bg-gradient-to-r from-[#27AE60]/20 to-[#FF9900]/20 rounded-2xl p-6 mb-8 border border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div>
              <h4 className="text-lg font-semibold text-white mb-1">
                Аварійна служба 24/7
              </h4>
              <p className="text-gray-300 text-sm">
                Цілодобова підтримка та усунення аварій теплових систем
              </p>
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
              <a 
                href="tel:+380xxxxxxxxx" 
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200 text-center"
              >
                📞 Аварійна служба
              </a>
              <a 
                href="#" 
                className="bg-[#27AE60] hover:bg-[#27AE60]/90 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200 text-center"
              >
                💬 Онлайн чат
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;