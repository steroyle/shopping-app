import {Button, Paper, Stack, Text, Title} from '@mantine/core';
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {Navigate} from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';
import {auth} from '../firebase/firebaseConfig';
import LoginLayout from '../layouts/LoginLayout';

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
    <LoginLayout>
      <Title mb="lg" fz={40}>
        Shopping App
      </Title>
      <Paper withBorder p="xl">
        <Stack align="center" gap="lg">
          <Text>Sign in to access your shopping list</Text>
          <Button
            variant="outline"
            onClick={handleGoogleLogin}
            leftSection={
              <img
                className=""
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google logo"
                height={15}
              />
            }
            w="fit-content"
          >
            Sign in with Google
          </Button>
        </Stack>
      </Paper>
    </LoginLayout>
  );
}
