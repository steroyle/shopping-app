import {Box, Container, Group, Title, Text} from '@mantine/core';
import LogoutButton from '../LogoutButton/LogoutButton';
import {useAuth} from '../../contexts/AuthContext';

function Header() {
  const {user} = useAuth();

  return (
    <Box component="header" bg="gray.0" style={{borderBottom: '1px solid #e9ecef'}}>
      <Container size={1200}>
        <Group py="md" justify="space-between" align="center">
          <Title fz={25}>
            <Text variant="gradient" gradient={{from: 'red', to: 'pink', deg: 90}} fw={700} fz={25}>
              Shopping App
            </Text>
          </Title>
          <Text ml="auto">{user?.displayName}</Text>
          <LogoutButton />
        </Group>
      </Container>
    </Box>
  );
}

export default Header;
