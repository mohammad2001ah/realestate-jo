// Script to update existing properties to have 'approved' status
// Run this once to migrate existing data

const mongoose = require('mongoose');
require('dotenv').config();

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  area: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  images: [{ type: String }],
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  contactPhone: { type: String, required: true },
  contactWhatsapp: { type: String },
  contactEmail: { type: String },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  }
}, { timestamps: true });

const Property = mongoose.model('Property', propertySchema);

async function migrateProperties() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Update all properties without status to 'approved'
    const result = await Property.updateMany(
      { status: { $exists: false } },
      { $set: { status: 'approved' } }
    );

    console.log(`✅ Migration completed!`);
    console.log(`📊 Updated ${result.modifiedCount} properties to 'approved' status`);

    // Close connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
migrateProperties();
