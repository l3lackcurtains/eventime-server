import { getRepository } from "typeorm";
import { TimerRecord } from "../../entity/TimerRecord";

export default {
  Query: {
    /**
     * Get Time Records of User
     */
    getUserTimerRecords: async (_: any, args: any, ctx: any) => {
      try {
        // Authentication

        const { session } = ctx;
        if (!session || !session.userId) {
          return {
            success: false,
            message: "Authentication Failed"
          };
        }

        // Get User ID
        const userId = session.userId;

        const timerRecords = await getRepository(TimerRecord)
          .createQueryBuilder("timerRecords")
          .where({ userId })
          .leftJoinAndSelect("timerRecords.user", "user")
          .leftJoinAndSelect("timerRecords.task", "task")
          .orderBy({
            "timerRecords.date": "DESC",
            "timerRecords.startedAt": "DESC"
          })
          .getMany();

        if (!timerRecords) {
          return {
            success: false,
            message: "Timer Records not found."
          };
        }
        return {
          success: true,
          results: timerRecords
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
          result: timerRecords
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
