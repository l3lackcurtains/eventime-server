import { Expense } from "../../entity/Expense";

export default {
  Mutation: {
    createExpense: async (_: any, args: any) => {
      try {
        const { amount } = args;

        const expenseData: any = {
          amount
        };

        const expense = Expense.create(expenseData);

        await expense.save();

        return true;
      } catch (e) {
        throw new Error(e);
      }
    }
  }
};
