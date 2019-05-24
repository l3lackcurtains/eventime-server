import { getRepository } from "typeorm";
import { Budget } from "../../entity/Budget";
import { Project } from "../../entity/Project";

export default {
  Mutation: {
    setProjectBudget: async (_: any, args: any) => {
      try {
        const { id, amount, type } = args;
        const projectRepository = getRepository(Project);

        const project = await projectRepository.findOne({
          select: ["id"],
          where: { id },
          relations: ["budget"]
        });

        if (!project) {
          return {
            success: false,
            message: "Project not found."
          };
        }

        let budget = project.budget;
        // save budget if not exist
        if (!project.budget) {
          budget = new Budget();
        }

        budget.amount = amount;
        budget.type = type;

        await budget.save();

        project.budget = budget;

        await projectRepository.save(project);

        return {
          success: true,
          message: "Project Budget Updated."
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
