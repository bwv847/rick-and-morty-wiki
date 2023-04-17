import { useMemo } from 'react';
import {
  ApolloClient,
  HttpLink,
  from,
  NormalizedCacheObject,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { IS_SERVER } from '@/common/CommonUtils';
import typeDefs from './typeDefs';
import cache from './cache';
import merge from 'deepmerge';
import _ from 'lodash';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<NormalizedCacheObject>;

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      // eslint-disable-next-line no-console
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }

  if (networkError) {
    // eslint-disable-next-line no-console
    console.log(`[Network error]: ${networkError}`);
  }
});

const httpLink = new HttpLink({
  uri: IS_SERVER
    ?
      `${process.env.API_URL}/graphql`
    : `${process.env.NEXT_PUBLIC_BASE_URL}/api/graphql`,
});

function createApolloClient() {
  return new ApolloClient({
    typeDefs,
    cache,
    ssrMode: IS_SERVER,
    link: from([errorLink, httpLink]),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.extract();

    const data = merge(existingCache, initialState, {
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !_.isEqual(d, s)),
        ),
      ],
    });

    _apolloClient.cache.restore(data);
  }

  if (IS_SERVER) {
    return _apolloClient;
  }

  if (!apolloClient) {
    apolloClient = _apolloClient;
  }

  return _apolloClient;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function addApolloState(client: typeof apolloClient, pageProps: any) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useApollo(pageProps: any) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}
