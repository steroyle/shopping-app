import {Stack} from '@mantine/core';
import {useQuery} from '@tanstack/react-query';
import {useQueryClient} from '@tanstack/react-query';
import AddItem from '../components/Items/AddItem';
import ItemsTable from '../components/Items/ItemsTable';
import {addItem, getCategories, getItems, Item} from '../firebase/firestoreService';
import Page from '../layouts/Page';

export function ItemsPage() {
  const queryClient = useQueryClient();

  const {data: items = [], isLoading: itemsLoading} = useQuery({
    queryKey: ['items', 'v1'],
    queryFn: getItems,
    staleTime: 0,
    gcTime: 0,
  });

  const {data: categories = [], isLoading: categoriesLoading} = useQuery({
    queryKey: ['categories', 'v1'],
    queryFn: getCategories,
  });

  const handleAddItem = async (newItem: Item) => {
    await addItem(newItem);
    // Invalidate and refetch items query after adding new item
    queryClient.invalidateQueries({queryKey: ['items']});
  };

  const pageTitle = `Items (${items.length})`;

  if (itemsLoading || categoriesLoading) {
    return <Page title="Loading...">Loading...</Page>;
  }

  return (
    <Page title={pageTitle}>
      <Stack gap="md">
        <AddItem categories={categories} onAddItem={handleAddItem} />
        <ItemsTable items={items} categories={categories} />
      </Stack>
    </Page>
  );
}
