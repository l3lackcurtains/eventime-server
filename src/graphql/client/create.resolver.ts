import { getManager } from "typeorm";
import { Client } from "../../entity/Client";

export default {
  Mutation: {
    createClient: async (_: any, args: any) => {
      try {
        const { name, details } = args;

        const clientData: any = {
          name,
          details,
        };

        const entityManager = getManager();

        const client = await entityManager.create(Client, clientData);

        await client.save();

        return {
          success: true,
          message: "Client Created.",
        };
      } catch (e) {
        return {
          success: false,
          message: `Something went wrong... ${e}`,
        };
      }
    },
  },
};
