import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { deleteProperty } from '../services/api';
import PropertyCard from '../components/PropertyCard';
import './MyProperties.css';

const MyProperties = () => {
  const { t } = useTranslation();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyProperties();
  }, []);

  const fetchMyProperties = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/properties/my-properties', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setProperties(data.data);
      } else {
        setError(data.message || 'Failed to load properties');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(t('property.confirmDelete'))) {
      try {
        await deleteProperty(id);
        setProperties(properties.filter(p => p._id !== id));
      } catch (err) {
        alert(t('property.deleteFailed'));
      }
    }
  };

  return (
    <div className="my-properties-page">
      <div className="my-properties-header">
        <div className="container">
          <h1 className="fade-in">{t('property.myProperties')}</h1>
          <p className="slide-in-left">{t('property.manageProperties')}</p>
        </div>
      </div>

      <div className="container my-properties-content">
        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading-container">
            <div className="loading"></div>
          </div>
        ) : properties.length > 0 ? (
          <>
            <div className="properties-count">
              <p>{t('property.youHave')} {properties.length} {t('property.properties_count')}</p>
              <button onClick={() => navigate('/add-property')} className="btn btn-primary">
                {t('property.addProperty')}
              </button>
            </div>
            <div className="properties-grid">
              {properties.map((property) => (
                <div key={property._id} className="property-item">
                  <PropertyCard property={property} />
                  <div className="property-actions">
                    <button 
                      onClick={() => navigate(`/edit-property/${property._id}`)}
                      className="btn btn-secondary"
                    >
                      {t('property.edit')}
                    </button>
                    <button 
                      onClick={() => handleDelete(property._id)}
                      className="btn btn-danger"
                    >
                      {t('property.delete')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="no-properties">
            <p>{t('property.noPropertiesYet')}</p>
            <button onClick={() => navigate('/add-property')} className="btn btn-primary">
              {t('property.addNow')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProperties;
