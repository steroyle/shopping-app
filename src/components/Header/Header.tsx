import {Group, Title} from '@mantine/core';
import LogoutButton from '../LogoutButton/LogoutButton';

function Header() {
  return (
    <Group component="header" justify="space-between">
      <Title mb="md" fz={25}>
        Shopping App
      </Title>
      <LogoutButton />
    </Group>
  );
}

export default Header;
