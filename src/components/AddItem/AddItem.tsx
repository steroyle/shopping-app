import {useState, useEffect} from 'react';
import {addItem, Category} from '../../firebase/firestoreService';
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

function AddItem() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const categories = await getCategories();
      setCategories(categories);
    }
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addItem({name, category, price: parseFloat(price)});
    setName('');
    setCategory('');
    setPrice('');
  };

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | null>(null);

  const options = categories.map((item) => (
    <Combobox.Option value={item.name} key={item.name}>
      <Group gap="sm">
        <Box w={15} h={15} bg={item.color} style={{borderRadius: '50%'}} />
        <Text>{item.name}</Text>
      </Group>
    </Combobox.Option>
  ));

  return (
    <Paper withBorder p="md" bg="gray.0">
      <form onSubmit={handleSubmit}>
        <Group gap="sm">
          <TextInput value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />

          <Combobox
            store={combobox}
            onOptionSubmit={(val) => {
              setValue(val);
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
                {value || <Input.Placeholder>Pick value</Input.Placeholder>}
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
