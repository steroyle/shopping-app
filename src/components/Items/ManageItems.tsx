import {useEffect, useState} from 'react';
import {getItems, Item} from '../../firebase/firestoreService';

function ManageItems() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    async function fetchItems() {
      const items = await getItems();
      setItems(items);
    }
    fetchItems();
  }, []);

  console.log(items);

  return items.map((item) => (
    <div key={item.id}>
      <p>{item.name}</p>
      <p>{item.category_id}</p>
    </div>
  ));
}

export default ManageItems;
