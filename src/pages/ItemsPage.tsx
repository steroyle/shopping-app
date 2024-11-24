import {Title} from '@mantine/core';
import Page from '../layouts/Page';
import AddItem from '../components/AddItem/AddItem';

export function ItemsPage() {
  return (
    <Page>
      <Title mb="md" fz={20}>
        Items
      </Title>
      <AddItem />
    </Page>
  );
}
