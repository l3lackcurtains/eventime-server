import { getRepository } from "typeorm";
import { Task } from "../../entity/Task";

export default {
  Mutation: {
    updateTask: async (_: any, args: any) => {
      try {
        const { id, name, description, dueAt, status } = args;
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

        await taskRepository.save(task);

        return {
          success: true,
          message: "Task Updated."
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
