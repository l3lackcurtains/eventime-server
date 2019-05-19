import { getRepository } from "typeorm";
import { Project } from "../../entity/Project";

export default {
  Mutation: {
    deleteProject: async (_: any, args: any) => {
      try {
        const { id } = args;
        const projectRepository = getRepository(Project);

        const project = await projectRepository.findOne({
          where: { id },
          relations: ["users"]
        });

        if (!project) {
          return {
            success: false,
            message: "Project not found."
          };
        }

        await projectRepository.remove(project);

        return {
          success: true,
          message: "Project Deleted."
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
