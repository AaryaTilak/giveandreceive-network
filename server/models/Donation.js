
const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  donorName: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  postedDate: {
    type: String,
    default: 'Just now'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Donation', DonationSchema);
