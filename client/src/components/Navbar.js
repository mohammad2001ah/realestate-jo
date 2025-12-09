import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="logo">
          <span className="logo-icon">🏠</span>
          <span className="logo-text">Real Estate JO</span>
        </Link>

        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-link">{t('nav.home')}</Link>
          </li>
          <li>
            <Link to="/properties" className="nav-link">{t('nav.properties')}</Link>
          </li>
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
          {/* Language Switcher */}
          <button onClick={toggleLanguage} className="language-switcher" title="Change Language">
            {i18n.language === 'en' ? '🇯🇴 AR' : '🇬🇧 EN'}
          </button>

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
              <button onClick={logout} className="btn btn-secondary">
                {t('nav.logout')}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary">
                {t('nav.login')}
              </Link>
              <Link to="/register" className="btn btn-primary">
                {t('nav.register')}
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
