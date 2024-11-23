import {Title} from '@mantine/core';
import LogoutButton from '../components/LogoutButton/LogoutButton';
import {useAuth} from '../contexts/AuthContext';
import Page from '../layouts/Page';

export function HomePage() {
  const {user} = useAuth();

  return (
    <Page>
      <Title mb="md" fz={20}>
        Welcome {user?.displayName}
      </Title>
    </Page>
  );
}
