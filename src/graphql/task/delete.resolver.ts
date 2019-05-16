import { Task } from "../../entity/Task";
import { getRepository } from "typeorm";

export default {
  Mutation: {
    deleteTask: async (_: any, args: any) => {
      try {
        const { id } = args;
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

        await taskRepository.remove(task);

        return {
          success: true,
          message: "Task Deleted.",
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
