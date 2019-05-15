import { Section } from "../../entity/Section";
import { Project } from "../../entity/Project";

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

        console.log(section);

        await section.save();

        return {
          success: true,
          message: "Section Created.",
          data: section
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
