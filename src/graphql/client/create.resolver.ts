import { Client } from "../../entity/Client";

export default {
  Mutation: {
    createClient: async (_: any, args: any) => {
      try {
        const { name, details } = args;

        const clientData: any = {
          name,
          details
        };

        const client = Client.create(clientData);

        await client.save();

        return {
          success: true,
          message: "Client Created."
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
