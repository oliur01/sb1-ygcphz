import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', revenue: 30000, expenses: 25000 },
  { month: 'Feb', revenue: 35000, expenses: 27000 },
  { month: 'Mar', revenue: 40000, expenses: 30000 },
  { month: 'Apr', revenue: 38000, expenses: 28000 },
  { month: 'May', revenue: 42000, expenses: 32000 },
  { month: 'Jun', revenue: 45000, expenses: 33000 },
];

const Finances = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Finances</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Revenue vs Expenses</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#3B82F6" />
              <Line type="monotone" dataKey="expenses" stroke="#EF4444" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Financial Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Revenue (YTD)</span>
              <span className="text-2xl font-bold text-green-600">$230,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Expenses (YTD)</span>
              <span className="text-2xl font-bold text-red-600">$175,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Net Profit (YTD)</span>
              <span className="text-2xl font-bold text-blue-600">$55,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Profit Margin</span>
              <span className="text-2xl font-bold text-purple-600">23.9%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finances;