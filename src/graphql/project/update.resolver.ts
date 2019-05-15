import { Project } from "../../entity/Project";
import { User } from "../../entity/User";
import { getRepository } from "typeorm";

export default {
  Mutation: {
    updateProject: async (_: any, args: any) => {
      try {
        const { id, name, users } = args;
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

        if (name) project.name = name;

        if (users) {
          const usersArr = [];
          for (let id of users) {
            const user = await User.findOne({
              where: { id: id },
              select: ["id", "email"]
            });
            if (!user) {
              return {
                success: false,
                message: "One of the user ID is incorrect."
              };
            }

            usersArr.push(user);
          }
          project.users.push(...usersArr);
        }

        await projectRepository.save(project);

        return {
          success: true,
          message: "Project Updated.",
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
