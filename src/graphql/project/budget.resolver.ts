import { Project } from "../../entity/Project";
import { getRepository } from "typeorm";
import { Budget } from "../../entity/Budget";

export default {
  Mutation: {
    setProjectBudget: async (_: any, args: any) => {
      try {
        const { id, amount, type } = args;
        const projectRepository = getRepository(Project);

        const project = await projectRepository.findOne({
          where: { id },
          relations: ["budget"]
        });

        if (!project) {
          return {
            success: false,
            message: "Project not found."
          };
        }

        const budget = new Budget();

        budget.amount = amount;
        budget.type = type || "money";
        budget.progress = 0;
        // TODO: move progress to default

        await budget.save();

        project.budget = budget;

        await projectRepository.save(project);

        return {
          success: true,
          message: "Project Budget Updated.",
          data: project
        };
      } catch (e) {
        return {
          success: false,
          message: `Something went wrong... ${e}`
        };
      }
    },
    deleteProjectBudget: async (_: any, args: any) => {
      try {
        const { id } = args;
        const projectRepository = getRepository(Project);

        const project = await projectRepository.findOne({
          where: { id },
          relations: ["budget"]
        });

        if (!project) {
          return {
            success: false,
            message: "Project not found."
          };
        }
        /**
         * Get Budget and Delete It..
         */
        const budgetRepository = getRepository(Budget);
        const budget = await budgetRepository.findOne({
          where: { id: project.budget.id }
        });

        if (budget) {
          project.budget = null;
          await projectRepository.save(project);
          await budgetRepository.remove(budget);
        }

        return {
          success: true,
          message: "Project Budget Deleted.",
          data: project
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
