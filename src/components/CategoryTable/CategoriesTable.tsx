import {Box, Button, Flex, Group, Modal, Stack, Text} from '@mantine/core';
import {useQueryClient} from '@tanstack/react-query';
import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Category, deleteCategory} from '../../firebase/firestoreService';

interface CategoryTableProps {
  categories: Category[];
}

const CategoryTable: React.FC<CategoryTableProps> = ({categories}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleEdit = (categoryId: string) => {
    navigate(`/categories/${categoryId}`);
  };

  const handleDelete = (categoryId: string) => {
    setCategoryToDelete(categoryId);
    setIsModalOpen(true);
  };

  const getCategoryName = (categoryId: string | null) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : '';
  };

  const confirmDelete = async () => {
    if (categoryToDelete) {
      await deleteCategory(categoryToDelete);
      // Invalidate and refetch categories query after deletion
      queryClient.invalidateQueries({queryKey: ['categories']});
      setIsModalOpen(false);
      setCategoryToDelete(null);
    }
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
        to={`/categories/${category.id}`}
        variant="outline"
        size="xs"
        onClick={() => category.id && handleEdit(category.id)}
      >
        Edit
      </Button>
      <Button
        variant="outline"
        color="red"
        size="xs"
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
          <Button color="red" size="xs" onClick={confirmDelete}>
            Yes, Delete
          </Button>
          <Button size="xs" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default CategoryTable;
