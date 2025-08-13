import { getReportData, getAggregatedReportData } from '../models/reportModel.js';

export const getReport = async (req, res) => {
  try {
    const loungeId = req.user.loungeId;
    const report = await getReportData(loungeId);
    console.log('Report data from the controller:');
    console.log(report);
    res.json(report);
  } catch (error) {
    console.error('Report error:', error);
    res.status(500).json({ message: 'Server error while fetching report' });
  }
};

export const getAggregatedReport = async (req, res) => {
  try {
    const loungeId = req.query.loungeId || null;
    const report = await getAggregatedReportData(loungeId);
    res.json(report);
  } catch (error) {
    console.error('Admin Report error:', error);
    res.status(500).json({ message: 'Server error while fetching admin report' });
  }
};