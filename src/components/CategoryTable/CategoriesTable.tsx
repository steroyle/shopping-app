import React, {useState, useEffect} from 'react';
import {Box, Button, Flex, Stack, Text} from '@mantine/core';
import {Category, deleteCategory} from '../../firebase/firestoreService';
import {Link, useNavigate} from 'react-router-dom';

interface CategoryTableProps {
  categories: Category[];
}

const CategoryTable: React.FC<CategoryTableProps> = ({categories}) => {
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  useEffect(() => {
    console.log('Received categories:', categories);
    setCategoryList(categories);
  }, [categories]);

  const navigate = useNavigate();

  const handleEdit = (categoryId: string) => {
    navigate(`/edit-category/${categoryId}`);
  };

  const handleDelete = (categoryId: string) => {
    deleteCategory(categoryId).then(() => {
      setCategoryList((prevCategories) =>
        prevCategories.filter((category) => category.id !== categoryId),
      );
    });
  };

  const rows = categoryList.map((category) => (
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
        onClick={() => category.id && handleEdit(category.id)}
      >
        Edit
      </Button>
      <Button
        variant="outline"
        color="red"
        onClick={() => category.id && handleDelete(category.id)}
      >
        Delete
      </Button>
    </Flex>
  ));

  return <Stack gap={0}>{rows}</Stack>;
};

export default CategoryTable;
