import Page from '../layouts/Page';
import ShoppingList from '../components/ShoppingList/ShoppingList';

export function HomePage() {
  return (
    <Page title={`Shopping list`}>
      <ShoppingList />
    </Page>
  );
}
