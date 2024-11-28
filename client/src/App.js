import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import NewsPage from './components/NewsList';
import ArticleView from './components/ArticleView';
import VideosPage from './components/VideosPage';
import PartnersPage from './components/PartnersPage';
import ProjectsPage from './components/ProjectsPage';
import ContactsPage from './components/ContactsPage';

function App() {
  const [language, setLanguage] = useState('ru');
  const [accessibleMode, setAccessibleMode] = useState(false);

  const toggleAccessibleMode = () => {
    setAccessibleMode(!accessibleMode);
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <div className={accessibleMode ? 'accessible-mode' : ''}>
     <Header toggleAccessibleMode={toggleAccessibleMode} changeLanguage={changeLanguage} language={language} />
      <Routes>
        <Route path="/" element={<Home language={language} />} />
        <Route path="/news" element={<NewsPage language={language} />} />
        <Route path="/article/:id" element={<ArticleView language={language} />} />
        <Route path="/videos" element={<VideosPage language={language} />} />
        <Route path="/partners" element={<PartnersPage language={language} />} />
        <Route path="/projects" element={<ProjectsPage language={language} />} />
        <Route path="/contacts" element={<ContactsPage language={language} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;