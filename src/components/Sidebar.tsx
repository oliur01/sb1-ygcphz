import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Users, Briefcase, DollarSign } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="bg-blue-800 text-white w-64 space-y-6 py-7 px-2">
      <h2 className="text-2xl font-semibold text-center">YGF Digital CRM</h2>
      <nav>
        <Link to="/" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700">
          <LayoutDashboard className="inline-block mr-2" size={20} />
          Dashboard
        </Link>
        <Link to="/clients" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700">
          <Users className="inline-block mr-2" size={20} />
          Clients
        </Link>
        <Link to="/projects" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700">
          <Briefcase className="inline-block mr-2" size={20} />
          Projects
        </Link>
        <Link to="/finances" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700">
          <DollarSign className="inline-block mr-2" size={20} />
          Finances
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;