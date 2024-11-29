import {Button, ColorInput, Group, Paper, Stack, TextInput} from '@mantine/core';
import {useEffect, useState} from 'react';
import {addCategory, Category, getCategories} from '../../firebase/firestoreService';
import CategoryTable from '../CategoryTable/CategoriesTable';

function ManageCategories() {
  const [categoryName, setCategoryName] = useState('');
  const [categoryColor, setCategoryColor] = useState(''); // Default color
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const categories = await getCategories();
      setCategories(categories);
    }
    fetchCategories();
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (categoryName.trim() === '') return;
    // Omit id when adding since Firebase will generate it
    await addCategory({name: categoryName, color: categoryColor} as Category);
    setCategoryName('');
    setCategoryColor('#000000'); // Reset to default color
    const updatedCategories = await getCategories();
    setCategories(updatedCategories);
  };

  return (
    <Stack gap="md">
      <Paper withBorder p="md" bg="gray.0">
        <form onSubmit={handleAddCategory}>
          <Group gap="sm">
            <TextInput
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Category Name"
            />
            <ColorInput value={categoryColor} placeholder="Colour" onChangeEnd={setCategoryColor} />
            <Button type="submit">Add Category</Button>
          </Group>
        </form>
      </Paper>
      <CategoryTable categories={categories} />
    </Stack>
  );
}

export default ManageCategories;
