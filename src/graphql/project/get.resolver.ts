import { Project } from "../../entity/Project";

export default {
  Query: {
    /**
     * Get All Projects
     */
    getProjects: async (_: any, args: any, ctx: any) => {
      try {
        const projects = await Project.find({
          cache: true,
          relations: ["users", "budget", "billing"]
        });

        if (!projects) {
          return {
            success: false,
            message: "Projects not found."
          };
        }
        return {
          success: true,
          results: projects
        };
      } catch (e) {
        return {
          success: false,
          message: `Something went wrong... ${e}`
        };
      }
    },
    /**
     * Get Project by ID
     */
    getProject: async (_: any, args: any, ctx: any) => {
      try {
        const { id } = args;
        const project = await Project.findOne({
          where: { id },
          cache: true,
          relations: ["users", "budget", "billing"]
        });

        if (!project) {
          return {
            success: false,
            message: "Project not found."
          };
        }

        console.log(project);

        return {
          success: true,
          result: project
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
