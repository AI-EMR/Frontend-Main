import React from 'react';
import { Link } from 'react-router-dom';
import { 
  UserGroupIcon, 
  ClockIcon, 
  DocumentTextIcon, 
  ChartBarIcon,
  PlusIcon,
  UserPlusIcon as UserAddIcon,
  CalendarIcon,
  DocumentPlusIcon as DocumentAddIcon
} from '@heroicons/react/24/outline';
import useAuthStore from '../store/authStore';
import { ROLES } from '../store/authStore';

const stats = [
  { 
    name: 'Total Patients', 
    value: '1,284', 
    icon: UserGroupIcon, 
    color: 'bg-primary-500', 
    roles: [ROLES.ADMIN, ROLES.DOCTOR] // Restricted to admin and doctors only
  },
  { 
    name: 'Appointments Today', 
    value: '12', 
    icon: ClockIcon, 
    color: 'bg-secondary-500', 
    roles: [ROLES.ADMIN, ROLES.DOCTOR, ROLES.NURSE, ROLES.RECEPTIONIST] 
  },
  { 
    name: 'New Records', 
    value: '24', 
    icon: DocumentTextIcon, 
    color: 'bg-accent-500', 
    roles: [ROLES.ADMIN, ROLES.DOCTOR, ROLES.NURSE] 
  },
  { 
    name: 'Analytics', 
    value: '+12%', 
    icon: ChartBarIcon, 
    color: 'bg-indigo-500', 
    roles: [ROLES.ADMIN, ROLES.DOCTOR] 
  },
];

// For patients, show different stats
const patientStats = [
  { 
    name: 'Your Appointments', 
    value: '2', 
    icon: ClockIcon, 
    color: 'bg-secondary-500', 
    roles: [ROLES.PATIENT] 
  },
  { 
    name: 'Your Records', 
    value: '8', 
    icon: DocumentTextIcon, 
    color: 'bg-accent-500', 
    roles: [ROLES.PATIENT] 
  },
  { 
    name: 'Medications', 
    value: '3', 
    icon: DocumentTextIcon, 
    color: 'bg-primary-500', 
    roles: [ROLES.PATIENT] 
  },
];

const quickActions = [
  { name: 'Add Patient', href: '/patients/new', icon: UserAddIcon, color: 'bg-primary-100 text-primary-800', roles: [ROLES.ADMIN, ROLES.RECEPTIONIST] },
  { name: 'Schedule Appointment', href: '/appointments/new', icon: CalendarIcon, color: 'bg-secondary-100 text-secondary-800', roles: [ROLES.ADMIN, ROLES.DOCTOR, ROLES.RECEPTIONIST] },
  { name: 'Create Record', href: '/records/new', icon: DocumentAddIcon, color: 'bg-accent-100 text-accent-800', roles: [ROLES.ADMIN, ROLES.DOCTOR, ROLES.NURSE] },
];

// Patient-specific quick actions
const patientQuickActions = [
  { name: 'Request Appointment', href: '/appointments/request', icon: CalendarIcon, color: 'bg-secondary-100 text-secondary-800', roles: [ROLES.PATIENT] },
  { name: 'View Medications', href: '/medications', icon: DocumentTextIcon, color: 'bg-primary-100 text-primary-800', roles: [ROLES.PATIENT] },
  { name: 'Message Doctor', href: '/messages', icon: DocumentAddIcon, color: 'bg-accent-100 text-accent-800', roles: [ROLES.PATIENT] },
];

const recentPatients = [
  { id: 1, name: 'Jane Cooper', age: 42, condition: 'Hypertension', lastVisit: '2 days ago', status: 'Stable' },
  { id: 2, name: 'Michael Foster', age: 35, condition: 'Diabetes', lastVisit: '1 week ago', status: 'Follow-up' },
  { id: 3, name: 'Dries Vincent', age: 28, condition: 'Asthma', lastVisit: '3 days ago', status: 'Improving' },
  { id: 4, name: 'Lindsay Walton', age: 56, condition: 'Arthritis', lastVisit: 'Today', status: 'New prescription' },
];

const upcomingAppointments = [
  { id: 1, patient: 'Jane Cooper', time: '9:00 AM', type: 'Check-up', doctor: 'Dr. Smith' },
  { id: 2, patient: 'Michael Foster', time: '10:30 AM', type: 'Follow-up', doctor: 'Dr. Johnson' },
  { id: 3, patient: 'Dries Vincent', time: '1:15 PM', type: 'Consultation', doctor: 'Dr. Williams' },
  { id: 4, patient: 'Lindsay Walton', time: '3:45 PM', type: 'Procedure', doctor: 'Dr. Brown' },
];

