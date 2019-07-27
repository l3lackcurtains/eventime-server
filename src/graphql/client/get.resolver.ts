import { GraphQLError } from "graphql";
import { Client } from "../../entity/Client";

export default {
  Query: {
    /**
     * Get All Clients
     */
    getClients: async (_: any, args: any, ctx: any) => {
      try {
        const clients = await Client.find({
          cache: true
        });

        if (!clients) {
          throw new GraphQLError("No Clients found.");
        }

        return clients;
      } catch (e) {
        if (e instanceof GraphQLError) throw e;
        throw new Error("Something went wrong.");
      }
    },
    /**
     * Get Client by ID
     */
    getClient: async (_: any, args: any, ctx: any) => {
      try {
        const { id } = args;
        const client = await Client.findOne({
          where: { id },
          cache: true
        });

        if (!client) {
          throw new GraphQLError("No Client found.");
        }

        return {
          success: true,
          result: client
        };
      } catch (e) {
        if (e instanceof GraphQLError) throw e;
        throw new Error("Something went wrong.");
      }
    }
  }
};
