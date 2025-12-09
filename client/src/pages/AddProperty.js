import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { createProperty } from '../services/api';
import './AddProperty.css';

const AddProperty = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    area: '',
    bedrooms: '',
    contactPhone: '',
    contactWhatsapp: '',
    contactEmail: '',
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (images.length + files.length > 15) {
      setError('Maximum 15 images allowed');
      return;
    }

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImages(prev => [...prev, ...files]);
    setImagePreviews(prev => [...prev, ...newPreviews]);
    setError('');
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (images.length < 5) {
      setError(t('property.mustAdd') + ' ' + (5 - images.length) + ' ' + t('property.moreImages'));
      return;
    }

    setLoading(true);

    try {
      let uploadedImagePaths = [];
      if (images.length > 0) {
        setUploadingImages(true);
        const imageFormData = new FormData();
        images.forEach(image => {
          imageFormData.append('images', image);
        });

        const uploadResponse = await fetch('http://localhost:5000/api/properties/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: imageFormData
        });

        const uploadData = await uploadResponse.json();
        if (uploadData.success) {
          uploadedImagePaths = uploadData.images;
        } else {
          throw new Error('Failed to upload images');
        }
        setUploadingImages(false);
      }

      await createProperty({
        ...formData,
        price: Number(formData.price),
        area: Number(formData.area),
        bedrooms: Number(formData.bedrooms),
        images: uploadedImagePaths,
      });
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/properties');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || err.message || t('property.addFailed'));
    } finally {
      setLoading(false);
      setUploadingImages(false);
    }
  };

  return (
    <div className="add-property-page">
      <div className="container">
        <div className="add-property-header fade-in">
          <h1>{t('property.addProperty')}</h1>
          <p>{t('property.addPropertyDesc')}</p>
        </div>

        <div className="add-property-container">
          {error && <div className="error-message">{error}</div>}
          {success && (
            <div className="success-message">
              {t('property.propertyAdded')}
            </div>
          )}

          <form onSubmit={handleSubmit} className="property-form">
            <div className="form-row">
              <div className="input-group">
                <label>{t('property.propertyTitle')} *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Luxury Apartment in Abdoun"
                  required
                />
              </div>
            </div>

            {/* Images Upload Section */}
            <div className="form-section">
              <h3>{t('property.imagesSection')}</h3>
              <p className="section-description">
                {t('property.imagesDesc')}
              </p>
            </div>

            <div className="image-upload-container">
              <div className="upload-area">
                <input
                  type="file"
                  id="images"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
                <label htmlFor="images" className="upload-label">
                  <div className="upload-icon">📸</div>
                  <p>{t('property.clickToSelect')}</p>
                  <small>{images.length} / 15 {t('property.images_plural')}</small>
                </label>
              </div>

              {imagePreviews.length > 0 && (
                <div className="image-previews-grid">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="image-preview-item">
                      <img src={preview} alt={`Preview ${index + 1}`} />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="remove-image-btn"
                      >
                        ✕
                      </button>
                      {index < 5 && <span className="required-badge">{t('property.required')}</span>}
                    </div>
                  ))}
                </div>
              )}

              {images.length < 5 && (
                <p className="validation-hint error">
                  ⚠️ {t('property.mustAdd')} {5 - images.length} {t('property.moreImages')}
                </p>
              )}
              {images.length >= 5 && images.length < 15 && (
                <p className="validation-hint success">
                  ✅ {t('property.canAdd')} {15 - images.length} {t('property.moreOptional')}
                </p>
              )}
            </div>

            <div className="form-row">
              <div className="input-group">
                <label>{t('property.description')}</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Detailed property description..."
                  rows="4"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label>{t('property.priceJOD')} *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="150000"
                  required
                />
              </div>

              <div className="input-group">
                <label>{t('property.location')} *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Abdoun, Amman"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label>{t('property.areaM2')} *</label>
                <input
                  type="number"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="150"
                  required
                />
              </div>

              <div className="input-group">
                <label>{t('property.bedroomsCount')} *</label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  placeholder="3"
                  required
                />
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="form-section">
              <h3>{t('property.contactInfo')}</h3>
              <p className="section-description">Add contact information for interested buyers</p>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label>{t('property.phone')} *</label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  placeholder="0791234567"
                  required
                />
              </div>

              <div className="input-group">
                <label>{t('property.whatsapp')} ({t('property.optional')})</label>
                <input
                  type="tel"
                  name="contactWhatsapp"
                  value={formData.contactWhatsapp}
                  onChange={handleChange}
                  placeholder="0791234567"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label>{t('property.email')} ({t('property.optional')})</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  placeholder="contact@example.com"
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary btn-large" disabled={loading || uploadingImages}>
                {uploadingImages ? (
                  <>
                    <div className="loading"></div>
                    <span>{t('property.uploading')}</span>
                  </>
                ) : loading ? (
                  <div className="loading"></div>
                ) : (
                  t('property.addPropertyBtn')
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate('/properties')}
                className="btn btn-secondary btn-large"
              >
                {t('property.cancel')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
