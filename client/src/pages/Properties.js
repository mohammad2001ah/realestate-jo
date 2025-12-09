import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getAllProperties } from '../services/api';
import PropertyCard from '../components/PropertyCard';
import './Properties.css';

const Properties = () => {
  const { t } = useTranslation();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async (filterParams = {}) => {
    setLoading(true);
    try {
      const data = await getAllProperties(filterParams);
      setProperties(data.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const activeFilters = {};
    Object.keys(filters).forEach(key => {
      if (filters[key]) activeFilters[key] = filters[key];
    });
    fetchProperties(activeFilters);
  };

  const handleReset = () => {
    setFilters({
      location: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
    });
    fetchProperties();
  };

  return (
    <div className="properties-page">
      <div className="properties-header">
        <div className="container">
          <h1 className="fade-in">{t('property.allProperties')}</h1>
          <p className="slide-in-left">{t('property.discoverProperties')}</p>
        </div>
      </div>

      <div className="container properties-content">
        {/* Filters */}
        <aside className="filters-sidebar">
          <div className="filters-card">
            <h3>{t('property.searchAndFilter')}</h3>
            <form onSubmit={handleSearch}>
              <div className="input-group">
                <label>{t('property.location')}</label>
                <input
                  type="text"
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  placeholder="Amman, Irbid..."
                />
              </div>

              <div className="input-group">
                <label>{t('property.minPrice')}</label>
                <input
                  type="number"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  placeholder="50000"
                />
              </div>

              <div className="input-group">
                <label>{t('property.maxPrice')}</label>
                <input
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  placeholder="500000"
                />
              </div>

              <div className="input-group">
                <label>{t('property.bedrooms')}</label>
                <select
                  name="bedrooms"
                  value={filters.bedrooms}
                  onChange={handleFilterChange}
                >
                  <option value="">{t('property.all')}</option>
                  <option value="1">1 {t('property.bedroom')}</option>
                  <option value="2">2 {t('property.bedrooms_plural')}</option>
                  <option value="3">3 {t('property.bedrooms_plural')}</option>
                  <option value="4">4 {t('property.bedrooms_plural')}</option>
                  <option value="5">5+ {t('property.bedrooms_plural')}</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary btn-full">
                {t('property.search')}
              </button>
              <button type="button" onClick={handleReset} className="btn btn-secondary btn-full">
                {t('property.reset')}
              </button>
            </form>
          </div>
        </aside>

        {/* Properties Grid */}
        <main className="properties-main">
          {loading ? (
            <div className="loading-container">
              <div className="loading"></div>
            </div>
          ) : properties.length > 0 ? (
            <>
              <div className="properties-count">
                <p>{t('property.found')} {properties.length} {t('property.properties_count')}</p>
              </div>
              <div className="properties-grid">
                {properties.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>
            </>
          ) : (
            <div className="no-properties">
              <p>{t('property.noProperties')}</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Properties;
