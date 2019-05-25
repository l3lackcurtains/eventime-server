import { getRepository } from "typeorm";
import { Project } from "../../entity/Project";

export default {
  Query: {
    getProjectBudget: async (_: any, args: any, ctx: any) => {
      try {
        const { id } = args;

        const project = await getRepository(Project)
          .createQueryBuilder("project")
          .where({ id })
          .leftJoinAndSelect("project.sections", "sections")
          .leftJoinAndSelect("sections.tasks", "tasks")
          .leftJoinAndSelect("tasks.timerRecords", "timerRecords")
          .leftJoinAndSelect("project.budget", "budget")
          .select([
            "project.id",
            "sections.id",
            "tasks.id",
            "timerRecords",
            "budget"
          ])
          .getOne();

        if (!project || !project.budget) {
          return {
            success: false,
            message: "Project not found."
          };
        }
        let totalDuration = 0;
        for (let section of project.sections) {
          for (let task of section.tasks) {
            for (let timerRecord of task.timerRecords) {
              totalDuration = totalDuration + timerRecord.duration;
            }
          }
        }

        project.budget.progress = Math.floor(totalDuration / 3600);
        project.budget.save();

        return {
          success: true,
          result: project.budget
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
