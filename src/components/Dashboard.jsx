import { Link } from 'react-router-dom';

function DashboardCard({ title, description, linkText, linkUrl }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      <Link 
        to={linkUrl} 
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {linkText}
      </Link>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Welcome to AIEMR</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        An AI-powered Electronic Medical Record system to help healthcare professionals provide better care.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard 
          title="Patient Management" 
          description="View and manage patient information"
          linkText="View Patients"
          linkUrl="/patients"
        />
        <DashboardCard 
          title="Medical Records" 
          description="Access and update medical records"
          linkText="View Records"
          linkUrl="/records"
        />
        <DashboardCard 
          title="AI Insights" 
          description="Get AI-powered insights and recommendations"
          linkText="View Insights"
          linkUrl="/insights"
        />
      </div>
    </div>
  );
} 