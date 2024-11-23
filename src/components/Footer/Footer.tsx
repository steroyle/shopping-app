import {Group, Text} from '@mantine/core';
import {Link} from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <Group justify="center" p="lg">
        <Text fz="sm">
          Created by <Link to="https://github.com/steroyle">Ste Royle</Link>
        </Text>
      </Group>
    </footer>
  );
}

export default Footer;
