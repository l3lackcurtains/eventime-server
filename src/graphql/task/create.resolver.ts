import { getRepository } from "typeorm";
import { Section } from "../../entity/Section";

export default {
  Mutation: {
    createTask: async (_: any, args: any) => {
      try {
        const { name, sectionId } = args;

        const newTask: any = {
          name,
          position: 0
        };

        const section = await getRepository(Section)
          .createQueryBuilder("section")
          .where({ id: sectionId })
          .leftJoinAndSelect("section.tasks", "tasks")
          .orderBy({
            "tasks.position": "ASC"
          })
          .getOne();

        if (!section) {
          return {
            success: false,
            message: "Section ID is incorrect."
          };
        }
        if (section.tasks.length > 0) {
          newTask.position =
            section.tasks[section.tasks.length - 1].position + 1;
        }

        section.tasks.push(newTask);

        await getRepository(Section).save(section);

        return {
          success: true,
          message: "Task Created."
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
