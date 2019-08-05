import helmet = require("helmet");
import * as redisStore from "connect-redis";
import * as session from "express-session";
import { GraphQLServer } from "graphql-yoga";
import * as redis from "redis";
import "reflect-metadata";
import { createTypeormConnection } from "./utils/createTypeormConnection";
import { getSchema } from "./utils/getSchema";
const SECRET = "sessionSecretValue";
const redisClient = redis.createClient();
const redisStoreSession = redisStore(session);
export const startServer = async () => {
  const host = "165.22.219.65";
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
   * Redis setup
   */

  const store = new redisStoreSession({
    host: "redis",
    port: 6379,
    client: redisClient,
    ttl: 86400
  });

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
