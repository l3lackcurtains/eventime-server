import { Timer } from "../../entity/Timer";

export default {
  Query: {
    /**
     * Get Timer by ID
     */
    getTimer: async (_: any, args: any, ctx: any) => {
      try {
        const { id } = args;
        const timer = await Timer.findOne({
          where: { id },
          cache: true,
          relations: ["user", "task"]
        });

        if (!timer) {
          return {
            success: false,
            message: "Timer not found."
          };
        }

        return {
          success: true,
          result: timer
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
