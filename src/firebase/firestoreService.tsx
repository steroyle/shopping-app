import {db} from './firebaseConfig';
import {collection, addDoc, doc, updateDoc, getDocs, getDoc, deleteDoc} from 'firebase/firestore';

export interface Item {
  id?: string; // Firebase auto-generated ID
  name: string;
  category_id: string;
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
  console.log('Calling Firebase: addItem');
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
  console.log('Calling Firebase: createShoppingList');
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
  console.log('Calling Firebase: addItemToShoppingList');
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
  console.log('Calling Firebase: markItemAsCollected');
  const itemRef = doc(db, 'shoppingLists', listId, 'items', itemId);
  await updateDoc(itemRef, {
    isCollected: true,
  });
}

export async function addCategory(category: Category): Promise<void> {
  console.log('Calling Firebase: addCategory');
  try {
    const docRef = await addDoc(collection(db, 'categories'), category);
    console.log('Category added with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding category: ', e);
  }
}

export async function getCategories(): Promise<Category[]> {
  console.log('Calling Firebase: getCategories');
  try {
    const querySnapshot = await getDocs(collection(db, 'categories'));

    return querySnapshot.docs.map((doc) => ({
      id: doc.id, // Firebase ID
      ...doc.data(), // Spread the rest of the document data
    })) as Category[];
  } catch (e) {
    console.error('Error retrieving categories: ', e);
    return [];
  }
}

export async function getItems(): Promise<Item[]> {
  console.log('Calling Firebase: getItems');
  try {
    const querySnapshot = await getDocs(collection(db, 'items'));

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      // Verify the data has required Item properties
      if (!data.name || !data.category_id) {
        throw new Error(`Item ${doc.id} is missing required fields`);
      }
      return {
        id: doc.id,
        name: data.name,
        category_id: data.category_id,
      } as Item;
    });
  } catch (e) {
    console.error('Error retrieving items: ', e);
    return [];
  }
}

export async function getCategoryById(categoryId: string): Promise<Category | null> {
  console.log('Calling Firebase: getCategoryById', categoryId);
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

export async function getItemById(itemId: string): Promise<Item | null> {
  console.log('Calling Firebase: getItemById', itemId);
  try {
    const docRef = doc(db, 'items', itemId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {...docSnap.data(), id: docSnap.id} as Item;
    } else {
      console.log('No item found with that ID');
      return null;
    }
  } catch (e) {
    console.error('Error retrieving item: ', e);
    return null;
  }
}

export async function updateCategory(
  categoryId: string,
  category: Partial<Category>,
): Promise<void> {
  console.log('Calling Firebase: updateCategory', categoryId);
  try {
    const categoryRef = doc(db, 'categories', categoryId);
    await updateDoc(categoryRef, category);
    console.log(category);
  } catch (e) {
    console.error('Error updating category: ', e);
  }
}

/**
 * Updates an existing item in Firestore
 * @param itemId - The ID of the item to update
 * @param item - Partial Item object containing the fields to update
 * @returns Promise that resolves when update is complete
 */
export async function updateItem(itemId: string, item: Partial<Item>): Promise<void> {
  console.log('Calling Firebase: updateItem', itemId);
  try {
    // Get reference to item document
    const itemRef = doc(db, 'items', itemId);
    // Update the item with new data
    await updateDoc(itemRef, item);
    // Log updated item data
    console.log(item);
  } catch (e) {
    // Log any errors that occur during update
    console.error('Error updating item: ', e);
  }
}

export async function deleteCategory(categoryId: string): Promise<void> {
  console.log('Calling Firebase: deleteCategory', categoryId);
  try {
    const categoryRef = doc(db, 'categories', categoryId);
    await deleteDoc(categoryRef);
    console.log('Category successfully deleted!');
  } catch (error) {
    console.error('Error removing category: ', error);
  }
}

export async function deleteItem(itemId: string): Promise<void> {
  console.log('Calling Firebase: deleteItem', itemId);
  try {
    const itemRef = doc(db, 'items', itemId);
    await deleteDoc(itemRef);
    console.log('Item successfully deleted!');
  } catch (error) {
    console.error('Error removing item: ', error);
  }
}

export async function getItemsGroupedByCategory() {
  console.log('Calling Firebase: getItemsGroupedByCategory');
  const categoriesCollection = collection(db, 'categories');
  const itemsCollection = collection(db, 'items');

  const categoriesSnapshot = await getDocs(categoriesCollection);
  const itemsSnapshot = await getDocs(itemsCollection);

  const categories = categoriesSnapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
    color: doc.data().color,
  }));

  const items = itemsSnapshot.docs.map((doc) => ({
    id: doc.id,
    categoryId: doc.data().category_id,
    name: doc.data().name,
  }));

  // Group items by category
  const groupedData = categories.map((category) => ({
    name: category.name,
    color: category.color,
    items: items.filter((item) => item.categoryId === category.id),
  }));

  return groupedData;
}
