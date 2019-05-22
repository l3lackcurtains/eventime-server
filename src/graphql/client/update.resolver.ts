import { getRepository } from "typeorm";
import { Client } from "../../entity/Client";

export default {
  Mutation: {
    updateClient: async (_: any, args: any) => {
      try {
        const { id, name, details } = args;
        const clientRepository = getRepository(Client);

        const client = await clientRepository.findOne({
          where: { id }
        });

        if (!client) {
          return {
            success: false,
            message: "Client not found."
          };
        }

        if (name) client.name = name;
        if (details) client.details = details;

        await clientRepository.save(client);

        return {
          success: true,
          message: "Client Updated."
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
