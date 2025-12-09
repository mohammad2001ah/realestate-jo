const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { isAgentOrAdmin } = require('../middleware/checkRole');
const upload = require('../middleware/upload');
const {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  getMyProperties,
  deleteProperty
} = require('../controllers/propertyController');

// Public routes
router.get('/', getAllProperties);

// Get agent's own properties (MUST be before /:id route)
router.get('/my-properties', auth, isAgentOrAdmin, getMyProperties);

// Image upload route (MUST be before /:id route)
router.post('/upload', auth, upload.array('images', 15), (req, res) => {
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

// Get single property by ID (MUST be after specific routes)
router.get('/:id', getPropertyById);

// Protected routes (require authentication and agent/admin role)
router.post('/', auth, isAgentOrAdmin, createProperty);
router.put('/:id', auth, isAgentOrAdmin, updateProperty);
router.delete('/:id', auth, isAgentOrAdmin, deleteProperty);

module.exports = router;
