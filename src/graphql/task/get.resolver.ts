import { Task } from "../../entity/Task";

export default {
  Query: {
    /**
     * Get All Tasks
     */
    getTasks: async (_: any, args: any, ctx: any) => {
      try {
        const tasks = await Task.find({
          cache: true,
          relations: ["section"]
        });

        if (!tasks) {
          return {
            success: false,
            message: "Tasks not found."
          };
        }
        return {
          success: true,
          results: tasks
        };
      } catch (e) {
        return {
          success: false,
          message: `Something went wrong... ${e}`
        };
      }
    },
    /**
     * Get Task by ID
     */
    getTask: async (_: any, args: any, ctx: any) => {
      try {
        const { id } = args;
        const task = await Task.findOne({
          where: { id },
          cache: true,
          relations: ["section"]
        });

        if (!task) {
          return {
            success: false,
            message: "Task not found."
          };
        }

        return {
          success: true,
          result: task
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
