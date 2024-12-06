import {Flex, Grid, Group, NumberInput, Paper, Text, Title} from '@mantine/core';
import {useQuery} from '@tanstack/react-query';
import {getItemsGroupedByCategory} from '../../firebase/firestoreService';
import QuantityInput from '../QuantityInput/QuantityInput';

function ShoppingList() {
  const {
    data: groupedCategories = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['groupedCategories', 'v1'],
    queryFn: async () => {
      const data = await getItemsGroupedByCategory();
      return data.map((category) => ({
        ...category,
        color: category.color,
        items: category.items.map((item) => ({
          ...item,
          category_id: item.categoryId,
        })),
      }));
    },
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading data</Text>;

  return (
    <>
      {groupedCategories
        .filter((category) => category.items.length) // Remove empty categories
        .map((category) => (
          <Paper
            withBorder
            p="xs"
            bg="gray.0"
            mb="xl"
            style={{
              borderLeft: `10px solid ${category.color}`,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }}
            key={category.name}
          >
            <Flex columnGap="xs" mb="lg">
              <Title order={2} fz="lg">
                {category.name}
              </Title>
            </Flex>
            <Grid gutter={{base: 'xs', md: 'md'}} mb="xl">
              {category.items.map((item) => (
                <Grid.Col key={item.id} span={12} py="sm" style={{borderTop: '1px solid #e9ecef'}}>
                  <Group>
                    <Text flex={1}>{item.name}</Text>
                    <QuantityInput />
                  </Group>
                </Grid.Col>
              ))}
            </Grid>
          </Paper>
        ))}
    </>
  );
}

export default ShoppingList;