// Patient's upcoming appointments
const myAppointments = [
  { id: 1, time: '9:00 AM', date: 'Tomorrow', type: 'Check-up', doctor: 'Dr. Smith' },
  { id: 2, time: '2:30 PM', date: 'Next Monday', type: 'Follow-up', doctor: 'Dr. Johnson' },
];

// Mock data - replace with actual API calls
const mockStats = [
  { name: 'Total Patients', stat: '2,651', change: '12%', changeType: 'increase' },
  { name: 'Active Appointments', stat: '42', change: '2.3%', changeType: 'decrease' },
  { name: 'Pending Records', stat: '18', change: '4.1%', changeType: 'increase' },
  { name: 'Revenue (MTD)', stat: '$24,500', change: '8.2%', changeType: 'increase' },
];

const mockRecentActivity = [
  {
    id: 1,
    type: 'appointment',
    patient: 'Sarah Johnson',
    description: 'Scheduled for general checkup',
    date: '2024-03-15T10:00:00',
    status: 'scheduled',
  },
  {
    id: 2,
    type: 'record',
    patient: 'Michael Chen',
    description: 'Updated medical history',
    date: '2024-03-15T09:30:00',
    status: 'completed',
  },
  {
    id: 3,
    type: 'prescription',
    patient: 'Emma Davis',
    description: 'New prescription added',
    date: '2024-03-15T09:15:00',
    status: 'pending',
  },
  {
    id: 4,
    type: 'appointment',
    patient: 'James Wilson',
    description: 'Rescheduled follow-up',
    date: '2024-03-15T09:00:00',
    status: 'rescheduled',
  },
];

const DashboardPage = () => {
  const { role } = useAuthStore();
  
  // Determine which stats to show based on role
  const isPatient = role === ROLES.PATIENT;
  const statsToShow = isPatient ? patientStats : stats;
  
  // Filter stats and actions based on user role
  const filteredStats = statsToShow.filter(stat => stat.roles.includes(role));
  const filteredActions = isPatient 
    ? patientQuickActions.filter(action => action.roles.includes(role))
    : quickActions.filter(action => action.roles.includes(role));
  
  // Determine if user should see patient data
  const canViewPatients = [ROLES.ADMIN, ROLES.DOCTOR, ROLES.NURSE, ROLES.RECEPTIONIST].includes(role);
  
  // Determine if user should see appointment data
  const canViewAppointments = [ROLES.ADMIN, ROLES.DOCTOR, ROLES.NURSE, ROLES.RECEPTIONIST].includes(role);
  
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="heading-1 text-gray-900 dark:text-white">Dashboard</h1>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Stats Grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {mockStats.map((item) => (
            <div
              key={item.name}
              className="relative bg-white dark:bg-gray-800 pt-5 px-4 pb-6 sm:pt-6 sm:px-6 shadow-soft rounded-lg overflow-hidden"
            >
              <dt>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  {item.name}
                </p>
              </dt>
              <dd className="mt-1">
                <p className="text-3xl font-semibold text-gray-900 dark:text-white">
                  {item.stat}
                </p>
                <p className={`
                  mt-2 flex items-center text-sm
                  ${item.changeType === 'increase' 
                    ? 'text-green-600 dark:text-green-500' 
                    : 'text-red-600 dark:text-red-500'}
                `}>
                  <span className="font-medium">{item.change}</span>
                  <span className="ml-1">from last month</span>
                </p>
              </dd>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <div className="bg-white dark:bg-gray-800 shadow-soft rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="heading-3 text-gray-900 dark:text-white">Recent Activity</h3>
            </div>
            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
              {mockRecentActivity.map((activity) => (
                <li key={activity.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        {activity.type === 'appointment' && (
                          <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        )}
                        {activity.type === 'record' && (
                          <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        )}
                        {activity.type === 'prescription' && (
                          <svg className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                          </svg>
                        )}
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {activity.patient}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {activity.description}
                        </p>
                      </div>
                    </div>
                    <div className="ml-6 flex items-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(activity.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      <span
                        className={`
                          ml-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${activity.status === 'completed' && 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-500'}
                          ${activity.status === 'scheduled' && 'bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-500'}
                          ${activity.status === 'pending' && 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-500'}
                          ${activity.status === 'rescheduled' && 'bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-500'}
                        `}
                      >
                        {activity.status}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="bg-gray-50 dark:bg-gray-800/50 px-4 py-4 sm:px-6 rounded-b-lg border-t border-gray-200 dark:border-gray-700">
              <Link
                to="/activity"
                className="text-sm font-medium text-primary-600 hover:text-primary-500"
              >
                View all activity
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 