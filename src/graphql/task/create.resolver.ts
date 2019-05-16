import { Task } from "../../entity/Task";
import { Section } from "../../entity/Section";

export default {
  Mutation: {
    createTask: async (_: any, args: any) => {
      try {
        const { name, sectionId } = args;

        const taskData: any = {
          name
        };

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

          taskData.section = section;
        }

        const task = Task.create(taskData);

        await task.save();

        return {
          success: true,
          message: "Task Created.",
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
