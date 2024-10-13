import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

interface Client {
  _id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  status: 'Active' | 'Inactive';
}

const Clients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/clients', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      if (editingClient) {
        await axios.put(`http://localhost:5000/api/clients/${editingClient._id}`, data, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      } else {
        await axios.post('http://localhost:5000/api/clients', data, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      }
      fetchClients();
      reset();
      setEditingClient(null);
    } catch (error) {
      console.error('Error saving client:', error);
    }
  };

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setValue('name', client.name);
    setValue('email', client.email);
    setValue('phone', client.phone);
    setValue('service', client.service);
    setValue('status', client.status);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/clients/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchClients();
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Clients</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
        <div className="grid grid-cols-2 gap-4">
          <input {...register('name')} placeholder="Name" className="p-2 border rounded" />
          <input {...register('email')} placeholder="Email" className="p-2 border rounded" />
          <input {...register('phone')} placeholder="Phone" className="p-2 border rounded" />
          <input {...register('service')} placeholder="Service" className="p-2 border rounded" />
          <select {...register('status')} className="p-2 border rounded">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">
            {editingClient ? 'Update Client' : 'Add Client'}
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
                Email
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Service
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client._id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{client.name}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{client.email}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{client.phone}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{client.service}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{client.status}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <button onClick={() => handleEdit(client)} className="text-blue-600 hover:text-blue-900 mr-2">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(client._id)} className="text-red-600 hover:text-red-900">
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

export default Clients;