import { GraphQLError } from "graphql";
import { getRepository } from "typeorm";
import { Expense } from "../../entity/Expense";

export default {
  Query: {
    getExpenses: async (_: any, args: any, ctx: any) => {
      try {
        const expenses = await getRepository(Expense)
          .createQueryBuilder("expense")
          .orderBy("expense.date", "DESC")
          .innerJoinAndSelect("expense.user", "user")
          .innerJoinAndSelect("expense.project", "project")
          .getMany();

        if (!expenses) {
          throw new GraphQLError("Expenses not found.");
        }
        return expenses;
      } catch (e) {
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
    },
    getGroupedExpensesStat: async (_: any, args: any, ctx: any) => {
      const expenses = await getRepository(Expense)
        .createQueryBuilder("expense")
        .getMany();

      return getGroupedExpenseCategories(expenses);
    }
  }
};

const getGroupedExpenseCategories = (expenses: Expense[]) => {
  const groupedCategory: any = {};
  const categories: string[] = [];
  expenses.forEach((expense: Expense) => {
    if (categories.includes(expense.category)) {
      groupedCategory[expense.category] += expense.amount;
    } else {
      categories.push(expense.category);
      groupedCategory[expense.category] = expense.amount;
    }
  });

  const total = Object.keys(groupedCategory).reduce(
    (sum: number, key: string) => sum + groupedCategory[key],
    0
  );

  const categoryStat: any = [];

  Object.keys(groupedCategory).forEach((category: string) => {
    categoryStat.push({
      category,
      total: groupedCategory[category],
      percentage: Math.round((groupedCategory[category] / total) * 100)
    });
  });

  const result: any = {
    total,
    categoryStat
  };

  return result;
};
