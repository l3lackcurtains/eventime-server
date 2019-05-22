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
          return {
            success: false,
            message: "Clients not found."
          };
        }
        return {
          success: true,
          results: clients
        };
      } catch (e) {
        return {
          success: false,
          message: `Something went wrong... ${e}`
        };
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
          return {
            success: false,
            message: "Client not found."
          };
        }

        return {
          success: true,
          result: client
        };
      } catch (e) {
        return {
          success: false,
          message: `Something went wrong... ${e}`
        };
      }
    }
  }
};
