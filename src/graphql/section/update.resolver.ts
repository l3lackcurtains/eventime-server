import { getRepository } from "typeorm";
import { Section } from "../../entity/Section";

export default {
  Mutation: {
    updateSection: async (_: any, args: any) => {
      try {
        const { id, name } = args;
        const sectionRepository = getRepository(Section);

        const section = await sectionRepository.findOne({
          where: { id }
        });

        if (!section) {
          return {
            success: false,
            message: "Section not found."
          };
        }

        if (name) section.name = name;

        await sectionRepository.save(section);

        return {
          success: true,
          message: "Section Updated."
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
