import { Project } from "../../entity/Project";

export default {
  Query: {
    getProjectBudget: async (_: any, args: any, ctx: any) => {
      try {
        const { id } = args;
        const project = await Project.findOne({
          where: { id },
          cache: true,
          relations: ["budget"]
        });
        if (!project) {
          return {
            success: false,
            message: "Project not found."
          };
        }

        return {
          success: true,
          result: project.budget
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
