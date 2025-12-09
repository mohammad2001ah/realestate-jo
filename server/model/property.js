const mongoose = require('mongoose');
const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  area:{type: Number, required: true},
  bedrooms: { type: Number, required: true },
  images: [{ type: String }],
  // agent: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });
module.exports = mongoose.model('Property', propertySchema);  