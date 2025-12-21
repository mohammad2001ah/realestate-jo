import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getFavorites } from '../services/api';
import PropertyCard from '../components/PropertyCard';
import './Favorites.css';

const Favorites = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    fetchFavorites();
  }, [isAuthenticated, navigate]);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getFavorites();
      setFavorites(response.data || []);
    } catch (err) {
      console.error('Error fetching favorites:', err);
      setError('Failed to load favorites. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteChange = (propertyId, isFavorite) => {
    if (!isFavorite) {
      // Remove from favorites list
      setFavorites(favorites.filter(fav => fav._id !== propertyId));
    }
  };

  if (loading) {
    return (
      <div className="favorites-page">
        <div className="container">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading your favorites...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="favorites-page">
        <div className="container">
          <div className="error-state">
            <span className="error-icon">⚠️</span>
            <h2>Oops!</h2>
            <p>{error}</p>
            <button onClick={fetchFavorites} className="btn btn-primary">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <div className="container">
        <div className="favorites-header">
          <h1>My Favorites</h1>
          <p className="favorites-count">
            {favorites.length === 0
              ? 'No favorites yet'
              : `${favorites.length} ${favorites.length === 1 ? 'property' : 'properties'} saved`}
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">💔</span>
            <h2>No Favorites Yet</h2>
            <p>Start exploring properties and save your favorites!</p>
            <button onClick={() => navigate('/properties')} className="btn btn-primary">
              Browse Properties
            </button>
          </div>
        ) : (
          <div className="favorites-grid">
            {favorites.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
                isFavorite={true}
                onFavoriteChange={handleFavoriteChange}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
