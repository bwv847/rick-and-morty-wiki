import React from 'react';
import Link, { LinkProps } from 'next/link';
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';

export type NextLinkProps = React.PropsWithChildren<
  Omit<LinkProps, 'passHref' | 'href'>
> &
  Pick<MuiLinkProps, 'href' | 'className' | 'underline' | 'color'>;

const NextLink = React.forwardRef<
  React.ComponentRef<typeof MuiLink>,
  NextLinkProps
>(function NextLink(
  { children, underline = 'none', color = 'inherit', ...rest },
  ref,
) {
  return (
    <MuiLink
      ref={ref}
      underline={underline}
      color={color}
      component={Link}
      {...rest}
    >
      {children}
    </MuiLink>
  );
});

export default NextLink;
