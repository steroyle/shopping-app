import {signOut} from 'firebase/auth';
import {auth} from '../../config/firebaseConfig';
import {useAuth} from '../contexts/AuthContext';
import {Button} from '@mantine/core';
import Page from '../layouts/Page';

export function HomePage() {
  const {user} = useAuth();

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <Page>
      <div className="min-h-screen bg-gray-50">
        <Button onClick={handleLogout}>Sign out</Button>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900">
                  Welcome {user?.displayName} ({user?.email})
                </h2>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Page>
  );
}
