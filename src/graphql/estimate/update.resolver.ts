import { getRepository } from "typeorm";
import { Task } from "../../entity/Task";
import { TaskEstimate } from "../../entity/TaskEstimate";

export default {
  Mutation: {
    addEstimateToTask: async (_: any, args: any) => {
      try {
        const { id, total } = args;
        const taskRepository = getRepository(Task);

        const task = await taskRepository.findOne({
          select: ["id"],
          where: { id },
          relations: ["estimate"]
        });

        if (!task) {
          return {
            success: false,
            message: "Task not found."
          };
        }

        let estimate = task.estimate;
        // save estimate if not exist
        if (!task.estimate) {
          estimate = new TaskEstimate();
        }

        estimate.total = total;

        await estimate.save();

        task.estimate = estimate;

        await taskRepository.save(task);

        return {
          success: true,
          message: "Task TaskEstimate Updated."
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
