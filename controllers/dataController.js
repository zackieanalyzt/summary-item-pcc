// controllers/dataController.js
const { getPreviewData } = require('../services/databaseService');

const previewData = async (req, res) => {
  try {
    const { startDate, endDate, limit } = req.query;
    if (!startDate || !endDate) {
      return res.status(400).json({ success: false, message: "Missing start or end date" });
    }

    const data = await getPreviewData(startDate, endDate, limit);
    res.json({
      success: true,
      data,
      totalCount: data.length,
      preview: true
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  previewData
};