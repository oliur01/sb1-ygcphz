import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalClients: 0,
    activeProjects: 0,
    avgProjectDuration: 0,
    revenueThisMonth: 0,
  });

  const [serviceData, setServiceData] = useState([]);
  const [projectStatusData, setProjectStatusData] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/dashboard', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setStats(response.data.stats);
      setServiceData(response.data.serviceData);
      setProjectStatusData(response.data.projectStatusData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-100 p-4 rounded">
              <p className="text-sm text-blue-800">Total Clients</p>
              <p className="text-2xl font-bold text-blue-600">{stats.totalClients}</p>
            </div>
            <div className="bg-green-100 p-4 rounded">
              <p className="text-sm text-green-800">Active Projects</p>
              <p className="text-2xl font-bold text-green-600">{stats.activeProjects}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded">
              <p className="text-sm text-yellow-800">Avg. Project Duration</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.avgProjectDuration} days</p>
            </div>
            <div className="bg-purple-100 p-4 rounded">
              <p className="text-sm text-purple-800">Revenue This Month</p>
              <p className="text-2xl font-bold text-purple-600">${stats.revenueThisMonth}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Services Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={serviceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Project Status Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={projectStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {projectStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;