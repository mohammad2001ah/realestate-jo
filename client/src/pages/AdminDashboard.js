import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getAllProperties, deleteProperty } from '../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { t } = useTranslation();
  const [properties, setProperties] = useState([]);
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalUsers: 0,
    totalAgents: 0,
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('properties');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const propertiesData = await getAllProperties();
      setProperties(propertiesData.data);

      setStats({
        totalProperties: propertiesData.data.length,
        totalUsers: 0,
        totalAgents: 0,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProperty = async (id) => {
    if (window.confirm(t('property.confirmDelete'))) {
      try {
        await deleteProperty(id);
        setProperties(properties.filter(p => p._id !== id));
        setStats(prev => ({ ...prev, totalProperties: prev.totalProperties - 1 }));
      } catch (error) {
        alert(t('property.deleteFailed'));
      }
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="container">
          <h1 className="fade-in">{t('admin.dashboard')}</h1>
          <p className="slide-in-left">{t('admin.fullControl')}</p>
        </div>
      </div>

      <div className="container admin-content">
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card fade-in">
            <div className="stat-icon">🏠</div>
            <div className="stat-info">
              <h3>{stats.totalProperties}</h3>
              <p>{t('admin.totalProperties')}</p>
            </div>
          </div>
          <div className="stat-card fade-in">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <h3>{stats.totalUsers}</h3>
              <p>{t('admin.totalUsers')}</p>
            </div>
          </div>
          <div className="stat-card fade-in">
            <div className="stat-icon">💼</div>
            <div className="stat-info">
              <h3>{stats.totalAgents}</h3>
              <p>{t('admin.agents')}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="admin-tabs">
          <button
            className={`tab-btn ${activeTab === 'properties' ? 'active' : ''}`}
            onClick={() => setActiveTab('properties')}
          >
            {t('admin.propertiesTab')}
          </button>
          <button
            className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            {t('admin.usersTab')}
          </button>
        </div>

        {/* Tab Content */}
        {loading ? (
          <div className="loading-container">
            <div className="loading"></div>
          </div>
        ) : (
          <>
            {activeTab === 'properties' && (
              <div className="properties-table-container">
                <h2>{t('admin.allProperties')}</h2>
                <div className="table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>{t('property.title')}</th>
                        <th>{t('property.location')}</th>
                        <th>{t('property.price')}</th>
                        <th>{t('property.bedrooms')}</th>
                        <th>{t('property.area')}</th>
                        <th>{t('property.dateAdded')}</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {properties.map((property) => (
                        <tr key={property._id}>
                          <td>{property.title}</td>
                          <td>{property.location}</td>
                          <td>{property.price.toLocaleString()} JOD</td>
                          <td>{property.bedrooms}</td>
                          <td>{property.area} m²</td>
                          <td>{new Date(property.createdAt).toLocaleDateString()}</td>
                          <td>
                            <div className="action-buttons">
                              <button className="btn-edit">{t('property.edit')}</button>
                              <button
                                className="btn-delete"
                                onClick={() => handleDeleteProperty(property._id)}
                              >
                                {t('property.delete')}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="users-table-container">
                <h2>{t('admin.usersTab')}</h2>
                <p className="coming-soon">{t('admin.comingSoon')}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
