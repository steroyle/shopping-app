import {Anchor, Box, Button, Flex, Indicator, Stack, Text} from '@mantine/core';
import {Category} from '../../firebase/firestoreService';
import {Link, useNavigate} from 'react-router-dom';

interface CategoryTableProps {
  categories: Category[];
}

const CategoryTable: React.FC<CategoryTableProps> = ({categories}) => {
  const navigate = useNavigate();

  const handleEdit = (categoryId: string | undefined) => {
    navigate(`/edit-category/${categoryId}`);
  };

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
      <Button
        component={Link}
        to={`/categories/edit/${category.id}`}
        variant="outline"
        onClick={() => handleEdit(category.id)}
      >
        Edit
      </Button>
      <Button variant="outline" color="red">
        Delete
      </Button>
    </Flex>
  ));

  return <Stack gap={0}>{rows}</Stack>;
};

export default CategoryTable;
