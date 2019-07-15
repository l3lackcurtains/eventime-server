import { Expense } from "../../entity/Expense";

export default {
  Query: {
    getExpenses: async (_: any, args: any, ctx: any) => {
      try {
        const expenses = await Expense.find({
          cache: true
        });

        if (!expenses) {
          throw new Error("Expenses not found.");
        }
        return expenses;
      } catch (e) {
        throw new Error(e);
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
          throw new Error("Expense not found.");
        }

        return expense;
      } catch (e) {
        throw new Error(e);
      }
    }
  }
};
