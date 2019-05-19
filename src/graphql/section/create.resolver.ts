import { Project } from "../../entity/Project";
import { Section } from "../../entity/Section";

export default {
  Mutation: {
    createSection: async (_: any, args: any) => {
      try {
        const { name, projectId } = args;

        const sectionData: any = {
          name
        };

        if (projectId) {
          const project = await Project.findOne({
            where: { id: projectId }
          });
          if (!project) {
            return {
              success: false,
              message: "Project ID is incorrect."
            };
          }

          sectionData.project = project;
        }

        const section = Section.create(sectionData);

        await section.save();

        return {
          success: true,
          message: "Section Created."
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
