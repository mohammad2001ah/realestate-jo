const express = require('express');
const { createUser, loginUser, getAllUsers, updateUser, deleteUser, toggleFavorite, getFavorites } = require('../controllers/userController');
const { auth, isAdmin } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/register', createUser);
router.post('/login', loginUser);

// Protected user routes
router.post('/favorites/:propertyId', auth, toggleFavorite);
router.get('/favorites', auth, getFavorites);

// Admin-only routes
router.get('/', auth, isAdmin, getAllUsers);
router.put('/:id', auth, isAdmin, updateUser);
router.delete('/:id', auth, isAdmin, deleteUser);

module.exports = router;