import {Title} from '@mantine/core';
import Page from '../layouts/Page';
import ManageCategories from '../components/ManageCategories/ManageCategories';

export function CategoriesPage() {
  return (
    <Page title="Categories">
      <ManageCategories />
    </Page>
  );
}
