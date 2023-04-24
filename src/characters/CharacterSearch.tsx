import { useEffect, useState } from 'react';
import {
  Container,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { QueryParams, routes } from '@/routing/routes';
import { useRouteParams } from '@/routing/RoutingHooks';
import { EmptyObject } from '@/common/CommonTypes';
import styles from './CharacterSearch.module.css';

type CharacterSearchQueryParams = QueryParams<typeof routes.characters>;

const CharacterSearch = () => {
  const { routeParams, setQueryParams } = useRouteParams<
    EmptyObject,
    CharacterSearchQueryParams
  >();
  const name = routeParams.get('name') ?? '';
  const [searchValue, setSearchValue] = useState(name);

  useEffect(() => {
    setSearchValue(name);
  }, [name]);

  return (
    <Container maxWidth="xl" className={styles.searchContainer}>
      <form
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          setQueryParams({ name: searchValue });
        }}
      >
        <TextField
          name="searchValue"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          placeholder="Search"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="Search" type="submit">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>
    </Container>
  );
};

export default CharacterSearch;
