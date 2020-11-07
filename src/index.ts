import helmet = require("helmet");
import * as session from "express-session";
import { GraphQLServer } from "graphql-yoga";
import "reflect-metadata";
import { createTypeormConnection } from "./utils/createTypeormConnection";
import { getSchema } from "./utils/getSchema";
const SECRET = "sessionSecretValue";

export const startServer = async () => {
  const host = "localhost";
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

  /**
   * Session Setup
   */

  server.express.use(
    session({
      name: "xy45",
      secret: SECRET,
      cookie: {
        secure: false,
        maxAge: 120000000
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
  const corsOptions = {
    origin: `http://${host}:3000`,
    credentials: true
  };

  const options = {
    port: process.env.NODE_ENV === "test" ? 7000 : 8000,
    endpoint: "/graphql",
    playground: "/playground",
    cors: corsOptions
  };
  const app = await server.start(options, () =>
    console.log(`[Started] http://${host}:${options.port}`)
  );

  return app;
};

startServer();
