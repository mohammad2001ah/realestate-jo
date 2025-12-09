const Property = require('../model/property');

// Get all properties
const getAllProperties = async (req, res) => {
  try {
    const { location, minPrice, maxPrice, bedrooms } = req.query;
    
    // Build filter object
    let filter = {};
    
    if (location) {
      filter.location = { $regex: location, $options: 'i' }; // Case-insensitive search
    }
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    
    if (bedrooms) {
      filter.bedrooms = Number(bedrooms);
    }

    const properties = await Property.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: properties.length, data: properties });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Get single property by ID
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }
    
    res.status(200).json({ success: true, data: property });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Create new property
const createProperty = async (req, res) => {
  try {
    const { title, description, price, location, area, bedrooms, images, contactPhone, contactWhatsapp, contactEmail } = req.body;
    
    // Validate required fields
    if (!title || !price || !location || !area || !bedrooms || !contactPhone) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide all required fields: title, price, location, area, bedrooms, contactPhone' 
      });
    }

    const newProperty = new Property({
      title,
      description,
      price,
      location,
      area,
      bedrooms,
      images: images || [],
      contactPhone,
      contactWhatsapp,
      contactEmail,
      agent: req.user._id  // Assign authenticated user as agent
    });

    await newProperty.save();
    res.status(201).json({ success: true, message: 'Property created successfully', data: newProperty });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Update property
const updateProperty = async (req, res) => {
  try {
    const { title, description, price, location, area, bedrooms, images } = req.body;
    
    const property = await Property.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    // Check ownership (agents can only update their own properties, admins can update any)
    if (req.user.role !== 'admin' && property.agent.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'You can only update your own properties' });
    }

    // Update fields
    if (title) property.title = title;
    if (description) property.description = description;
    if (price) property.price = price;
    if (location) property.location = location;
    if (area) property.area = area;
    if (bedrooms) property.bedrooms = bedrooms;
    if (images) property.images = images;

    await property.save();
    res.status(200).json({ success: true, message: 'Property updated successfully', data: property });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Delete property
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    // Check ownership (agents can only delete their own properties, admins can delete any)
    if (req.user.role !== 'admin' && property.agent.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'You can only delete your own properties' });
    }

    await Property.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Get agent's own properties
const getMyProperties = async (req, res) => {
  try {
    const properties = await Property.find({ agent: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: properties.length, data: properties });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  getMyProperties
};
