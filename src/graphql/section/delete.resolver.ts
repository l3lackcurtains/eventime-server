import { getRepository } from "typeorm";
import { Section } from "../../entity/Section";

export default {
  Mutation: {
    deleteSection: async (_: any, args: any) => {
      try {
        const { id } = args;
        const sectionRepository = getRepository(Section);

        const section = await sectionRepository.findOne({
          where: { id },
          relations: ["tasks"]
        });

        if (!section) {
          return {
            success: false,
            message: "Section not found."
          };
        }

        // TODO: Remove tasks when section is deleted..

        await sectionRepository.remove(section);

        return {
          success: true,
          message: "Section Deleted."
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
