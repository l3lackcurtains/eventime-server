import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import * as path from "path";

export const getSchema = () => {
  const typesArray = fileLoader(
    path.join(__dirname, "../graphql/**/*.graphql"),
    { recursive: true }
  );
  const resolversArray = fileLoader(
    path.join(__dirname, "../graphql/**/*.resolver.*"),
    {
      recursive: true
    }
  );

  const typeDefs = mergeTypes(typesArray);
  const resolvers = mergeResolvers(resolversArray);

  const executableSchema = makeExecutableSchema({
    typeDefs,
    resolvers
  });

  return executableSchema;
};
