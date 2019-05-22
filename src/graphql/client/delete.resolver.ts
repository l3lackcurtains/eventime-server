import { getRepository } from "typeorm";
import { Client } from "../../entity/Client";

export default {
  Mutation: {
    deleteClient: async (_: any, args: any) => {
      try {
        const { id } = args;
        const clientRepository = getRepository(Client);

        const client = await clientRepository.findOne({
          where: { id }
        });

        if (!client) {
          return false;
        }

        await clientRepository.remove(client);

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  }
};
