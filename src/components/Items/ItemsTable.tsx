import {Box, Button, Flex, Group, Modal, Stack, Text} from '@mantine/core';
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Category, Item, deleteItem} from '../../firebase/firestoreService';
import {useQueryClient} from '@tanstack/react-query';

interface ItemTableProps {
  items: Item[];
  categories: Category[];
}

const ItemsTable: React.FC<ItemTableProps> = ({items, categories}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleEdit = (itemId: string) => {
    navigate(`/items/${itemId}`);
  };

  const handleDelete = (itemId: string) => {
    setItemToDelete(itemId);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      await deleteItem(itemToDelete);
      queryClient.invalidateQueries({queryKey: ['items']});
      setIsModalOpen(false);
      setItemToDelete(null);
    }
  };

  const rows = items.map((item) => {
    const category = categories.find((cat) => cat.id === item.category_id);
    return (
      <Flex
        columnGap="md"
        py="sm"
        align="center"
        style={{borderBottom: '1px solid #E9ECEF'}}
        key={item.id}
      >
        <Text flex={1}>{item.name}</Text>
        <Box
          style={{
            backgroundColor: category?.color,
            width: 25,
            height: 25,
            borderRadius: '50%',
          }}
        ></Box>
        <Text flex={1}>{category?.name || ''}</Text>
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
    );
  });

  return (
    <>
      <Stack gap={0}>{rows}</Stack>
      <Modal opened={isModalOpen} onClose={() => setIsModalOpen(false)} title="Confirm Deletion">
        <Text mb="md">
          Are you sure you want to delete the <strong>ITEM NAME HERE</strong> category?
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

export default ItemsTable;
