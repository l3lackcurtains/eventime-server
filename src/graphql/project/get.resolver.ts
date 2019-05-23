import { getRepository } from "typeorm";
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
          relations: ["billing", "budget", "client", "users"]
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
    getProjectWithTasks: async (_: any, args: any, ctx: any) => {
      try {
        const projects = await getRepository(Project)
          .createQueryBuilder("project")
          .innerJoinAndSelect("project.sections", "sections")
          .innerJoinAndSelect("sections.tasks", "tasks")
          .getMany();

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
     * Get Project by slug
     */
    getProjectBySlug: async (_: any, args: any, ctx: any) => {
      try {
        const { slug } = args;

        const project = await getRepository(Project)
          .createQueryBuilder("project")
          .where({ slug })
          .leftJoinAndSelect("project.sections", "sections")
          .leftJoinAndSelect("sections.tasks", "tasks")
          .orderBy({
            "sections.position": "ASC",
            "tasks.position": "ASC"
          })
          .getOne();

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
