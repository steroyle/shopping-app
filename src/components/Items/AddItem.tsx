import {useState, useEffect} from 'react';
import {addItem, Category, Item} from '../../firebase/firestoreService';
import {getCategories} from '../../firebase/firestoreService';
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

interface AddItemProps {
  categories: Category[];
  onAddItem: (item: Item) => void;
}

function AddItem({categories, onAddItem}: AddItemProps) {
  const [name, setName] = useState('');
  const [category_id, setCategoryId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAddItem({name, category_id});
    setName('');
    setCategoryId('');
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

  return (
    <Paper withBorder p="md" bg="gray.0">
      <form onSubmit={handleSubmit}>
        <Group gap="sm">
          <TextInput value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
          {/* TODO: Add form validation, not setting a category will crash the item list */}
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
                {categories.find((cat) => cat.id === category_id)?.name || (
                  <Input.Placeholder>Category</Input.Placeholder>
                )}
              </InputBase>
            </Combobox.Target>

            <Combobox.Dropdown>
              <Combobox.Options>{options}</Combobox.Options>
            </Combobox.Dropdown>
          </Combobox>

          <Button type="submit">Add Item</Button>
        </Group>
      </form>
    </Paper>
  );
}

export default AddItem;
