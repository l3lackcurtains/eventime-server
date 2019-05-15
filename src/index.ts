import helmet = require("helmet");
import "reflect-metadata";
import { GraphQLServer } from "graphql-yoga";
import { createTypeormConnection } from "./utils/createTypeormConnection";
import * as session from "express-session";
import { getSchema } from "./utils/getSchema";
import cors = require("cors");

const SECRET = "sessionSecretValue";

export const startServer = async () => {
  /**
   * Setup GraphQL entry point
   */
  const schema = getSchema();
  const server = new GraphQLServer({
    schema: schema as any,
    context: ({ request }) => ({
      session: request.session,
      req: request
    })
  });

  /**
   * Experess Middlewares
   */
  server.express.use(helmet());
  server.express.use(cors());

  /**
   * Session Setup
   */

  server.express.use(
    session({
      secret: SECRET,
      cookie: {
        maxAge: 120 // a week
      },
      resave: false,
      saveUninitialized: false
    })
  );

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
