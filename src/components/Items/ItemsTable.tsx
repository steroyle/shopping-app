import {useEffect, useState} from 'react';
import {Item} from '../../firebase/firestoreService';
import {Flex, Text, Button, Stack, Modal, Group} from '@mantine/core';
import {Link, useNavigate} from 'react-router-dom';

interface ItemTableProps {
  items: Item[];
}

const ItemsTable: React.FC<ItemTableProps> = ({items}) => {
  const [itemsList, setItemsList] = useState<Item[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  useEffect(() => {
    console.log('Received items:', items);
    setItemsList(items);
  }, [items]);

  const navigate = useNavigate();

  const handleEdit = (itemId: string) => {
    navigate(`/edit-item/${itemId}`);
  };

  const handleDelete = (itemId: string) => {
    setItemToDelete(itemId);
    setIsModalOpen(true);
  };

  const rows = itemsList.map((item) => (
    <Flex
      columnGap="md"
      py="sm"
      align="center"
      style={{borderBottom: '1px solid #E9ECEF'}}
      key={item.name}
    >
      <Text flex={1}>{item.name}</Text>
      <Button
        component={Link}
        to={`/categories/edit/${item.id}`}
        variant="outline"
        onClick={() => item.id && handleEdit(item.id)}
      >
        Edit
      </Button>
      <Button variant="outline" color="red" onClick={() => item.id && handleDelete(item.id)}>
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
