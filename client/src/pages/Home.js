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
      <section className="about-us">
        <div className="container">
          <h2 className="section-title">About Us</h2>
          <div className="about-content">
            <div className="about-text">
              <h3>Your Trusted Real Estate Partner in Jordan</h3>
              <p>
                We are a leading real estate platform in Jordan, dedicated to helping you find your dream home. 
                With years of experience and a commitment to excellence, we provide a seamless property search 
                experience for buyers, sellers, and renters.
              </p>
              <p>
                Our team of professional agents works tirelessly to ensure that every property listed on our 
                platform meets the highest standards of quality and authenticity. Whether you're looking for 
                a luxury villa, a modern apartment, or a commercial space, we have the perfect property for you.
              </p>
              <div className="about-stats">
                <div className="stat-item">
                  <h4>500+</h4>
                  <p>Properties Listed</p>
                </div>
                <div className="stat-item">
                  <h4>1000+</h4>
                  <p>Happy Clients</p>
                </div>
                <div className="stat-item">
                  <h4>50+</h4>
                  <p>Expert Agents</p>
                </div>
              </div>
            </div>
            <div className="about-image">
              <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600" alt="About Us" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="contact-us">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
          
          <div className="contact-content">
            <div className="contact-info">
              <h3>Contact Information</h3>
              <p className="contact-description">Fill out the form and our team will get back to you within 24 hours.</p>
              
              <div className="contact-items">
                <div className="contact-item">
                  <div className="contact-icon">📍</div>
                  <div>
                    <h4>Address</h4>
                    <p>Abdoun, Amman, Jordan</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">📞</div>
                  <div>
                    <h4>Phone</h4>
                    <p>+962 79 123 4567</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">✉️</div>
                  <div>
                    <h4>Email</h4>
                    <p>info@realestatejo.com</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">🕒</div>
                  <div>
                    <h4>Working Hours</h4>
                    <p>Sun - Thu: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="social-links">
                <h4>Follow Us</h4>
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
                    <label>First Name</label>
                    <input type="text" placeholder="John" required />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" placeholder="Doe" required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="john.doe@example.com" required />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" placeholder="+962 79 123 4567" required />
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input type="text" placeholder="How can we help you?" required />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea rows="6" placeholder="Write your message here..." required></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-full">
                  Send Message
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
