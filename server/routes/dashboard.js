import express from 'express';
import Client from '../models/Client.js';
import Project from '../models/Project.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/', async (req, res) => {
  try {
    const totalClients = await Client.countDocuments();
    const activeProjects = await Project.countDocuments({ status: { $in: ['In Progress', 'In Review'] } });
    
    const projects = await Project.find();
    const avgProjectDuration = projects.reduce((acc, project) => {
      const duration = (new Date(project.deadline) - new Date(project.createdAt)) / (1000 * 60 * 60 * 24);
      return acc + duration;
    }, 0) / projects.length;

    // This is a placeholder. In a real app, you'd calculate this based on actual financial data.
    const revenueThisMonth = 52000;

    const serviceData = await Client.aggregate([
      { $group: { _id: '$service', count: { $sum: 1 } } },
      { $project: { name: '$_id', value: '$count' } }
    ]);

    const projectStatusData = await Project.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
      { $project: { name: '$_id', value: '$count' } }
    ]);

    res.json({
      stats: {
        totalClients,
        activeProjects,
        avgProjectDuration: Math.round(avgProjectDuration),
        revenueThisMonth
      },
      serviceData,
      projectStatusData
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard data', error: error.message });
  }
});

export default router;