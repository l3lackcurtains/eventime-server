import { Project } from "../../entity/Project";
import { getRepository } from "typeorm";

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
          message: "Project Deleted.",
          data: project
        };
      } catch (e) {
        return {
          success: false,
          message: `Something went wrong... \n \n \n ${e} \n \n`
        };
      }
    }
  }
};
