import {Box, Button, ColorInput, Group, Paper, TextInput, Title} from '@mantine/core';
import {useNavigate, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {
  Category,
  getCategoryById,
  getItemById,
  updateCategory,
  updateItem,
} from '../firebase/firestoreService';
import Page from '../layouts/Page';

export function ItemEditPage() {
  const {itemId} = useParams<{itemId: string}>();
  const navigate = useNavigate();
  const [item, setItem] = useState<{name: string; category_id: string} | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      if (itemId) {
        const fetchedItem = await getItemById(itemId);
        setItem(fetchedItem);
      }
    };
    fetchItem();
  }, [itemId]);

  const handleSave = async () => {
    if (item && itemId) {
      const {name, category_id} = item;
      await updateItem(itemId, {name, category_id});
      navigate('/items');
    }
  };

  if (!item) return <Page>Loading...</Page>;

  return (
    <Page title="Edit Category">
      <Paper withBorder p="md" bg="gray.0">
        <Group gap="sm" align="flex-end">
          <TextInput value={item.name} onChange={(e) => setItem({...item, name: e.target.value})} />
          <ColorInput
            value={item.category_id}
            placeholder="Colour"
            onChange={(category_id) => setItem({...item, category_id})}
          />
          <Button onClick={handleSave}>Save</Button>
        </Group>
      </Paper>
    </Page>
  );
}
