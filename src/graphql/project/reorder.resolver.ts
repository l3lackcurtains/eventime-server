import { getRepository } from "typeorm";
import { Section } from "../../entity/Section";

export default {
  Mutation: {
    reorderTask: async (_: any, args: any, ctx: any) => {
      try {
        const { sectionId, from, to } = args;
        const section = await getRepository(Section)
          .createQueryBuilder("section")
          .where({ id: sectionId })
          .leftJoinAndSelect("section.tasks", "tasks")
          .orderBy({
            "tasks.position": "ASC"
          })
          .getOne();

        const { tasks } = section;
        const result = Array.from(tasks);
        const [removed] = result.splice(from, 1);
        result.splice(to, 0, removed);
        let count = 0;
        result.map(tas => {
          tas.position = count;
          count++;
          return tas;
        });

        section.tasks = result;

        section.save();

        if (!section) {
          return false;
        }
        return true;
      } catch (e) {
        return false;
      }
    },
    reorderTaskBetweenSections: async (_: any, args: any, ctx: any) => {
      try {
        const { sourceSectionId, destinationSectionId, from, to } = args;
        const sourceSection = await getRepository(Section)
          .createQueryBuilder("section")
          .where({ id: sourceSectionId })
          .leftJoinAndSelect("section.tasks", "tasks")
          .orderBy({
            "tasks.position": "ASC"
          })
          .getOne();

        const destinationSection = await getRepository(Section)
          .createQueryBuilder("section")
          .where({ id: destinationSectionId })
          .leftJoinAndSelect("section.tasks", "tasks")
          .orderBy({
            "tasks.position": "ASC"
          })
          .getOne();

        const sourceTasks = sourceSection.tasks;
        const destinationTasks = destinationSection.tasks || [];

        const [removed] = sourceTasks.splice(from, 1);

        destinationTasks.splice(to, 0, removed);

        let count = 0;

        sourceTasks.map((tas: any) => {
          tas.position = count;
          count++;
          return tas;
        });

        destinationTasks.map((tas: any) => {
          tas.position = count;
          count++;
          return tas;
        });

        sourceSection.tasks = sourceTasks;
        destinationSection.tasks = destinationTasks;

        await getRepository(Section).save(sourceSection);
        await getRepository(Section).save(destinationSection);

        return true;
      } catch (e) {
        return false;
      }
    }
  }
};
