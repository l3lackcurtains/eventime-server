import { TimerRecord } from "../../entity/TimerRecord";

export default {
  Query: {
    /**
     * Get Time Records of User
     */
    getUserTimerRecords: async (_: any, args: any, ctx: any) => {
      try {
        const { userId } = args;
        const timerRecords = await TimerRecord.find({
          where: { userId },
          cache: true,
          relations: ["user", "task"]
        });

        if (!timerRecords) {
          return {
            success: false,
            message: "Timer Records not found."
          };
        }
        return {
          success: true,
          data: timerRecords
        };
      } catch (e) {
        return {
          success: false,
          message: `Something went wrong... ${e}`
        };
      }
    },
    /**
     * Get Time Records by Task
     */
    getTaskTimerRecords: async (_: any, args: any, ctx: any) => {
      try {
        const { taskId } = args;
        const timerRecords = await TimerRecord.find({
          where: { taskId },
          cache: true,
          relations: ["user", "task"]
        });

        if (!timerRecords) {
          return {
            success: false,
            message: "Timer Records not found."
          };
        }
        return {
          success: true,
          data: timerRecords
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

// TODO: Send Timer Record details with summary data in object like, TOTAL duration..
