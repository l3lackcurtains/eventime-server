import helmet = require("helmet");
import * as session from "express-session";
import { GraphQLServer } from "graphql-yoga";
import "reflect-metadata";
import { createTypeormConnection } from "./utils/createTypeormConnection";
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
  const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
  };
  server.express.use(cors(corsOptions));

  /**
   * Session Setup
   */

  server.express.use(
    session({
      secret: SECRET,
      cookie: {
        secure: false,
        maxAge: 12000
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
