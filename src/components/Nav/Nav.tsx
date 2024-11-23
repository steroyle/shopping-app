import {NavLink, Stack} from '@mantine/core';
import {Link} from 'react-router-dom';

function Nav() {
  return (
    <Stack component="nav" gap={0}>
      <NavLink to="/" label="Shopping List" component={Link} />
      <NavLink to="/items" label="Items" component={Link} />
    </Stack>
  );
}

export default Nav;
