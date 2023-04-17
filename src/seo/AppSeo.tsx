import React from 'react';
import { DefaultSeo, DefaultSeoProps } from 'next-seo';
import { useRouter } from 'next/router';
import { APP_TITLE } from '@/common/CommonUtils';

const { NEXT_PUBLIC_BASE_URL } = process.env;

const getDefaultSeoConfig = (pathname: string): DefaultSeoProps => {
  const url = `${NEXT_PUBLIC_BASE_URL}${pathname}`;
  const description = `${APP_TITLE} is a client application for Rick and Morty GraphQL API. It's created with Next.js, Apollo-Client and TypeScript.`;
  return {
    titleTemplate: `%s | ${APP_TITLE}`,
    description,
    canonical: url,
    openGraph: {
      title: 'Rick and Morty GraphQL Application',
      description,
      type: 'website',
      locale: 'en_IE',
      url,
    },
    additionalMetaTags: [
      {
        name: 'application-name',
        content: APP_TITLE,
      },
    ],
  };
};

function AppSeo() {
  const router = useRouter();
  return <DefaultSeo {...getDefaultSeoConfig(router.asPath)} />;
}

export default AppSeo;
