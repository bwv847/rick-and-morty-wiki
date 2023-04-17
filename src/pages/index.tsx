import { useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import {
  GetCharactersDocument,
  GetCharactersQueryVariables,
  useGetCharactersQuery,
} from '@/gql/graphql';
import BaseSeo from '@/seo/BaseSeo';
import CharacterGridList from '@/characters/CharacterGridList';
import PAGE_INFO_FRAGMENT from '@/apollo/fragments';
import CharacterSearch from '@/characters/CharacterSearch';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { QueryParams, routes } from '@/routing/routes';
import { useRouteParams } from '@/routing/RoutingHooks';
import { addApolloState, initializeApollo } from '@/apollo/apollo';
import { GetServerSideProps } from 'next';
import { ParsedRouteParams, parseRouteParams } from '@/routing/RoutingUtils';
import { EmptyObject } from '@/common/CommonTypes';
import { gql } from '@apollo/client';

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      results {
        ...CharacterGridList_character
      }
      info {
        ...pageInfo
      }
    }
  }
  ${CharacterGridList.fragments.character}
  ${PAGE_INFO_FRAGMENT}
`;

type CharactersListingPageQueryParams = QueryParams<typeof routes.characters>;

function getVariables(
  parsedRouteParams: ParsedRouteParams<CharactersListingPageQueryParams>,
): GetCharactersQueryVariables {
  const name = parsedRouteParams.get('name');

  if (!name) {
    return {};
  }

  return { filter: { name } };
}

function CharactersListingPage() {
  const { routeParams } = useRouteParams<
    EmptyObject,
    CharactersListingPageQueryParams
  >();
  const variables = getVariables(routeParams);

  const { data, loading, error, fetchMore, networkStatus } =
    useGetCharactersQuery({
      query: GET_CHARACTERS,
      variables,
      notifyOnNetworkStatusChange: true,
    });

  if (error) {
    throw error;
  }

  const isSetVariables = networkStatus === 2;

  const characters = !isSetVariables ? data?.characters : undefined;
  const next = characters?.info?.next;
  const hasNextPage = Boolean(next);
  const results = characters?.results || [];

  const handleLoadMore = useCallback(
    () =>
      fetchMore({
        variables: { ...variables, page: next },
      }),
    [fetchMore, next, variables],
  );

  const [sentryRef] = useInfiniteScroll({
    hasNextPage,
    loading,
    onLoadMore: handleLoadMore,
    rootMargin: '0px 0px 400px 0px',
  });

  return (
    <>
      <BaseSeo
        title="Characters"
        description="Character list of Rick and Morty TV Series"
        openGraph={{
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_BASE_URL}/images/characters.jpg`,
            },
          ],
        }}
      />
      <Box mb={2}>
        <CharacterSearch />
      </Box>
      {loading || results.length ? (
        <CharacterGridList
          items={results}
          loading={loading || hasNextPage}
          loadingRef={sentryRef}
        />
      ) : (
        <Typography>Nothing found.</Typography>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (req) => {
  const apolloClient = initializeApollo();

  const parsedRouteParams = parseRouteParams<CharactersListingPageQueryParams>(
    req.query,
  );

  await apolloClient.query({
    query: GetCharactersDocument,
    variables: getVariables(parsedRouteParams),
  });

  return addApolloState(apolloClient, {
    props: {},
  });
};

export default CharactersListingPage;
