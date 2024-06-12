const Dashboard = require('../models/Dashboard');

exports.getDashboardData = async (req, res) => {
  try {
    const data = await Dashboard.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createDashboardData = async (req, res) => {
  const { activity, notifications, quickAccess } = req.body;
  const newDashboardData = new Dashboard({
    activity,
    notifications,
    quickAccess
  });
  try {
    const savedData = await newDashboardData.save();
    res.status(201).json(savedData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
