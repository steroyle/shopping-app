import {signOut} from 'firebase/auth';
import {auth} from '../../config/firebaseConfig';
import {useAuth} from '../contexts/AuthContext';

export function HomePage() {
  const {user} = useAuth();

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="ml-2 text-xl font-semibold text-gray-900">Dashboard</span>
            </div>
            <div className="flex items-center">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">{user?.email}</span>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900">Welcome to your dashboard</h2>
              <p className="mt-1 text-sm text-gray-500">
                You're successfully logged in. This is your protected home page.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
