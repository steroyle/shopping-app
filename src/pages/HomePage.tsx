import {Text} from '@mantine/core';
import {useAuth} from '../contexts/AuthContext';
import Page from '../layouts/Page';

export function HomePage() {
  const {user} = useAuth();

  return (
    <Page title={`Welcome, ${user?.displayName}`}>
      <Text>Home page content</Text>
    </Page>
  );
}
