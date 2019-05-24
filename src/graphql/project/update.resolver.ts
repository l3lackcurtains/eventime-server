import { getRepository } from "typeorm";
import { Client } from "../../entity/Client";
import { Project } from "../../entity/Project";
import { User } from "../../entity/User";

export default {
  Mutation: {
    updateProject: async (_: any, args: any) => {
      try {
        const { id, name, users, clientId } = args;
        const projectRepository = getRepository(Project);

        const project = await projectRepository.findOne({
          where: { id },
          relations: ["users", "client"]
        });

        if (!project) {
          return {
            success: false,
            message: "Project not found."
          };
        }

        if (name) project.name = name;

        if (users) {
          project.users = [];
          for (let id of users) {
            const user = await User.findOne({
              where: { id }
            });

            if (!user) {
              return {
                success: false,
                message: "One of the user ID is incorrect."
              };
            }
            project.users.push(user);
          }
        }

        if (clientId && clientId !== project.client.id) {
          const client = await Client.findOne({
            where: { id: clientId }
          });

          if (!client) {
            return {
              success: false,
              message: "Client ID is incorrect."
            };
          }
          project.client = client;
        }

        await projectRepository.save(project);

        return {
          success: true,
          message: "Project Updated."
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
