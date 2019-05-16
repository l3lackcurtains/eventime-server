import { TimerRecord } from "../../entity/TimerRecord";

export default {
  Query: {
    /**
     * Get All TimerRecords
     */
    getTimerRecords: async (_: any, args: any, ctx: any) => {
      try {
        const timerRecords = await TimerRecord.find({
          cache: true,
          relations: ["user", "task"]
        });

        if (!timerRecords) {
          return {
            success: false,
            message: "TimerRecords not found."
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
     * Get TimerRecord by ID
     */
    getTimerRecord: async (_: any, args: any, ctx: any) => {
      try {
        const { id } = args;
        const timerRecord = await TimerRecord.findOne({
          where: { id },
          cache: true,
          relations: ["user", "task"]
        });

        if (!timerRecord) {
          return {
            success: false,
            message: "TimerRecord not found."
          };
        }

        return {
          success: true,
          data: timerRecord
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
