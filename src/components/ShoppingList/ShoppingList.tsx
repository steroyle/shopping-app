import {Flex, Grid, Group, NumberInput, Paper, Text, Title} from '@mantine/core';
import {useQuery} from '@tanstack/react-query';
import {getItemsGroupedByCategory} from '../../firebase/firestoreService';

function ShoppingList() {
  const {
    data: groupedCategories = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['groupedCategories'],
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
          <>
            <Flex columnGap="xs" mb="lg">
              <Title order={2} fz="lg">
                {category.name}
              </Title>
            </Flex>
            <Grid gutter={{base: 'xs', md: 'md'}} mb="xl">
              {category.items.map((item) => (
                <Grid.Col span={{base: 12, sm: 6, md: 4}}>
                  <Paper
                    withBorder
                    p="xs"
                    bg="gray.0"
                    style={{
                      borderLeft: `10px solid ${category.color}`,
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    }}
                  >
                    <Group key={item.id}>
                      <Text flex={1}>{item.name}</Text>
                      <NumberInput
                        w={70}
                        value={0}
                        // onChange={(value) => handleQuantityChange(item.id, value)}
                        min={0}
                      />
                    </Group>
                  </Paper>
                </Grid.Col>
              ))}
            </Grid>
          </>
        ))}
    </>
  );
}

export default ShoppingList;
