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

export default function DashboardPage() {
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
    <div className="space-y-6">
      {/* Welcome message */}
      <div className="bg-white dark:bg-gray-800 shadow-soft rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {isPatient 
            ? "Welcome to Your Patient Portal" 
            : `Welcome to AIEMR ${role ? `(${role.charAt(0).toUpperCase() + role.slice(1)})` : ""}`
          }
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          {isPatient
            ? "Manage your appointments, view your medical records, and stay connected with your healthcare providers."
            : "An AI-powered Electronic Medical Record system to help healthcare professionals provide better care."
          }
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredStats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white dark:bg-gray-800 overflow-hidden shadow-soft rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 rounded-md p-3 ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{stat.name}</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">{stat.value}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
              <div className="text-sm">
                <Link to="#" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
                  View details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      {filteredActions.length > 0 && (
        <div className="bg-white dark:bg-gray-800 shadow-soft rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Quick Actions</h3>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700">
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {filteredActions.map((action) => (
                  <Link
                    key={action.name}
                    to={action.href}
                    className={`relative rounded-lg p-4 flex items-center space-x-3 ${action.color} hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
                  >
                    <div className="flex-shrink-0">
                      <action.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="absolute inset-0" aria-hidden="true" />
                      <p className="text-sm font-medium">{action.name}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Patient view - My Appointments */}
      {isPatient && (
        <div className="bg-white dark:bg-gray-800 shadow-soft rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">My Upcoming Appointments</h3>
            <Link to="/appointments" className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
              View all
            </Link>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Doctor
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Type
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {myAppointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{appointment.time}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{appointment.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">{appointment.doctor}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                          {appointment.type}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Recent Patients and Upcoming Appointments for staff */}
      {!isPatient && (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Recent Patients */}
          {canViewPatients && (
            <div className="bg-white dark:bg-gray-800 shadow-soft rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Recent Patients</h3>
                <Link to="/patients" className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
                  View all
                </Link>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Condition
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {recentPatients.map((patient) => (
                        <tr key={patient.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {patient.name}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {patient.age} years old
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">{patient.condition}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Last visit: {patient.lastVisit}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                              {patient.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Upcoming Appointments */}
          {canViewAppointments && (
            <div className="bg-white dark:bg-gray-800 shadow-soft rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Today's Appointments</h3>
                <Link to="/appointments" className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
                  View all
                </Link>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Patient
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Time
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Type
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {upcomingAppointments.map((appointment) => (
                        <tr key={appointment.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{appointment.patient}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">With {appointment.doctor}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">{appointment.time}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                              {appointment.type}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 