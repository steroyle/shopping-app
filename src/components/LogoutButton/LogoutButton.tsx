import {signOut} from 'firebase/auth';
import {auth} from '../../../config/firebaseConfig';
import {Button} from '@mantine/core';

const LogoutButton = () => {
  const handleLogout = () => {
    signOut(auth);
  };

  return <Button onClick={handleLogout}>Sign out</Button>;
};

export default LogoutButton;
