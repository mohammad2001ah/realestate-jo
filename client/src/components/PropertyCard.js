import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toggleFavorite as toggleFavoriteAPI } from '../services/api';
import './PropertyCard.css';

const PropertyCard = ({ property, isFavorite: initialIsFavorite, onFavoriteChange }) => {
  const { isAuthenticated } = useAuth();
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite || false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsFavorite(initialIsFavorite || false);
  }, [initialIsFavorite]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ar-JO', {
      style: 'currency',
      currency: 'JOD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleFavoriteClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      alert('Please login to add favorites');
      return;
    }

    setIsLoading(true);
    try {
      const response = await toggleFavoriteAPI(property._id);
      setIsFavorite(response.isFavorite);
      
      // Notify parent component if callback provided
      if (onFavoriteChange) {
        onFavoriteChange(property._id, response.isFavorite);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      alert('Failed to update favorite');
    } finally {
      setIsLoading(false);
    }
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
        
        {/* Favorite Button - Only show if authenticated */}
        {isAuthenticated && (
          <button
            onClick={handleFavoriteClick}
            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
            disabled={isLoading}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <span className="heart-icon">
              {isFavorite ? '❤️' : '🤍'}
            </span>
          </button>
        )}
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
