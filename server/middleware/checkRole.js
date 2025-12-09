// Middleware to check if user has specific role
const checkRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: 'Access denied. Insufficient permissions.' 
      });
    }

    next();
  };
};

// Check if user is admin
const isAdmin = (req, res, next) => {
  return checkRole('admin')(req, res, next);
};

// Check if user is agent or admin
const isAgentOrAdmin = (req, res, next) => {
  return checkRole('agent', 'admin')(req, res, next);
};

module.exports = { checkRole, isAdmin, isAgentOrAdmin };
