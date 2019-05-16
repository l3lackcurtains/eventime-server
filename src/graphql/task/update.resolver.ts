import { getRepository } from "typeorm";

import { Task } from "../../entity/Task";
import { Section } from "../../entity/Section";

export default {
  Mutation: {
    updateTask: async (_: any, args: any) => {
      try {
        const { id, name, sectionId, description, dueAt, status } = args;
        const taskRepository = getRepository(Task);

        const task = await taskRepository.findOne({
          where: { id }
        });

        if (!task) {
          return {
            success: false,
            message: "Task not found."
          };
        }

        if (name) task.name = name;
        if (dueAt) task.dueAt = dueAt;
        if (description) task.description = description;
        if (status) task.status = status;

        if (sectionId) {
          const section = await Section.findOne({
            where: { id: sectionId }
          });
          if (!section) {
            return {
              success: false,
              message: "Section ID is incorrect."
            };
          }
          task.section = section;
        }

        await taskRepository.save(task);

        return {
          success: true,
          message: "Task Updated.",
          data: task
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
