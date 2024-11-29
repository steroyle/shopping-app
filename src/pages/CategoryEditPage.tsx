import {Button, ColorInput, Group, Paper, TextInput} from '@mantine/core';
import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {getCategoryById, updateCategory} from '../firebase/firestoreService';
import Page from '../layouts/Page';

export function CategoryEditPage() {
  const {categoryId} = useParams<{categoryId: string}>();
  const navigate = useNavigate();
  const [category, setCategory] = useState<{name: string; color: string} | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      if (categoryId) {
        const fetchedCategory = await getCategoryById(categoryId);
        setCategory(fetchedCategory);
      }
    };
    fetchCategory();
  }, [categoryId]);

  const handleSave = async () => {
    if (category && categoryId) {
      const {name, color} = category;
      await updateCategory(categoryId, {name, color});
      navigate('/categories');
    }
  };

  if (!category) return <Page>Loading...</Page>;

  return (
    <Page title="Edit Category">
      <Paper withBorder p="md" bg="gray.0">
        <Group gap="sm" align="flex-end">
          <TextInput
            value={category.name}
            onChange={(e) => setCategory({...category, name: e.target.value})}
          />
          <ColorInput
            value={category.color}
            placeholder="Colour"
            onChange={(color) => setCategory({...category, color})}
          />
          <Button onClick={handleSave}>Save</Button>
        </Group>
      </Paper>
    </Page>
  );
}
