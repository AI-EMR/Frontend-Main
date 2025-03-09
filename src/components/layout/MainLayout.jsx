import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  UserGroupIcon, 
  DocumentTextIcon, 
  ChartBarIcon, 
  CogIcon, 
  Bars3Icon as MenuIcon, 
  XMarkIcon as XIcon, 
  BellIcon, 
  UserCircleIcon 
} from '@heroicons/react/24/outline';
import useAuthStore from '../../store/authStore';
import { ROLES } from '../../store/authStore';
import ThemeToggle from '../ui/ThemeToggle';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon, roles: [ROLES.ADMIN, ROLES.DOCTOR, ROLES.NURSE, ROLES.RECEPTIONIST, ROLES.PATIENT] },
  { name: 'Patients', href: '/patients', icon: UserGroupIcon, roles: [ROLES.ADMIN, ROLES.DOCTOR, ROLES.NURSE, ROLES.RECEPTIONIST] },
  { name: 'Medical Records', href: '/records', icon: DocumentTextIcon, roles: [ROLES.ADMIN, ROLES.DOCTOR, ROLES.NURSE] },
  { name: 'Appointments', href: '/appointments', icon: DocumentTextIcon, roles: [ROLES.ADMIN, ROLES.DOCTOR, ROLES.NURSE, ROLES.RECEPTIONIST, ROLES.PATIENT] },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon, roles: [ROLES.ADMIN, ROLES.DOCTOR] },
  { name: 'Settings', href: '/settings', icon: CogIcon, roles: [ROLES.ADMIN] },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user, role, logout } = useAuthStore();

  // Filter navigation items based on user role
  const filteredNavigation = navigation.filter(item => 
    item.roles.includes(role)
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 flex z-40 md:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
        
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-800">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>
          
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <img
                className="h-8 w-auto"
                src="/logo.svg"
                alt="AIEMR"
              />
              <span className="ml-2 text-xl font-bold text-primary-600">AIEMR</span>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {filteredNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    location.pathname === item.href
                      ? 'bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-100'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white',
                    'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                  )}
                >
                  <item.icon
                    className={classNames(
                      location.pathname === item.href
                        ? 'text-primary-500 dark:text-primary-400'
                        : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300',
                      'mr-4 flex-shrink-0 h-6 w-6'
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex-shrink-0 group block">
              <div className="flex items-center">
                <div>
                  <UserCircleIcon className="h-10 w-10 text-gray-400 dark:text-gray-300" />
                </div>
                <div className="ml-3">
                  <p className="text-base font-medium text-gray-700 dark:text-gray-200">{user?.name || 'User'}</p>
                  <button
                    onClick={logout}
                    className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <img
                className="h-8 w-auto"
                src="/logo.svg"
                alt="AIEMR"
              />
              <span className="ml-2 text-xl font-bold text-primary-600">AIEMR</span>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {filteredNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    location.pathname === item.href
                      ? 'bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-100'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white',
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                  )}
                >
                  <item.icon
                    className={classNames(
                      location.pathname === item.href
                        ? 'text-primary-500 dark:text-primary-400'
                        : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300',
                      'mr-3 flex-shrink-0 h-6 w-6'
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex-shrink-0 w-full group block">
              <div className="flex items-center">
                <div>
                  <UserCircleIcon className="h-9 w-9 text-gray-400 dark:text-gray-300" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{user?.name || 'User'}</p>
                  <button
                    onClick={logout}
                    className="text-xs font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-white dark:bg-gray-800 shadow-sm">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <header className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {filteredNavigation.find(item => location.pathname === item.href)?.name || 'Dashboard'}
                </h1>
                <div className="flex items-center space-x-4">
                  <ThemeToggle />
                  <button
                    type="button"
                    className="p-1 rounded-full text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </header>
              
              <div className="py-4">
                {children}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 