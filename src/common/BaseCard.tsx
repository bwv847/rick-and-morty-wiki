import React from 'react';
import { Card, CardActionArea, CardProps } from '@mui/material';
import NextLink from '@/routing/NextLink';

type BaseCardProps = React.PropsWithChildren<
  CardProps & {
    href?: string;
  }
>;

function BaseCard({ href, children, ...rest }: BaseCardProps) {
  return (
    <Card elevation={4} {...rest}>
      {href ? (
        <CardActionArea LinkComponent={NextLink} href={href}>
          {children}
        </CardActionArea>
      ) : (
        children
      )}
    </Card>
  );
}

export default BaseCard;
