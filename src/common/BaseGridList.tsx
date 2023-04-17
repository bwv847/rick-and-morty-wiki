import React from 'react';
import { Grid } from '@mui/material';
import LoadingIndicator from './LoadingIndicator';
import { Maybe } from '@/gql/graphql';

export interface BaseGridListProps<Item> {
  items: Maybe<Array<Item>>;
  loading?: boolean;
  renderItem: (item: Item, index: number) => void;
  loadingRef?: React.Ref<HTMLDivElement>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const defaultItems: any[] = [];

function BaseGridList<Item>({
  items = defaultItems as Item[],
  loading,
  renderItem,
  loadingRef,
}: BaseGridListProps<Item>) {
  return (
    <Grid container spacing={1}>
      <>
        {items?.map((item, index) => renderItem(item, index))}
        {loading && (
          <Grid item xs={12} ref={loadingRef}>
            <LoadingIndicator loading />
          </Grid>
        )}
      </>
    </Grid>
  );
}

export default BaseGridList;
