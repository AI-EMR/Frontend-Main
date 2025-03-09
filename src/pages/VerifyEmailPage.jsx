import VerifyEmailForm from '../components/auth/VerifyEmailForm';
import PublicHeader from '../components/layout/PublicHeader';

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <PublicHeader />
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md mt-8">
        <img
          className="mx-auto h-12 w-auto"
          src="/logo.svg"
          alt="AIEMR"
        />
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <VerifyEmailForm />
      </div>
    </div>
  );
} 