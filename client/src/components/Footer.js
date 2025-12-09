import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-section">
          <h3>{t('footer.about')}</h3>
          <p>{t('footer.aboutDesc')}</p>
        </div>

        <div className="footer-section">
          <h3>{t('footer.quickLinks')}</h3>
          <ul>
            <li><Link to="/">{t('nav.home')}</Link></li>
            <li><Link to="/properties">{t('nav.properties')}</Link></li>
            <li><Link to="/register">{t('nav.register')}</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>{t('footer.contact')}</h3>
          <p>Email: info@realestatejo.com</p>
          <p>Phone: +962 79 123 4567</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Real Estate JO. {t('footer.rights')}.</p>
      </div>
    </footer>
  );
};

export default Footer;
