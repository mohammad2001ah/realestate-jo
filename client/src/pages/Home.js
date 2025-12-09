import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAllProperties } from '../services/api';
import PropertyCard from '../components/PropertyCard';
import './Home.css';

const Home = () => {
  const { t } = useTranslation();
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getAllProperties();
        setFeaturedProperties(data.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

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
        <div className="hero-decoration"></div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card fade-in">
              <div className="feature-icon">🔍</div>
              <h3>{t('home.searchFeature')}</h3>
              <p>{t('home.searchDesc')}</p>
            </div>
            <div className="feature-card fade-in">
              <div className="feature-icon">✅</div>
              <h3>{t('home.verifiedFeature')}</h3>
              <p>{t('home.verifiedDesc')}</p>
            </div>
            <div className="feature-card fade-in">
              <div className="feature-icon">💼</div>
              <h3>{t('home.professionalFeature')}</h3>
              <p>{t('home.professionalDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="featured-properties">
        <div className="container">
          <h2 className="section-title">{t('home.featuredProperties')}</h2>
          
          {loading ? (
            <div className="loading-container">
              <div className="loading"></div>
            </div>
          ) : (
            <div className="properties-grid">
              {featuredProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}

          <div className="view-all">
            <Link to="/properties" className="btn btn-primary">
              {t('home.viewAll')}
            </Link>
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
