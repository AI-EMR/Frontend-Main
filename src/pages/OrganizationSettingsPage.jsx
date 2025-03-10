import React, { useState } from 'react';

// Mock data - replace with actual API calls
const mockOrganization = {
  name: 'City General Hospital',
  email: 'admin@citygeneralhospital.com',
  phone: '(555) 123-4567',
  address: '123 Healthcare Ave, Medical District',
  city: 'Metropolis',
  state: 'ST',
  zipCode: '12345',
  timezone: 'America/New_York',
  logo: null,
  departments: [
    { id: 1, name: 'General Medicine', active: true },
    { id: 2, name: 'Cardiology', active: true },
    { id: 3, name: 'Neurology', active: true },
    { id: 4, name: 'Pediatrics', active: true },
    { id: 5, name: 'Orthopedics', active: true },
  ],
  workingHours: {
    monday: { start: '09:00', end: '17:00', enabled: true },
    tuesday: { start: '09:00', end: '17:00', enabled: true },
    wednesday: { start: '09:00', end: '17:00', enabled: true },
    thursday: { start: '09:00', end: '17:00', enabled: true },
    friday: { start: '09:00', end: '17:00', enabled: true },
    saturday: { start: '10:00', end: '14:00', enabled: true },
    sunday: { start: '00:00', end: '00:00', enabled: false },
  },
};

const OrganizationSettingsPage = () => {
  const [organization, setOrganization] = useState(mockOrganization);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement API call to update organization settings
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrganization(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDepartmentToggle = (departmentId) => {
    setOrganization(prev => ({
      ...prev,
      departments: prev.departments.map(dept =>
        dept.id === departmentId ? { ...dept, active: !dept.active } : dept
      )
    }));
  };

  const handleWorkingHoursChange = (day, field, value) => {
    setOrganization(prev => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [day]: {
          ...prev.workingHours[day],
          [field]: value
        }
      }
    }));
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex justify-between items-center">
          <h1 className="heading-1 text-gray-900 dark:text-white">Organization Settings</h1>
          {!isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Edit Settings
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="mt-8">
          <div className="bg-white dark:bg-gray-800 shadow-soft rounded-lg">
            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
                {['general', 'departments', 'working-hours'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
                      whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                      ${activeTab === tab
                        ? 'border-primary-500 text-primary-600 dark:text-primary-500'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'}
                    `}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
                  </button>
                ))}
              </nav>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="p-6">
                {/* General Settings */}
                {activeTab === 'general' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Organization Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={organization.name}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={organization.email}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          value={organization.phone}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </div>

                      <div>
                        <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Timezone
                        </label>
                        <select
                          id="timezone"
                          name="timezone"
                          value={organization.timezone}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <option value="America/New_York">Eastern Time (ET)</option>
                          <option value="America/Chicago">Central Time (CT)</option>
                          <option value="America/Denver">Mountain Time (MT)</option>
                          <option value="America/Los_Angeles">Pacific Time (PT)</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Street Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          id="address"
                          value={organization.address}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </div>

                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          id="city"
                          value={organization.city}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </div>

                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          State
                        </label>
                        <input
                          type="text"
                          name="state"
                          id="state"
                          value={organization.state}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </div>

                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          id="zipCode"
                          value={organization.zipCode}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Departments */}
                {activeTab === 'departments' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {organization.departments.map((department) => (
                        <div
                          key={department.id}
                          className="relative flex items-start p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                        >
                          <div className="flex items-center h-5">
                            <input
                              type="checkbox"
                              checked={department.active}
                              onChange={() => handleDepartmentToggle(department.id)}
                              disabled={!isEditing}
                              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label className="font-medium text-gray-700 dark:text-gray-300">
                              {department.name}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Working Hours */}
                {activeTab === 'working-hours' && (
                  <div className="space-y-6">
                    {Object.entries(organization.workingHours).map(([day, hours]) => (
                      <div key={day} className="flex items-center space-x-4">
                        <div className="w-32">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {day.charAt(0).toUpperCase() + day.slice(1)}
                          </label>
                        </div>
                        <div className="flex-1 grid grid-cols-2 gap-4 items-center">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={hours.enabled}
                              onChange={(e) => handleWorkingHoursChange(day, 'enabled', e.target.checked)}
                              disabled={!isEditing}
                              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                            <span className="text-sm text-gray-500 dark:text-gray-400">Open</span>
                          </div>
                          {hours.enabled && (
                            <>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="time"
                                  value={hours.start}
                                  onChange={(e) => handleWorkingHoursChange(day, 'start', e.target.value)}
                                  disabled={!isEditing}
                                  className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                                <span className="text-gray-500 dark:text-gray-400">to</span>
                                <input
                                  type="time"
                                  value={hours.end}
                                  onChange={(e) => handleWorkingHoursChange(day, 'end', e.target.value)}
                                  disabled={!isEditing}
                                  className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Form Actions */}
                {isEditing && (
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setOrganization(mockOrganization);
                        setIsEditing(false);
                      }}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationSettingsPage; 