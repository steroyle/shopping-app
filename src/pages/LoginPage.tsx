import {signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import {auth} from '../../config/firebaseConfig';
import {Navigate} from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';
import {Button} from '@mantine/core';

export function LoginPage() {
  const {user} = useAuth();

  const handleGoogleLogin = () => {
    console.log('Login button clicked');

    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        // Handle successful login here
        console.log('User signed in:', result);
      })
      .catch((error) => {
        // Handle errors here
        console.error('Error during sign-in:', error);
      });
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <p className="mt-2 text-sm text-gray-600">Sign in to access your account</p>
        </div>
        <div className="mt-8 space-y-4">
          <Button
            variant="outline"
            onClick={handleGoogleLogin}
            leftSection={
              <img
                className=""
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google logo"
                height={15}
                width="auto"
              />
            }
          >
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  );
}
