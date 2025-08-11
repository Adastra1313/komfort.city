import React, { createContext, useContext, useState } from 'react';
import { mockData } from '../mock';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('ua');

  const changeLanguage = (lang) => {
    setCurrentLanguage(lang);
  };

  const t = (path) => {
    const keys = path.split('.');
    let value = mockData.translations[currentLanguage];
    
    for (const key of keys) {
      value = value?.[key];
    }
    
    return value || path;
  };

  const languages = [
    { code: 'ua', name: 'UA', flag: '🇺🇦' },
    { code: 'ru', name: 'RU', flag: '🇷🇺' },
    { code: 'en', name: 'EN', flag: '🇺🇸' }
  ];

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      changeLanguage,
      t,
      languages
    }}>
      {children}
    </LanguageContext.Provider>
  );
};