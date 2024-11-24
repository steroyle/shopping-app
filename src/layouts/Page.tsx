import Header from '../components/Header/Header';
import Nav from '../components/Nav/Nav';
import {Box, Container, Flex, Group} from '@mantine/core';
import Footer from '../components/Footer/Footer';

interface PageProps {
  children: React.ReactNode;
}

const Page = ({children}: PageProps) => {
  return (
    <>
      <Header />
      <Container size={1200} py="md">
        <Flex direction="column" h="100vh">
          <Group gap="xl" flex={1} align="flex-start">
            <Nav />
            <Box component="main" flex={1}>
              {children}
            </Box>
          </Group>
          <Footer />
        </Flex>
      </Container>
    </>
  );
};

export default Page;
