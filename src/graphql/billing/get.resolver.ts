import { Project } from "../../entity/Project";

export default {
  Query: {
    getProjectBilling: async (_: any, args: any, ctx: any) => {
      try {
        const { id } = args;
        const project = await Project.findOne({
          where: { id },
          cache: true,
          relations: ["billing"]
        });

        if (!project || !project.billing) {
          return {
            success: false,
            message: "Project not found."
          };
        }

        return {
          success: true,
          result: project.billing
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
