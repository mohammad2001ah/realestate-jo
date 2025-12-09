import React from 'react';
import { Link } from 'react-router-dom';
import './PropertyCard.css';

const PropertyCard = ({ property }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ar-JO', {
      style: 'currency',
      currency: 'JOD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Get first image or placeholder
  const imageUrl = property.images && property.images.length > 0
    ? `http://localhost:5000${property.images[0]}`
    : 'https://via.placeholder.com/400x300?text=لا+توجد+صورة';

  return (
    <Link to={`/properties/${property._id}`} className="property-card">
      <div className="property-image">
        <img src={imageUrl} alt={property.title} />
        <div className="property-price">{formatPrice(property.price)}</div>
      </div>

      <div className="property-details">
        <h3 className="property-title">{property.title}</h3>
        <p className="property-location">📍 {property.location}</p>
        
        <div className="property-specs">
          <span className="spec">
            <span className="spec-icon">🛏️</span>
            {property.bedrooms} غرف
          </span>
          <span className="spec">
            <span className="spec-icon">📐</span>
            {property.area} م²
          </span>
        </div>

        {property.description && (
          <p className="property-description">
            {property.description.substring(0, 100)}
            {property.description.length > 100 && '...'}
          </p>
        )}
      </div>
    </Link>
  );
};

export default PropertyCard;
