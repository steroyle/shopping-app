import {
  Box,
  Button,
  Combobox,
  Group,
  Input,
  InputBase,
  Paper,
  Text,
  TextInput,
  useCombobox,
} from '@mantine/core';
import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Category, getCategories, getItemById, updateItem} from '../firebase/firestoreService';
import Page from '../layouts/Page';
import {useQueryClient} from '@tanstack/react-query';

export function ItemEditPage() {
  const {itemId} = useParams<{itemId: string}>();
  const navigate = useNavigate();
  const [item, setItem] = useState<{name: string; category_id: string} | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [category_id, setCategoryId] = useState('');
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    };

    const fetchItem = async () => {
      if (itemId) {
        const fetchedItem = await getItemById(itemId);
        setItem(fetchedItem);
        setCategoryId(fetchedItem?.category_id || '');
      }
    };
    fetchCategories();
    fetchItem();
  }, [itemId]);

  const handleSave = async () => {
    if (item && itemId) {
      try {
        // Wait for the update
        await updateItem(itemId, {name: item.name, category_id});

        // Wait for all cache operations to complete
        await Promise.all([
          queryClient.invalidateQueries({queryKey: ['items', 'v1']}),
          queryClient.invalidateQueries({queryKey: ['groupedCategories', 'v1']}),
          queryClient.refetchQueries({queryKey: ['items', 'v1'], exact: true}),
          queryClient.refetchQueries({queryKey: ['groupedCategories', 'v1'], exact: true}),
        ]);

        // Only navigate after everything is done
        navigate('/items');
      } catch (error) {
        console.error('Error saving item:', error);
      }
    }
  };

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = categories
    .filter((category) => category.id !== undefined)
    .map((category) => (
      <Combobox.Option value={category.id as string} key={category.id}>
        <Group gap="sm">
          <Box w={15} h={15} bg={category.color} style={{borderRadius: '50%'}} />
          <Text>{category.name}</Text>
        </Group>
      </Combobox.Option>
    ));

  if (!item) return <Page>Loading...</Page>;

  return (
    <Page title="Edit Category">
      <Paper withBorder p="md" bg="gray.0">
        <Group gap="sm" align="flex-end">
          <TextInput value={item.name} onChange={(e) => setItem({...item, name: e.target.value})} />
          <Combobox
            store={combobox}
            onOptionSubmit={(val) => {
              setCategoryId(val);
              combobox.closeDropdown();
            }}
          >
            <Combobox.Target>
              <InputBase
                component="button"
                type="button"
                pointer
                rightSection={<Combobox.Chevron />}
                rightSectionPointerEvents="none"
                onClick={() => combobox.toggleDropdown()}
                w={250}
              >
                {categories.find((category) => category.id === category_id)?.name || (
                  <Input.Placeholder>Category</Input.Placeholder>
                )}
              </InputBase>
            </Combobox.Target>

            <Combobox.Dropdown>
              <Combobox.Options>{options}</Combobox.Options>
            </Combobox.Dropdown>
          </Combobox>
          <Button onClick={handleSave}>Save</Button>
        </Group>
      </Paper>
    </Page>
  );
}
