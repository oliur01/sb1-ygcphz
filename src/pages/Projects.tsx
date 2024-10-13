import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

interface Project {
  _id: string;
  name: string;
  client: string;
  status: 'Planning' | 'In Progress' | 'In Review' | 'Completed';
  deadline: string;
  description: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/projects', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      if (editingProject) {
        await axios.put(`http://localhost:5000/api/projects/${editingProject._id}`, data, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      } else {
        await axios.post('http://localhost:5000/api/projects', data, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      }
      fetchProjects();
      reset();
      setEditingProject(null);
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setValue('name', project.name);
    setValue('client', project.client);
    setValue('status', project.status);
    setValue('deadline', project.deadline.split('T')[0]);
    setValue('description', project.description);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
        <div className="grid grid-cols-2 gap-4">
          <input {...register('name')} placeholder="Project Name" className="p-2 border rounded" />
          <input {...register('client')} placeholder="Client" className="p-2 border rounded" />
          <select {...register('status')} className="p-2 border rounded">
            <option value="Planning">Planning</option>
            <option value="In Progress">In Progress</option>
            <option value="In Review">In Review</option>
            <option value="Completed">Completed</option>
          </select>
          <input {...register('deadline')} type="date" className="p-2 border rounded" />
          <textarea {...register('description')} placeholder="Description" className="p-2 border rounded col-span-2" />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">
            {editingProject ? 'Update Project' : 'Add Project'}
          </button>
        </div>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Deadline
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{project.name}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{project.client}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{project.status}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{new Date(project.deadline).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <button onClick={() => handleEdit(project)} className="text-blue-600 hover:text-blue-900 mr-2">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(project._id)} className="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Projects;