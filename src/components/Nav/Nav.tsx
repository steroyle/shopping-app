import {NavLink, Stack} from '@mantine/core';
import {Link} from 'react-router-dom';

function Nav() {
  return (
    <Stack component="nav" gap={0}>
      <NavLink to="/" label="Home" component={Link} />
      <NavLink to="/chords" label="Chords" component={Link} />
      <NavLink to="/number-system" label="Number System" component={Link} />
      <NavLink to="/songs" label="Songs" component={Link} />
    </Stack>
  );
}

export default Nav;
