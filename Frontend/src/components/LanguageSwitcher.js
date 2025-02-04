// frontend/src/components/LanguageSwitcher.js
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="btn-group">
      <button
        className="btn btn-outline-light language-btn"
        onClick={() => changeLanguage('tr')}
      >
        TR
      </button>
      <button
        className="btn btn-outline-light language-btn"
        onClick={() => changeLanguage('en')}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
