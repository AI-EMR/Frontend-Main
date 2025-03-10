import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Mock data - replace with actual API calls
const mockPatients = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    dateOfBirth: '1990-05-15',
    phone: '(555) 123-4567',
    lastVisit: '2024-03-10',
    status: 'active',
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.c@example.com',
    dateOfBirth: '1985-08-22',
    phone: '(555) 234-5678',
    lastVisit: '2024-03-12',
    status: 'scheduled',
  },
  {
    id: 3,
    name: 'Emma Davis',
    email: 'emma.d@example.com',
    dateOfBirth: '1995-02-10',
    phone: '(555) 345-6789',
    lastVisit: '2024-03-08',
    status: 'inactive',
  },
  // Add more mock patients as needed
];

const statusColors = {
  active: 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-500',
  scheduled: 'bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-500',
  inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-500',
};

const PatientsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredPatients = mockPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex justify-between items-center">
          <h1 className="heading-1 text-gray-900 dark:text-white">Patients</h1>
          <Link
            to="/patients/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <svg
              className="-ml-1 mr-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add Patient
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="mt-8">
          <div className="bg-white dark:bg-gray-800 shadow-soft rounded-lg">
            {/* Filters */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label htmlFor="search" className="sr-only">
                    Search patients
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="search"
                      id="search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                      placeholder="Search by name, email, or phone"
                    />
                  </div>
                </div>
                <div className="sm:w-48">
                  <select
                    id="status"
                    name="status"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Contact
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Date of Birth
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Last Visit
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {patient.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">{patient.email}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{patient.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(patient.dateOfBirth).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(patient.lastVisit).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-medium rounded-full ${statusColors[patient.status]}`}>
                          {patient.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          to={`/patients/${patient.id}`}
                          className="text-primary-600 hover:text-primary-900 dark:hover:text-primary-400"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredPatients.length === 0 && (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No patients found</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientsPage; 