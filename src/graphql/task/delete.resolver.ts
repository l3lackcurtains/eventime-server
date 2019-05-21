import { getRepository } from "typeorm";
import { Task } from "../../entity/Task";

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

        return true;
      } catch (e) {
        return false;
      }
    }
  }
};
