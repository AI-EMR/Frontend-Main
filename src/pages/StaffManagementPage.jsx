import React, { useState } from 'react';
import { toast } from 'react-toastify';

const StaffManagementPage = () => {
  const [isAddingStaff, setIsAddingStaff] = useState(false);
  const [newStaffData, setNewStaffData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'doctor',
    department: '',
    specialization: '',
  });

  // Mock data for staff list - replace with API call
  const [staffList, setStaffList] = useState([
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      role: 'doctor',
      department: 'Cardiology',
      specialization: 'Cardiologist',
      status: 'active',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      role: 'nurse',
      department: 'Emergency',
      specialization: 'Emergency Care',
      status: 'pending',
    },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStaffData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddStaff = async (e) => {
    e.preventDefault();
    
    try {
      // TODO: Replace with actual API call
      const newStaff = {
        id: staffList.length + 1,
        ...newStaffData,
        status: 'pending',
      };
      
      setStaffList(prev => [...prev, newStaff]);
      setIsAddingStaff(false);
      setNewStaffData({
        firstName: '',
        lastName: '',
        email: '',
        role: 'doctor',
        department: '',
        specialization: '',
      });
      
      toast.success('Staff invitation sent successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to add staff member');
    }
  };

  const handleUpdateStatus = async (staffId, newStatus) => {
    try {
      // TODO: Replace with actual API call
      setStaffList(prev =>
        prev.map(staff =>
          staff.id === staffId
            ? { ...staff, status: newStatus }
            : staff
        )
      );
      
      toast.success('Staff status updated successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to update staff status');
    }
  };

  const handleDeleteStaff = async (staffId) => {
    try {
      // TODO: Replace with actual API call
      setStaffList(prev => prev.filter(staff => staff.id !== staffId));
      toast.success('Staff member removed successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to remove staff member');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Staff Management</h1>
        <button
          onClick={() => setIsAddingStaff(true)}
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          Add Staff Member
        </button>
      </div>

      {/* Add Staff Modal */}
      {isAddingStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Add New Staff Member</h2>
            <form onSubmit={handleAddStaff} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={newStaffData.firstName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={newStaffData.lastName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={newStaffData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
                <select
                  name="role"
                  required
                  value={newStaffData.role}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="doctor">Doctor</option>
                  <option value="nurse">Nurse</option>
                  <option value="receptionist">Receptionist</option>
                  <option value="lab_technician">Lab Technician</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Department</label>
                <input
                  type="text"
                  name="department"
                  required
                  value={newStaffData.department}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Specialization</label>
                <input
                  type="text"
                  name="specialization"
                  value={newStaffData.specialization}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAddingStaff(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  Add Staff
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Staff List */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {staffList.map((staff) => (
              <tr key={staff.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {staff.firstName} {staff.lastName}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {staff.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white capitalize">{staff.role}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{staff.specialization}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">{staff.department}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    staff.status === 'active'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {staff.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {staff.status === 'pending' ? (
                    <button
                      onClick={() => handleUpdateStatus(staff.id, 'active')}
                      className="text-primary-600 hover:text-primary-900 dark:hover:text-primary-400 mr-4"
                    >
                      Approve
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUpdateStatus(staff.id, 'pending')}
                      className="text-yellow-600 hover:text-yellow-900 dark:hover:text-yellow-400 mr-4"
                    >
                      Suspend
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteStaff(staff.id)}
                    className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                  >
                    Remove
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

export default StaffManagementPage; 