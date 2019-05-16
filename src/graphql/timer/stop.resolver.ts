import { Timer } from "../../entity/Timer";
import { getRepository } from "typeorm";

export default {
  Mutation: {
    stopTimer: async (_: any, args: any) => {
      try {
        const { id } = args;
        const timerRepository = getRepository(Timer);

        const timer = await timerRepository.findOne({
          where: { id }
        });

        if (!timer) {
          return {
            success: false,
            message: "Timer not found."
          };
        }

        await timerRepository.remove(timer);

        return {
          success: true,
          message: "Timer Deleted.",
          data: timer
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
