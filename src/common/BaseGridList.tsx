import React from 'react';
import { Grid } from '@mui/material';
import { Maybe } from '@/gql/graphql';

export interface BaseGridListProps<Item> {
  items: Maybe<Array<Item>>;
  loading?: boolean;
  renderItem: (item: Item, index: number) => void;
  loadingRef?: React.Ref<HTMLDivElement>;
}

function BaseGridList<Item>({
  items = [] as Item[],
  renderItem,
}: BaseGridListProps<Item>) {
  return (
    <Grid container spacing={1}>
      <>{items?.map((item, index) => renderItem(item, index))}</>
    </Grid>
  );
}

export default BaseGridList;
