import {useState} from 'react';
import {createShoppingList} from '../../firebase/firestoreService';

function CreateShoppingList() {
  const [listName, setListName] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createShoppingList(listName, 'user1'); // Replace "user1" with actual user ID
    setListName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        placeholder="List Name"
      />
      <button type="submit">Create List</button>
    </form>
  );
}

export default CreateShoppingList;
