import { getRepository } from "typeorm";
import { Project } from "../../entity/Project";

export default {
  Mutation: {
    createSection: async (_: any, args: any) => {
      try {
        const { name, projectId } = args;

        const newSection: any = {
          name,
          position: 0
        };

        const project = await getRepository(Project)
          .createQueryBuilder("project")
          .where({ id: projectId })
          .leftJoinAndSelect("project.sections", "sections")
          .orderBy({
            "sections.position": "ASC"
          })
          .getOne();

        if (!project) {
          return {
            success: false,
            message: "Section ID is incorrect."
          };
        }
        if (project.sections.length > 0) {
          newSection.position =
            project.sections[project.sections.length - 1].position + 1;
        }

        project.sections.push(newSection);

        await getRepository(Project).save(project);

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
