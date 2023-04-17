import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: ['https://rickandmortyapi.com/graphql', 'src/apollo/typeDefs.ts'],
  documents: ['src/**/*.{ts,tsx}'],
  ignoreNoDocuments: true,
  generates: {
    'src/gql/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        maybeValue: 'T | null | undefined',
      },
    },
    'src/gql/graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};

export default config;
