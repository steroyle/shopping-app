import {Title} from '@mantine/core';
import Page from '../layouts/Page';
import AddItem from '../components/AddItem/AddItem';

export function ItemsPage() {
  return (
    <Page title="Items">
      <AddItem />
    </Page>
  );
}
