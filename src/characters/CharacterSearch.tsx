import { useState } from 'react';
import { QueryParams, routes } from '@/routing/routes';
import { useRouteParams } from '@/routing/RoutingHooks';
import { EmptyObject } from '@/common/CommonTypes';
import { Input } from 'antd';

type CharacterSearchQueryParams = QueryParams<typeof routes.characters>;

const CharacterSearch = () => {
  const { routeParams, setQueryParams } = useRouteParams<
    EmptyObject,
    CharacterSearchQueryParams
  >();
  const name = routeParams.get('name') ?? '';
  const [searchValue, setSearchValue] = useState(name);

  return (
    <Input.Search
      name="searchValue"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      placeholder="Search characters by name"
      onSearch={() => setQueryParams({ name: searchValue })}
      size="large"
    />
  );
};

export default CharacterSearch;
