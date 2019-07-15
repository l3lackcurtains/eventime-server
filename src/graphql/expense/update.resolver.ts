import { getRepository } from "typeorm";
import { Expense } from "../../entity/Expense";

export default {
  Mutation: {
    updateExpense: async (_: any, args: any) => {
      try {
        const { id } = args;
        const expenseRepository = getRepository(Expense);

        const expense = await expenseRepository.findOne({
          where: { id },
          relations: []
        });

        if (!expense) {
          throw new Error("Expense not found.");
        }

        await expenseRepository.save(expense);

        return true;
      } catch (e) {
        throw new Error(e);
      }
    }
  }
};
