import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isAdminPage = location.pathname.startsWith('/admin');
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  // Load saved language on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'en';
    if (i18n.language !== savedLang) {
      i18n.changeLanguage(savedLang);
      document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = savedLang;
    }
  }, [i18n]);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    setShowLangDropdown(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleLogout = () => {
    logout();
    // Redirect to login page after logout
    window.location.href = '/login';
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="logo">
          <span className="logo-icon">🏠</span>
          <span className="logo-text">Real Estate JO</span>
        </Link>

        <ul className="nav-links">
          {/* Hide Home link for admin and agent users */}
          {!(isAuthenticated && (user?.role === 'agent' || user?.role === 'admin')) && (
            <li>
              <Link to="/" onClick={scrollToTop} className="nav-link">{t('nav.home')}</Link>
            </li>
          )}
          <li>
            <Link to="/properties" className="nav-link">{t('nav.properties')}</Link>
          </li>
          {isAuthenticated && (
            <li>
              <Link to="/favorites" className="nav-link">{t('nav.favorites')}</Link>
            </li>
          )}
          {/* Show About and Contact on home page only (not on admin page) */}
          {isHomePage && !isAdminPage && (
            <>
              <li>
                <button onClick={() => scrollToSection('.about-us')} className="nav-link nav-link-btn">
                  {t('nav.about')}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('.contact-us')} className="nav-link nav-link-btn">
                  {t('nav.contact')}
                </button>
              </li>
            </>
          )}
          {isAuthenticated && (user?.role === 'agent' || user?.role === 'admin') && (
            <>
              <li>
                <Link to="/add-property" className="nav-link">{t('nav.addProperty')}</Link>
              </li>
              <li>
                <Link to="/my-properties" className="nav-link">{t('nav.myProperties')}</Link>
              </li>
            </>
          )}
          {isAuthenticated && user?.role === 'admin' && (
            <li>
              <Link to="/admin" className="nav-link">{t('nav.admin')}</Link>
            </li>
          )}
        </ul>

        <div className="nav-actions">
          {/* Language Dropdown - Hide on admin page */}
          {!isAdminPage && (
            <div className="language-dropdown">
              <button 
                onClick={() => setShowLangDropdown(!showLangDropdown)} 
                className="language-btn"
              >
                {i18n.language === 'en' ? 'English' : 'العربية'}
                <span className="dropdown-arrow">▼</span>
              </button>
              {showLangDropdown && (
                <div className="language-menu">
                  <button 
                    onClick={() => changeLanguage('en')} 
                    className={`language-option ${i18n.language === 'en' ? 'active' : ''}`}
                  >
                    English
                  </button>
                  <button 
                    onClick={() => changeLanguage('ar')} 
                    className={`language-option ${i18n.language === 'ar' ? 'active' : ''}`}
                  >
                    العربية
                  </button>
                </div>
              )}
            </div>
          )}

          {isAuthenticated ? (
            <>
              <div className="user-info">
                <span className="user-name">{user?.name || user?.email}</span>
                {user?.role && user.role !== 'user' && (
                  <span className={`role-badge role-${user.role}`}>
                    {user.role === 'admin' ? (i18n.language === 'ar' ? 'مدير' : 'Admin') : (i18n.language === 'ar' ? 'وكيل' : 'Agent')}
                  </span>
                )}
              </div>
              <button onClick={handleLogout} className="btn btn-secondary">
                {t('nav.logout')}
              </button>
            </>
          ) : (
            /* Hide login/register buttons on home page for cleaner look */
            !isHomePage && (
              <>
                <Link to="/login" className="btn btn-secondary">
                  {t('nav.login')}
                </Link>
                <Link to="/register" className="btn btn-primary">
                  {t('nav.register')}
                </Link>
              </>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
