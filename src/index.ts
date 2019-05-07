import helmet = require("helmet");
import "reflect-metadata";
import { GraphQLServer } from "graphql-yoga";
import { createTypeormConnection } from "./utils/createTypeormConnection";
import { getSchema } from "./utils/getSchema";

export const startServer = async () => {
  /**
   * Get all GraphQL types and resolvers
   */
  const schema = getSchema();
  const server = new GraphQLServer({ schema: schema as any });

  /**
   * Experess Middlewares
   */
  server.express.use(helmet());

  /**
   * Connect typeorm with PostgreSQL
   */
  await createTypeormConnection();

  /**
   * Start the server
   */
  const app = await server.start(() =>
    console.log("Server is running on http://localhost:4000")
  );

  return app;
};

startServer();
