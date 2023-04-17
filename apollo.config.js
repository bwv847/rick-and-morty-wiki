module.exports = {
  client: {
    service: {
      name: "rick-and-morty",
      localSchemaFile: "src/gql/graphql.schema.json",
    },
    excludes: ["**/gql/**", "src/apollo/typeDefs.ts"],
  },
};
