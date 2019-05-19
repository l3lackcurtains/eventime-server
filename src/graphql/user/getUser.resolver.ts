import { User } from "../../entity/User";

export default {
  Query: {
    getUser: async (_: any, args: any, ctx: any) => {
      const { session } = ctx;

      if (!session || !session.userId) {
        throw new Error("Authentication failed.");
      }

      const user = await User.findOne({ where: { id: session.userId } });

      return {
        success: true,
        result: user
      };
    }
  }
};
