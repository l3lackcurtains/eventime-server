import { GraphQLError } from "graphql";
import { Expense } from "../../entity/Expense";

export default {
  Query: {
    getExpenses: async (_: any, args: any, ctx: any) => {
      try {
        const expenses = await Expense.find({
          cache: true,
          relations: ["user", "project"]
        });

        if (!expenses) {
          throw new GraphQLError("Expenses not found.");
        }
        return expenses;
      } catch (e) {
        console.log(e);
        if (e instanceof GraphQLError) throw e;
        throw new Error("Something went wrong.");
      }
    },
    getExpense: async (_: any, args: any, ctx: any) => {
      try {
        const { id } = args;
        const expense = await Expense.findOne({
          where: { id },
          cache: true,
          relations: ["user", "project"]
        });
        if (!expense) {
          throw new GraphQLError("No Expense found.");
        }
        return expense;
      } catch (e) {
        if (e instanceof GraphQLError) throw e;
        throw new Error("Something went wrong.");
      }
    }
  }
};
