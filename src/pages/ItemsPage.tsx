import Page from '../layouts/Page';
import AddItem from '../components/Items/AddItem';
import ManageItems from '../components/Items/ManageItems';
import ItemsTable from '../components/Items/ItemsTable';
import {getItems, Item} from '../firebase/firestoreService';
import {useEffect, useState} from 'react';

export function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    async function fetchItems() {
      const items = await getItems();
      setItems(items);
    }
    fetchItems();
  }, []);

  return (
    <Page title="Items">
      <AddItem />
      {/* <ManageItems /> */}
      <ItemsTable items={items} />
    </Page>
  );
}
