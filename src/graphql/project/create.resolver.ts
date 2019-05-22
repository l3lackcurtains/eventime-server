import { Project } from "../../entity/Project";
import { User } from "../../entity/User";

export default {
  Mutation: {
    createProject: async (_: any, args: any) => {
      try {
        const { name, users, clientId } = args;

        const projectData: any = {
          name,
          clientId
        };

        if (users) {
          projectData.users = [];
          for (let id of users) {
            const user = await User.findOne({
              where: { id }
            });

            if (!user) {
              console.log("no user");
              return {
                success: false,
                message: "One of the user ID is incorrect."
              };
            }
            projectData.users.push(user);
          }
        }

        const project = Project.create(projectData);

        await project.save();

        return {
          success: true,
          message: "Project Created."
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
