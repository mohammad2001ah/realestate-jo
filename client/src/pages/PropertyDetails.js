import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getPropertyById } from '../services/api';
import './PropertyDetails.css';

const PropertyDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    setLoading(true);
    try {
      const data = await getPropertyById(id);
      setProperty(data.data);
    } catch (err) {
      setError('Failed to load property details');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'JOD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleWhatsApp = () => {
    const phone = property.contactWhatsapp || property.contactPhone;
    const message = `Hello, I'm interested in the property: ${property.title}`;
    window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = `tel:${property.contactPhone}`;
  };

  const handleEmail = () => {
    if (property.contactEmail) {
      window.location.href = `mailto:${property.contactEmail}?subject=Inquiry about ${property.title}`;
    }
  };

  if (loading) {
    return (
      <div className="loading-page">
        <div className="loading"></div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="error-page">
        <h2>{error || 'Property not found'}</h2>
        <button onClick={() => navigate('/properties')} className="btn btn-primary">
          {t('property.backButton')}
        </button>
      </div>
    );
  }

  const images = property.images && property.images.length > 0 
    ? property.images.map(img => `http://localhost:5000${img}`)
    : ['https://via.placeholder.com/800x600?text=No+Image'];

  return (
    <div className="property-details-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-button">
          ← {t('property.backButton')}
        </button>

        <div className="property-details-content">
          {/* Left Side - Images */}
          <div className="property-images-section">
            <div className="main-image">
              <img src={images[selectedImage]} alt={property.title} />
            </div>
            {images.length > 1 && (
              <div className="image-thumbnails">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={img} alt={`${property.title} ${index + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Side - Property Info */}
          <div className="property-info-section">
            <div className="property-header">
              <h1>{property.title}</h1>
              <div className="property-price">{formatPrice(property.price)}</div>
            </div>

            <div className="property-location">
              <span className="icon">📍</span>
              <span>{property.location}</span>
            </div>

            {/* Property Specs */}
            <div className="property-specs-grid">
              <div className="spec-item">
                <div className="spec-icon">🛏️</div>
                <div className="spec-details">
                  <span className="spec-label">{t('property.bedrooms')}</span>
                  <span className="spec-value">{property.bedrooms}</span>
                </div>
              </div>
              <div className="spec-item">
                <div className="spec-icon">📐</div>
                <div className="spec-details">
                  <span className="spec-label">{t('property.area')}</span>
                  <span className="spec-value">{property.area} {t('common.sqm')}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            {property.description && (
              <div className="property-description">
                <h3>{t('property.description')}</h3>
                <p>{property.description}</p>
              </div>
            )}

            {/* Contact Information */}
            <div className="contact-section">
              <h3>{t('property.contactSection')}</h3>
              <div className="contact-buttons">
                <button onClick={handleCall} className="btn btn-contact btn-phone">
                  <span className="icon">📞</span>
                  {t('property.callNow')}
                </button>
                {property.contactWhatsapp && (
                  <button onClick={handleWhatsApp} className="btn btn-contact btn-whatsapp">
                    <span className="icon">💬</span>
                    WhatsApp
                  </button>
                )}
                {property.contactEmail && (
                  <button onClick={handleEmail} className="btn btn-contact btn-email">
                    <span className="icon">✉️</span>
                    {t('property.sendEmail')}
                  </button>
                )}
              </div>

              <div className="contact-details">
                <div className="contact-item">
                  <span className="label">{t('property.phone')}:</span>
                  <span className="value">{property.contactPhone}</span>
                </div>
                {property.contactWhatsapp && (
                  <div className="contact-item">
                    <span className="label">{t('property.whatsapp')}:</span>
                    <span className="value">{property.contactWhatsapp}</span>
                  </div>
                )}
                {property.contactEmail && (
                  <div className="contact-item">
                    <span className="label">{t('property.email')}:</span>
                    <span className="value">{property.contactEmail}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Property Meta */}
            <div className="property-meta">
              <p>{t('property.dateAdded')}: {new Date(property.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
