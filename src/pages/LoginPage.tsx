import {signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import {auth} from '../../config/firebaseConfig';
import {Navigate} from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';

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
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to access your account</p>
        </div>
        <div className="mt-8 space-y-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            <img
              className=""
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google logo"
              height={25}
              width="auto"
            />
            Continue with Google
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Open source project</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
