import {Box, Button, Flex, Indicator, Stack, Text} from '@mantine/core';
import {Category} from '../../firebase/firestoreService';

interface CategoryTableProps {
  categories: Category[];
}

const CategoryTable: React.FC<CategoryTableProps> = ({categories}) => {
  const rows = categories.map((category) => (
    <Flex
      columnGap="md"
      py="sm"
      align="center"
      style={{borderBottom: '1px solid #E9ECEF'}}
      key={category.name}
    >
      <Box
        style={{backgroundColor: category.color, width: 25, height: 25, borderRadius: '50%'}}
      ></Box>
      <Text flex={1}>{category.name}</Text>
      <Button variant="outline">Edit</Button>
      <Button variant="outline" color="red">
        Delete
      </Button>
    </Flex>
  ));

  return <Stack gap={0}>{rows}</Stack>;
};

export default CategoryTable;
