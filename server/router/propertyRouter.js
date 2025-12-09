const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty
} = require('../controllers/propertyController');

// Public routes
router.get('/', getAllProperties);
router.get('/:id', getPropertyById);

// Protected routes (require authentication)
router.post('/', auth, createProperty);
router.put('/:id', auth, updateProperty);
router.delete('/:id', auth, deleteProperty);

// Image upload route
router.post('/upload', auth, upload.array('images', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No files uploaded' });
    }

    // Get file paths
    const filePaths = req.files.map(file => `/uploads/properties/${file.filename}`);
    
    res.status(200).json({ 
      success: true, 
      message: 'Images uploaded successfully',
      images: filePaths 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Upload failed', error: error.message });
  }
});

module.exports = router;
