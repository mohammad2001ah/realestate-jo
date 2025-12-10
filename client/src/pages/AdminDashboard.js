import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getAllProperties, deleteProperty, getAllUsers, updateUser, deleteUser } from '../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalUsers: 0,
    totalAgents: 0,
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('properties');
  const [editingUser, setEditingUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const propertiesData = await getAllProperties();
      setProperties(propertiesData.data);

      // Fetch users
      try {
        const usersData = await getAllUsers();
        setUsers(usersData.data);
        
        const agentCount = usersData.data.filter(u => u.role === 'agent').length;
        
        setStats({
          totalProperties: propertiesData.data.length,
          totalUsers: usersData.data.length,
          totalAgents: agentCount,
        });
      } catch (error) {
        console.error('Error fetching users:', error);
        setStats({
          totalProperties: propertiesData.data.length,
          totalUsers: 0,
          totalAgents: 0,
        });
      }
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

  const handleEditProperty = (id) => {
    navigate(`/edit-property/${id}`);
  };

  const handleEditUser = (user) => {
    setEditingUser({ ...user });
    setShowEditModal(true);
  };

  const handleUpdateUser = async () => {
    try {
      await updateUser(editingUser._id, {
        name: editingUser.name,
        email: editingUser.email,
        role: editingUser.role,
      });
      
      setUsers(users.map(u => u._id === editingUser._id ? editingUser : u));
      setShowEditModal(false);
      setEditingUser(null);
      alert(t('admin.userUpdated'));
    } catch (error) {
      alert(t('admin.updateFailed'));
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm(t('admin.confirmDeleteUser'))) {
      try {
        await deleteUser(id);
        setUsers(users.filter(u => u._id !== id));
        setStats(prev => ({ 
          ...prev, 
          totalUsers: prev.totalUsers - 1,
          totalAgents: users.find(u => u._id === id)?.role === 'agent' ? prev.totalAgents - 1 : prev.totalAgents
        }));
      } catch (error) {
        alert(t('admin.deleteFailed'));
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
                        <th>{t('admin.actions')}</th>
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
                              <button 
                                className="btn-edit"
                                onClick={() => handleEditProperty(property._id)}
                              >
                                {t('property.edit')}
                              </button>
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
                <div className="table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>{t('admin.userName')}</th>
                        <th>{t('admin.userEmail')}</th>
                        <th>{t('admin.userRole')}</th>
                        <th>{t('admin.joinDate')}</th>
                        <th>{t('admin.actions')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user._id}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>
                            <span className={`role-badge ${user.role}`}>
                              {t(`admin.role_${user.role}`)}
                            </span>
                          </td>
                          <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                          <td>
                            <div className="action-buttons">
                              <button 
                                className="btn-edit"
                                onClick={() => handleEditUser(user)}
                              >
                                {t('admin.editUser')}
                              </button>
                              <button
                                className="btn-delete"
                                onClick={() => handleDeleteUser(user._id)}
                              >
                                {t('admin.deleteUser')}
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
          </>
        )}
      </div>

      {/* Edit User Modal */}
      {showEditModal && editingUser && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{t('admin.editUser')}</h2>
            <div className="form-group">
              <label>{t('auth.name')}</label>
              <input
                type="text"
                value={editingUser.name}
                onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>{t('auth.email')}</label>
              <input
                type="email"
                value={editingUser.email}
                onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>{t('auth.accountType')}</label>
              <select
                value={editingUser.role}
                onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
              >
                <option value="user">{t('auth.regularUser')}</option>
                <option value="agent">{t('auth.propertyAgent')}</option>
                <option value="admin">{t('admin.adminRole')}</option>
              </select>
            </div>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowEditModal(false)}>
                {t('property.cancel')}
              </button>
              <button className="btn-save" onClick={handleUpdateUser}>
                {t('admin.saveChanges')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
