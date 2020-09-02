import { Timer } from "../../entity/Timer";

export default {
  Query: {
    /**
     * Get Timer by ID
     */
    getTimer: async (_: any, args: any, ctx: any) => {
      try {
        const { session } = ctx;
        if (!session || !session.userId) {
          throw new Error("Authentication failed.");
        }

        // Get User ID
        const userId = session.userId;

        const timer = await Timer.findOne({
          where: { userId },
          relations: ["task"],
          cache: true,
        });

        if (!timer) {
          return {
            success: false,
            message: "Timer not found.",
          };
        }

        return {
          success: true,
          result: timer,
        };
      } catch (e) {
        return {
          success: false,
          message: `Something went wrong... ${e}`,
        };
      }
    },
  },
};
