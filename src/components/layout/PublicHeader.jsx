import { Link } from 'react-router-dom';
import ThemeToggle from '../ui/ThemeToggle';

export default function PublicHeader() {
  return (
    <header className="absolute top-0 left-0 right-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                className="h-8 w-auto"
                src="/logo.svg"
                alt="AIEMR"
              />
              <span className="ml-2 text-xl font-bold text-primary-600">AIEMR</span>
            </Link>
          </div>
          <div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
} 