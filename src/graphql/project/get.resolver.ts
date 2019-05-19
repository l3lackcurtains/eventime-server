import { Project } from "../../entity/Project";

export default {
  Query: {
    /**
     * Get All Projects
     */
    getProjects: async (_: any, args: any, ctx: any) => {
      try {
        const projects = await Project.find({
          cache: true
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
          relations: ["sections", "sections.tasks"]
        });

        if (!project) {
          return {
            success: false,
            message: "Project not found."
          };
        }

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
    },
    /**
     * Get Project by slug
     */
    getProjectBySlug: async (_: any, args: any, ctx: any) => {
      try {
        const { slug } = args;
        const project = await Project.findOne({
          where: { slug },
          cache: true,
          relations: ["sections", "sections.tasks"]
        });

        if (!project) {
          return {
            success: false,
            message: "Project not found."
          };
        }

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
