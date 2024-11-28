// LanguageSwitcher.js
import React from 'react';

function LanguageSwitcher({ language, onLanguageChange }) {
  const handleLanguageClick = (lang) => {
    onLanguageChange(lang);
  };

  return (
    <div className="language-switcher">
      <button
        className={language === 'ru' ? 'active' : ''}
        onClick={() => handleLanguageClick('ru')}
      >
        Русский
      </button>
      <button
        className={language === 'kg' ? 'active' : ''}
        onClick={() => handleLanguageClick('kg')}
      >
        Кыргызча
      </button>
    </div>
  );
}

export default LanguageSwitcher;
