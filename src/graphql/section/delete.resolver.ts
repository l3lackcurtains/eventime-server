import { getRepository } from "typeorm";
import { Section } from "../../entity/Section";
import { Task } from "../../entity/Task";

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

        for (let task of section.tasks) {
          getRepository(Task).remove(task);
        }

        if (!section) {
          return false;
        }

        await sectionRepository.remove(section);

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  }
};
