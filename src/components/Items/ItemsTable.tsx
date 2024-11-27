import {useEffect, useState} from 'react';
import {Category, Item, getCategories} from '../../firebase/firestoreService';
import {Flex, Text, Button, Stack, Modal, Group} from '@mantine/core';
import {Link, useNavigate} from 'react-router-dom';

interface ItemTableProps {
  items: Item[];
  categories: Category[];
}

const ItemsTable: React.FC<ItemTableProps> = ({items, categories}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleEdit = (itemId: string) => {
    navigate(`/items/${itemId}`);
  };

  const handleDelete = (itemId: string) => {
    setItemToDelete(itemId);
    setIsModalOpen(true);
  };

  const rows = items.map((item) => (
    <Flex
      columnGap="md"
      py="sm"
      align="center"
      style={{borderBottom: '1px solid #E9ECEF'}}
      key={item.name}
    >
      <Text flex={1}>{item.name}</Text>
      <Text flex={1}>
        {categories.find((cat) => cat.id === item.category_id)?.name || 'Unknown Category'}
      </Text>
      <Button
        component={Link}
        to={`/items/${item.id}`}
        variant="outline"
        size="xs"
        onClick={() => item.id && handleEdit(item.id)}
      >
        Edit
      </Button>
      <Button
        variant="outline"
        color="red"
        size="xs"
        onClick={() => item.id && handleDelete(item.id)}
      >
        Delete
      </Button>
    </Flex>
  ));

  return (
    <>
      <Stack gap={0}>{rows}</Stack>
      {/* <Modal opened={isModalOpen} onClose={() => setIsModalOpen(false)} title="Confirm Deletion">
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
      </Modal> */}
    </>
  );
};

export default ItemsTable;
