import React, {useState, useEffect} from 'react';
import {Box, Button, Flex, Group, Modal, Stack, Text} from '@mantine/core';
import {Category, deleteCategory} from '../../firebase/firestoreService';
import {Link, useNavigate} from 'react-router-dom';

interface CategoryTableProps {
  categories: Category[];
}

const CategoryTable: React.FC<CategoryTableProps> = ({categories}) => {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null); // State for category to delete

  useEffect(() => {
    console.log('Received categories:', categories);
    setCategoryList(categories);
  }, [categories]);

  const navigate = useNavigate();

  const handleEdit = (categoryId: string) => {
    navigate(`/edit-category/${categoryId}`);
  };

  const handleDelete = (categoryId: string) => {
    setCategoryToDelete(categoryId);
    setIsModalOpen(true);
  };

  const getCategoryName = (categoryId: string | null) => {
    const category = categoryList.find((cat) => cat.id === categoryId);
    return category ? category.name : '';
  };

  const confirmDelete = () => {
    if (categoryToDelete) {
      deleteCategory(categoryToDelete).then(() => {
        setCategoryList((prevCategories) =>
          prevCategories.filter((category) => category.id !== categoryToDelete),
        );
        setIsModalOpen(false);
        setCategoryToDelete(null);
      });
    }
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

  return (
    <>
      <Stack gap={0}>{rows}</Stack>
      <Modal opened={isModalOpen} onClose={() => setIsModalOpen(false)} title="Confirm Deletion">
        <Text mb="md">
          Are you sure you want to delete the <strong>{getCategoryName(categoryToDelete)}</strong>{' '}
          category?
        </Text>
        <Group>
          <Button color="red" onClick={confirmDelete}>
            Yes, Delete
          </Button>
          <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
        </Group>
      </Modal>
    </>
  );
};

export default CategoryTable;
