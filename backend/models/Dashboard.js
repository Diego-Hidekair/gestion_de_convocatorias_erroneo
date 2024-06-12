const mongoose = require('mongoose');

const DashboardSchema = new mongoose.Schema({
  activity: {
    type: String,
    required: true
  },
  notifications: {
    type: String,
    required: true
  },
  quickAccess: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Dashboard', DashboardSchema);
