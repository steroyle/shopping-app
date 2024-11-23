import {Container, Flex, Stack} from '@mantine/core';
import Footer from '../components/Footer/Footer';

interface PageProps {
  children: React.ReactNode;
}

const LoginLayout = ({children}: PageProps) => {
  return (
    <Container size={1200}>
      <Flex direction="column" h="100vh">
        <Stack component="main" flex={1} justify="center" align="center">
          {children}
        </Stack>
        <Footer />
      </Flex>
    </Container>
  );
};

export default LoginLayout;
