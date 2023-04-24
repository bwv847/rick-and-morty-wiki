import React from 'react';
import { Container, Typography } from '@mui/material';
import NextLink from '@/routing/NextLink';
import { routes } from '@/routing/routes';

type AppLayoutProps = React.PropsWithChildren;

function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <Container maxWidth="lg" component="main" sx={{ p: 2 }}>
        <NextLink href={routes.home({})}>
          <Typography
            variant="h3"
            component="h1"
            color="textPrimary"
            fontWeight="bold"
          >
            Rick and Morty
          </Typography>
        </NextLink>
        {children}
      </Container>
    </>
  );
}

export default AppLayout;
