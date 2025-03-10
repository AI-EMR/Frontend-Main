import React, { useState } from 'react';

// Mock data - replace with actual API calls
const mockMetrics = {
  totalPatients: {
    current: 2651,
    previous: 2366,
    change: 12,
  },
  activeAppointments: {
    current: 42,
    previous: 43,
    change: -2.3,
  },
  averageVisitDuration: {
    current: 25,
    previous: 28,
    change: -10.7,
  },
  patientSatisfaction: {
    current: 4.8,
    previous: 4.6,
    change: 4.3,
  },
};

const mockDepartmentStats = [
  { name: 'General Medicine', patients: 856, appointments: 156, satisfaction: 4.7 },
  { name: 'Cardiology', patients: 423, appointments: 89, satisfaction: 4.9 },
  { name: 'Neurology', patients: 312, appointments: 67, satisfaction: 4.8 },
  { name: 'Pediatrics', patients: 534, appointments: 112, satisfaction: 4.6 },
  { name: 'Orthopedics', patients: 298, appointments: 78, satisfaction: 4.7 },
];

const mockTimelineData = [
  { date: '2024-03-01', appointments: 42, patients: 156 },
  { date: '2024-03-02', appointments: 38, patients: 142 },
  { date: '2024-03-03', appointments: 35, patients: 128 },
  { date: '2024-03-04', appointments: 45, patients: 168 },
  { date: '2024-03-05', appointments: 48, patients: 175 },
  { date: '2024-03-06', appointments: 52, patients: 189 },
  { date: '2024-03-07', appointments: 49, patients: 182 },
];

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('week');

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex justify-between items-center">
          <h1 className="heading-1 text-gray-900 dark:text-white">Analytics</h1>
          <select
            id="timeRange"
            name="timeRange"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="mt-1 block w-48 pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
          >
            <option value="day">Last 24 Hours</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Key Metrics */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(mockMetrics).map(([key, data]) => (
            <div
              key={key}
              className="bg-white dark:bg-gray-800 overflow-hidden shadow-soft rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
                      {data.current}
                      {key === 'patientSatisfaction' && ' / 5'}
                      {key === 'averageVisitDuration' && ' min'}
                    </p>
                    <p className={`
                      mt-1 text-sm flex items-center
                      ${data.change > 0 
                        ? 'text-green-600 dark:text-green-500' 
                        : 'text-red-600 dark:text-red-500'}
                    `}>
                      <span className="font-medium">{Math.abs(data.change)}%</span>
                      <span className="ml-1">{data.change > 0 ? 'increase' : 'decrease'}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Department Performance */}
        <div className="mt-8">
          <div className="bg-white dark:bg-gray-800 shadow-soft rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="heading-3 text-gray-900 dark:text-white">Department Performance</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Department
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Total Patients
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Active Appointments
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Patient Satisfaction
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {mockDepartmentStats.map((department) => (
                    <tr key={department.name} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {department.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {department.patients}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {department.appointments}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm text-gray-900 dark:text-white">
                            {department.satisfaction}
                          </span>
                          <div className="ml-2 w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary-600"
                              style={{ width: `${(department.satisfaction / 5) * 100}%` }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Timeline Chart */}
        <div className="mt-8">
          <div className="bg-white dark:bg-gray-800 shadow-soft rounded-lg p-6">
            <h3 className="heading-3 text-gray-900 dark:text-white mb-4">Activity Timeline</h3>
            <div className="h-64 relative">
              {/* Chart placeholder - replace with actual chart component */}
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">
                  Chart component will be implemented here
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage; 