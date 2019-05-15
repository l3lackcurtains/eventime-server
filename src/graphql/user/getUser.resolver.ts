import { User } from "../../entity/User";

export default {
  Query: {
    getUser: async (_: any, args: any, ctx: any) => {
      const { session } = ctx;

      if (!session || !session.userId) {
        return {
          success: false,
          message: "Not Authenticated."
        };
      }

      const user = await User.findOne({ where: { id: session.userId } });

      return {
        success: true,
        data: user
      };
    }
  }
};
