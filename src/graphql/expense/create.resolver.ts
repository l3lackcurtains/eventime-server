import { GraphQLError } from "graphql";
import { Expense } from "../../entity/Expense";
import { Project } from "../../entity/Project";
import { User } from "../../entity/User";

export default {
  Mutation: {
    createExpense: async (_: any, args: any) => {
      try {
        const { category, date, amount, projectId, userId, details } = args;
        const expenseData: any = {
          category,
          date,
          amount,
          details
        };

        if (userId) {
          const user = await User.findOne({
            where: { id: userId }
          });

          if (!user) {
            return {
              success: false,
              message: "User ID is incorrect."
            };
          }
          expenseData.user = user;
        }

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
          expenseData.project = project;
        }

        const expense = Expense.create(expenseData);

        await expense.save();

        return true;
      } catch (e) {
        if (e instanceof GraphQLError) throw e;
        throw new Error("Something went wrong.");
      }
    }
  }
};
