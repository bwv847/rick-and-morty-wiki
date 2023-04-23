import React, { FC } from 'react';
import { Box, Pagination, PaginationItem } from '@mui/material';
import { GetCharactersQueryVariables } from '@/gql/graphql';
import { useRouteParams } from '@/routing/RoutingHooks';
import { EmptyObject } from '@/common/CommonTypes';
import { QueryParams, routes } from '@/routing/routes';

type CharacterSearchQueryParams = QueryParams<typeof routes.characters>;

interface CharactersPaginationProps {
  queryParams: GetCharactersQueryVariables;
  pageCount: number;
}

const CharactersPagination: FC<CharactersPaginationProps> = (props) => {
  const { queryParams, pageCount } = props;
  const { setQueryParams } = useRouteParams<
    EmptyObject,
    CharacterSearchQueryParams
  >();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      mt={4}
      mb={4}
    >
      <Pagination
        page={queryParams.page ?? 1}
        count={pageCount}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            onClick={() => {
              const updatedQueryParams = queryParams.filter?.name
                ? {
                    name: queryParams.filter?.name,
                    page: String(item.page),
                  }
                : { page: String(item.page) };
              setQueryParams(updatedQueryParams);
            }}
          />
        )}
      />
    </Box>
  );
};

export default CharactersPagination;
