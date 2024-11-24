import {Box, Button, ColorInput, Group, Paper, TextInput, Title} from '@mantine/core';
import {useNavigate, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {Category, getCategoryById, updateCategory} from '../firebase/firestoreService';
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
    <Page>
      <Title order={2} mb="md">
        Edit Category
      </Title>
      <Paper withBorder p="md">
        <Group gap="sm" align="flex-end">
          <TextInput
            label="Name"
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
