import {db} from './firebaseConfig';
import {collection, addDoc, doc, updateDoc, getDocs, getDoc} from 'firebase/firestore';

interface Item {
  name: string;
  category: string;
  price: number;
}

interface ShoppingListMetadata {
  name: string;
  createdBy: string;
  createdAt: Date;
}

interface ShoppingListItem {
  itemId: string;
  quantity: number;
  isCollected: boolean;
}

type ListId = string;
type ItemId = string;
type Quantity = number;

export interface Category {
  id?: string; // Firebase auto-generated ID
  name: string;
  color: string;
}

export async function addItem(item: Item): Promise<void> {
  try {
    const docRef = await addDoc(collection(db, 'items'), item);
    console.log('Item added with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding item: ', e);
  }
}

export async function createShoppingList(
  listName: string,
  createdBy: string,
): Promise<ListId | undefined> {
  try {
    const listRef = await addDoc(collection(db, 'shoppingLists'), {
      name: listName,
      createdBy: createdBy,
      createdAt: new Date(),
    } as ShoppingListMetadata);
    console.log('Shopping list created with ID: ', listRef.id);
    return listRef.id;
  } catch (e) {
    console.error('Error creating shopping list: ', e);
  }
}

export async function addItemToShoppingList(
  listId: ListId,
  itemId: ItemId,
  quantity: Quantity,
): Promise<void> {
  try {
    const listRef = doc(db, 'shoppingLists', listId);
    await addDoc(collection(listRef, 'items'), {
      itemId: itemId,
      quantity: quantity,
      isCollected: false,
    } as ShoppingListItem);
    console.log('Item added to shopping list');
  } catch (e) {
    console.error('Error adding item to shopping list: ', e);
  }
}

export async function markItemAsCollected(listId: ListId, itemId: ItemId): Promise<void> {
  const itemRef = doc(db, 'shoppingLists', listId, 'items', itemId);
  await updateDoc(itemRef, {
    isCollected: true,
  });
}

export async function addCategory(category: Category): Promise<void> {
  try {
    const docRef = await addDoc(collection(db, 'categories'), category);
    console.log('Category added with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding category: ', e);
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'categories'));
    console.log(querySnapshot.docs);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id, // Firebase ID
      ...doc.data(), // Spread the rest of the document data
    })) as Category[];
  } catch (e) {
    console.error('Error retrieving categories: ', e);
    return [];
  }
}

export async function getCategoryById(categoryId: string): Promise<Category | null> {
  try {
    const docRef = doc(db, 'categories', categoryId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {...docSnap.data(), id: docSnap.id} as Category;
    } else {
      console.log('No category found with that ID');
      return null;
    }
  } catch (e) {
    console.error('Error retrieving category: ', e);
    return null;
  }
}

export async function updateCategory(
  categoryId: string,
  category: Partial<Category>,
): Promise<void> {
  try {
    const categoryRef = doc(db, 'categories', categoryId);
    await updateDoc(categoryRef, category);
    console.log('Category updated successfully');
  } catch (e) {
    console.error('Error updating category: ', e);
  }
}
