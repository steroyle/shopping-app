import {useState, useEffect} from 'react';
import {getCategories, addItem, Item, Category, getItems} from '../firebase/firestoreService';
import AddItem from '../components/Items/AddItem';
import ItemsTable from '../components/Items/ItemsTable';
import Page from '../layouts/Page';

export function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    };

    const fetchItems = async () => {
      const itemsData = await getItems();
      setItems(itemsData);
    };

    fetchCategories();
    fetchItems();
  }, []);

  const handleAddItem = async (newItem: Item) => {
    await addItem(newItem);
    setItems((prevItems) => [...prevItems, newItem]);
  };

  return (
    <Page title="Items">
      <AddItem categories={categories} onAddItem={handleAddItem} />
      <ItemsTable items={items} categories={categories} />
    </Page>
  );
}
