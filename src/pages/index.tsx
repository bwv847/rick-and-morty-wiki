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
import { QueryParams, routes } from '@/routing/routes';
import { useRouteParams } from '@/routing/RoutingHooks';
import { addApolloState, initializeApollo } from '@/apollo/apollo';
import { GetServerSideProps } from 'next';
import { ParsedRouteParams, parseRouteParams } from '@/routing/RoutingUtils';
import { EmptyObject } from '@/common/CommonTypes';
import { gql } from '@apollo/client';
import CharactersPagination from '@/characters/CharactersPagination';

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
  const page = parsedRouteParams.get('page');
  const name = parsedRouteParams.get('name');

  if (name && page) {
    return { page: Number(page), filter: { name } };
  }

  if (page && !name) {
    return { page: Number(page) };
  }

  if (name && !page) {
    return { filter: { name } };
  }

  return {};
}

function CharactersListingPage() {
  const { routeParams } = useRouteParams<
    EmptyObject,
    CharactersListingPageQueryParams
  >();
  const variables = getVariables(routeParams);

  const { data, loading, error, networkStatus } = useGetCharactersQuery({
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
        <>
          <CharacterGridList items={results} loading={loading || hasNextPage} />
          <CharactersPagination
            queryParams={variables}
            pageCount={data?.characters?.info?.pages ?? 0}
          />
        </>
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
