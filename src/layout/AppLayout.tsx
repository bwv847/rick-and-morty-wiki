import React from 'react';
import { Container, Toolbar } from '@mui/material';
import NextLink from '@/routing/NextLink';
import { routes } from '@/routing/routes';
import { Typography } from 'antd';

const { Title } = Typography;

type AppLayoutProps = React.PropsWithChildren;

function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <Container maxWidth="lg" component="main" sx={{ p: 2 }}>
        <NextLink href={routes.home({})}>
          <Title>Rick and Morty</Title>
        </NextLink>
        {children}
      </Container>
    </>
  );
}

export default AppLayout;
