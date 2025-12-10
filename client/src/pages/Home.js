import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Home.css';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <h1 className="hero-title fade-in">
            {t('home.heroTitle')}
          </h1>
          <p className="hero-subtitle slide-in-left">
            {t('home.heroSubtitle')}
          </p>
          <div className="hero-actions slide-in-right">
            <Link to="/properties" className="btn btn-primary btn-large">
              {t('home.browseProperties')}
            </Link>
            <Link to="/register" className="btn btn-secondary btn-large">
              {t('home.getStarted')}
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-us" id="about">
        <div className="container">
          <h2 className="section-title">{t('about.title')}</h2>
          <div className="about-content">
            <div className="about-text">
              <h3>{t('about.subtitle')}</h3>
              <p>{t('about.description1')}</p>
              <p>{t('about.description2')}</p>
              <div className="about-stats">
                <div className="stat-item">
                  <h4>500+</h4>
                  <p>{t('about.propertiesListed')}</p>
                </div>
                <div className="stat-item">
                  <h4>1000+</h4>
                  <p>{t('about.happyClients')}</p>
                </div>
                <div className="stat-item">
                  <h4>50+</h4>
                  <p>{t('about.expertAgents')}</p>
                </div>
              </div>
            </div>
            <div className="about-image">
              <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600" alt={t('about.title')} />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="contact-us" id="contact">
        <div className="container">
          <h2 className="section-title">{t('contact.title')}</h2>
          <p className="section-subtitle">{t('contact.subtitle')}</p>
          
          <div className="contact-content">
            <div className="contact-info">
              <h3>{t('contact.infoTitle')}</h3>
              <p className="contact-description">{t('contact.infoDesc')}</p>
              
              <div className="contact-items">
                <div className="contact-item">
                  <div className="contact-icon">📍</div>
                  <div>
                    <h4>{t('contact.address')}</h4>
                    <p>{t('contact.addressValue')}</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">📞</div>
                  <div>
                    <h4>{t('contact.phone')}</h4>
                    <p>+962 79 123 4567</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">✉️</div>
                  <div>
                    <h4>{t('contact.email')}</h4>
                    <p>info@realestatejo.com</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">🕒</div>
                  <div>
                    <h4>{t('contact.hours')}</h4>
                    <p>{t('contact.hoursValue')}</p>
                  </div>
                </div>
              </div>

              <div className="social-links">
                <h4>{t('contact.followUs')}</h4>
                <div className="social-icons">
                  <a href="#" className="social-icon">📘</a>
                  <a href="#" className="social-icon">📷</a>
                  <a href="#" className="social-icon">🐦</a>
                  <a href="#" className="social-icon">💼</a>
                </div>
              </div>
            </div>

            <div className="contact-form">
              <form>
                <div className="form-row">
                  <div className="form-group">
                    <label>{t('contact.firstName')}</label>
                    <input type="text" placeholder="John" required />
                  </div>
                  <div className="form-group">
                    <label>{t('contact.lastName')}</label>
                    <input type="text" placeholder="Doe" required />
                  </div>
                </div>
                <div className="form-group">
                  <label>{t('contact.emailAddress')}</label>
                  <input type="email" placeholder="john.doe@example.com" required />
                  </div>
                <div className="form-group">
                  <label>{t('contact.phoneNumber')}</label>
                  <input type="tel" placeholder="+962 79 123 4567" required />
                </div>
                <div className="form-group">
                  <label>{t('contact.subject')}</label>
                  <input type="text" placeholder={t('contact.subjectPlaceholder')} required />
                </div>
                <div className="form-group">
                  <label>{t('contact.message')}</label>
                  <textarea rows="6" placeholder={t('contact.messagePlaceholder')} required></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-full">
                  {t('contact.sendMessage')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container cta-content">
          <h2>{t('home.ctaTitle')}</h2>
          <p>{t('home.ctaDesc')}</p>
          <Link to="/add-property" className="btn btn-primary btn-large">
            {t('home.addYourProperty')}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
