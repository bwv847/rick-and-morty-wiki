import React from 'react';
import {
  ListItemText,
  ListItemTextProps,
  ListItemButtonProps,
  ListItem,
} from '@mui/material';
import { NextLinkProps } from '@/routing/NextLink';

type ListItemLinkProps = Pick<NextLinkProps, 'href'> &
  Pick<ListItemTextProps, 'primary' | 'secondary'> &
  Pick<ListItemButtonProps, 'selected' | 'divider'>;

function ListItemLink({ primary, secondary }: ListItemLinkProps) {
  return (
    <ListItem disablePadding>
      <ListItemText primary={primary} secondary={secondary} />
    </ListItem>
  );
}

export default ListItemLink;
