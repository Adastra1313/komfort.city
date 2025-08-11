import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';

const Header = () => {
  const { t, currentLanguage, changeLanguage, languages } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { key: 'about', href: '#about' },
    { key: 'solutions', href: '#solutions' },
    { key: 'services', href: '#services' },
    { key: 'projects', href: '#projects' },
    { key: 'certifications', href: '#certifications' },
    { key: 'documentation', href: '#documentation' },
    { key: 'blog', href: '#blog' },
    { key: 'contacts', href: '#contacts' }
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="text-2xl font-bold text-gray-900">
              Komfort<span className="text-[#27AE60]">.City</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-[#6E7B8B] hover:text-[#27AE60] transition-colors duration-200 text-sm font-medium"
              >
                {t(`nav.${item.key}`)}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2 text-[#6E7B8B] hover:text-[#27AE60]"
                >
                  <Globe className="h-4 w-4" />
                  <span>{currentLang?.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`flex items-center space-x-2 ${
                      currentLanguage === lang.code ? 'bg-gray-100' : ''
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* CTA Button */}
            <Button 
              className="bg-[#FF9900] hover:bg-[#FF9900]/90 text-white px-6 py-2 font-medium transition-all duration-200 transform hover:scale-105"
            >
              {t('nav.getEstimate')}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#6E7B8B]"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="block px-3 py-2 text-[#6E7B8B] hover:text-[#27AE60] hover:bg-gray-50 rounded-md text-base font-medium transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t(`nav.${item.key}`)}
                </a>
              ))}
              
              {/* Mobile Language Switcher */}
              <div className="px-3 py-2">
                <div className="flex space-x-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`px-2 py-1 rounded text-sm ${
                        currentLanguage === lang.code 
                          ? 'bg-[#27AE60] text-white' 
                          : 'bg-gray-100 text-[#6E7B8B]'
                      }`}
                    >
                      {lang.flag} {lang.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile CTA */}
              <div className="px-3 py-2">
                <Button 
                  className="w-full bg-[#FF9900] hover:bg-[#FF9900]/90 text-white font-medium"
                >
                  {t('nav.getEstimate')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;