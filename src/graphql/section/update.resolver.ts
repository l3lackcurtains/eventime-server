import { getRepository } from "typeorm";

import { Section } from "../../entity/Section";
import { Project } from "../../entity/Project";

export default {
  Mutation: {
    updateSection: async (_: any, args: any) => {
      try {
        const { id, name, projectId } = args;
        const sectionRepository = getRepository(Section);

        const section = await sectionRepository.findOne({
          where: { id }
        });

        if (!section) {
          return {
            success: false,
            message: "Section not found."
          };
        }

        if (name) section.name = name;
        if (projectId) {
          const project = await Project.findOne({
            where: { id: projectId }
          });
          if (!project) {
            return {
              success: false,
              message: "One of the project ID is incorrect."
            };
          }
          section.project = project;
        }

        await sectionRepository.save(section);

        return {
          success: true,
          message: "Section Updated.",
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
